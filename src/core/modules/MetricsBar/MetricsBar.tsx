'use client';

import { ArrowIcon } from '@/core/modules/Icons/ArrowIcon';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';

import { siteMetricDefinitions, type SiteMetricDefinition } from '@/core/content/site-metrics';

import { formatMetricValue } from './metric-format';
import { useVisitorMetrics } from './use-visitor-metrics';
import { advanceTicker, tooltipLeft } from './ticker-layout';
import styles from './MetricsBar.module.scss';

export function MetricsBar() {
  const measurement = useVisitorMetrics();
  const footer = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const cycle = useRef<HTMLUListElement>(null);
  const tooltipId = useId();
  const [hovered, setHovered] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [touchPaused, setTouchPaused] = useState(false);
  const [active, setActive] = useState<{ metric: SiteMetricDefinition; left: number } | null>(null);
  const paused = hovered || keyboardFocused || manuallyPaused || touchPaused;

  useEffect(() => {
    const area = viewport.current;
    const group = cycle.current;
    if (!area || !group) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let previousTime = 0;
    let position = area.scrollLeft;
    let width = group.getBoundingClientRect().width;
    const observer = new ResizeObserver(() => {
      width = group.getBoundingClientRect().width;
    });
    observer.observe(group);

    function step(time: number) {
      if (previousTime) {
        position = advanceTicker(position, time - previousTime, width);
        area!.scrollLeft = position;
      }
      previousTime = time;
      frame = window.requestAnimationFrame(step);
    }

    function updatePlayback() {
      window.cancelAnimationFrame(frame);
      previousTime = 0;
      position = area!.scrollLeft;
      if (!paused && !reducedMotion.matches) frame = window.requestAnimationFrame(step);
    }

    reducedMotion.addEventListener('change', updatePlayback);
    updatePlayback();
    return () => {
      window.cancelAnimationFrame(frame);
      reducedMotion.removeEventListener('change', updatePlayback);
      observer.disconnect();
    };
  }, [paused]);

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !footer.current?.contains(event.target)) {
        setActive(null);
        setTouchPaused(false);
      }
    }
    function close() {
      setActive(null);
      setTouchPaused(false);
    }
    document.addEventListener('pointerdown', dismiss);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      window.removeEventListener('resize', close);
    };
  }, []);

  function showMetric(metric: SiteMetricDefinition, element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    setActive({
      metric,
      left: tooltipLeft(rect.left + rect.width / 2, viewportWidth, Math.min(360, viewportWidth - 24)),
    });
  }

  const reading = active ? measurement.metrics[active.metric.key] : null;
  const recordedAt = reading?.recordedAt;
  const value = reading?.value ?? null;

  return (
    <footer
      className={styles.footer}
      aria-label="Site metrics"
      ref={footer}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') setHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== 'touch') {
          setHovered(false);
          if (!keyboardFocused) setActive(null);
        }
      }}
      onFocusCapture={(event) => {
        if (event.target instanceof HTMLElement && event.target.matches(':focus-visible')) setKeyboardFocused(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setKeyboardFocused(false);
          setActive(null);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setActive(null);
          setTouchPaused(false);
        }
      }}
    >
      <Link href="/metrics" className={styles.detailsLink}>
        Site metrics{' '}
        <span aria-hidden="true">
          <ArrowIcon />
        </span>
      </Link>
      <div
        className={styles.viewport}
        ref={viewport}
        onWheel={() => setActive(null)}
        onTouchMove={() => setActive(null)}
      >
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <ul
              className={styles.metrics}
              key={copy}
              ref={copy === 0 ? cycle : undefined}
              aria-hidden={copy === 1 || undefined}
            >
              {siteMetricDefinitions.map((metric) => (
                <li className={styles.item} key={metric.key}>
                  <span className={styles.separator} aria-hidden="true" />
                  <button
                    type="button"
                    className={styles.metric}
                    tabIndex={copy === 0 ? 0 : -1}
                    aria-describedby={active?.metric.key === metric.key ? tooltipId : undefined}
                    onPointerEnter={(event) => {
                      if (event.pointerType !== 'touch') showMetric(metric, event.currentTarget);
                    }}
                    onPointerDown={(event) => {
                      if (copy === 1) event.preventDefault();
                      if (event.pointerType === 'touch') setTouchPaused(true);
                    }}
                    onFocus={(event) => showMetric(metric, event.currentTarget)}
                    onClick={(event) => showMetric(metric, event.currentTarget)}
                  >
                    {metric.label}: {formatMetricValue(measurement.metrics[metric.key].value, metric.unit)}
                  </button>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button
        type="button"
        className={styles.playback}
        aria-label={manuallyPaused ? 'Resume metrics animation' : 'Pause metrics animation'}
        aria-pressed={manuallyPaused}
        onClick={() => {
          setManuallyPaused((current) => !current);
          setActive(null);
          setTouchPaused(false);
        }}
      >
        <span aria-hidden="true">{manuallyPaused ? '▶' : 'Ⅱ'}</span>
      </button>
      {active && (
        <div className={styles.tooltip} role="tooltip" id={tooltipId} style={{ left: active.left }}>
          <span className={styles.eyebrow}>Live · your browser</span>
          <h2>{active.metric.label}</h2>
          <strong className={styles.value}>{formatMetricValue(value, active.metric.unit)}</strong>
          <p>{active.metric.description}</p>
          <dl>
            <div>
              <dt>Measured</dt>
              <dd>
                {recordedAt ? (
                  <time dateTime={new Date(recordedAt).toISOString()}>{new Date(recordedAt).toLocaleString()}</time>
                ) : (
                  'Not recorded'
                )}
              </dd>
            </div>
            {value !== null && (
              <div>
                <dt>Raw value</dt>
                <dd>
                  {value.toLocaleString('en-US', { maximumFractionDigits: 3 })}{' '}
                  {active.metric.unit === 'ratio' ? '(unitless)' : active.metric.unit}
                </dd>
              </div>
            )}
            <div>
              <dt>Page opened</dt>
              <dd>{measurement.page ?? 'Waiting for browser measurements'}</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>This document visit, including in-app navigation. Refresh to start a new measurement.</dd>
            </div>
          </dl>
          {value === null && <p>Waiting for a measurement. Some metrics require interaction or browser support.</p>}
        </div>
      )}
    </footer>
  );
}
