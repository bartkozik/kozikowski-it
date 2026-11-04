'use client';

import { ArrowIcon } from '@/core/modules/Icons/ArrowIcon';
import Link from 'next/link';

import { siteMetricDefinitions } from '@/core/content/site-metrics';

import { formatMetricValue } from './metric-format';
import { useVisitorMetrics } from './use-visitor-metrics';
import styles from './MetricsReport.module.scss';

export function MetricsReport() {
  const measurement = useVisitorMetrics();

  return (
    <main className={styles.page} id="main-content">
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          <span aria-hidden="true">
            <ArrowIcon direction="left" />
          </span>{' '}
          All projects
        </Link>
        <h1>Site metrics</h1>
        <p>Your browser. Your connection. Real measurements.</p>
      </header>
      <div className={styles.content}>
        <section aria-labelledby="measurement-profile">
          <h2 id="measurement-profile">This visit</h2>
          <p className={styles.notice}>
            These are live readings from your browser, not a Lighthouse score or an average across visitors. Values can
            change as you interact with the site. Missing values mean the browser has not reported a measurement.
          </p>
          <dl className={styles.profile}>
            <div>
              <dt>Page opened</dt>
              <dd>{measurement.page ?? 'Waiting for browser measurements'}</dd>
            </div>
            <div>
              <dt>Visit started</dt>
              <dd>
                {measurement.startedAt !== null ? (
                  <time dateTime={new Date(measurement.startedAt).toISOString()}>
                    {new Date(measurement.startedAt).toLocaleString()}
                  </time>
                ) : (
                  'Not measured'
                )}
              </dd>
            </div>
            <div>
              <dt>Navigation</dt>
              <dd>
                {measurement.restored
                  ? 'Restored from browser history cache'
                  : 'Document visit, including in-app navigation'}
              </dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>Browser Performance APIs and Google’s web-vitals library</dd>
            </div>
            <div>
              <dt>Privacy</dt>
              <dd>Kept in this tab’s memory. No metrics are uploaded or saved in cookies or browser storage.</dd>
            </div>
          </dl>
          <ul className={styles.notes}>
            <li>
              Opening another page inside the site keeps the same document. Loading timings still describe the page
              opened above; transfer and interaction measurements continue across routes.
            </li>
            <li>
              Refresh any page to measure a new document load. Restoring a page from browser history starts a fresh
              measurement window without reusing its old load time.
            </li>
            <li>
              Transfer totals include this site’s completed requests and prefetches. Browser cache hits can add zero
              bytes. Third-party resources and iframe contents are excluded.
            </li>
            <li>
              LCP, INP and layout shift readings can evolve during the visit. Unsupported metrics stay unmeasured; an
              interaction may be needed before a value appears.
            </li>
          </ul>
        </section>
        <section aria-labelledby="measurement-results">
          <h2 id="measurement-results">Live readings</h2>
          <dl className={styles.results}>
            {siteMetricDefinitions.map((metric) => {
              const reading = measurement.metrics[metric.key];
              return (
                <div className={styles.result} key={metric.key} id={metric.key}>
                  <dt>{metric.label}</dt>
                  <dd>
                    <span className={styles.value}>{formatMetricValue(reading.value, metric.unit)}</span>
                    <p>{metric.description}</p>
                    {reading.recordedAt !== null && (
                      <p>
                        Updated{' '}
                        <time dateTime={new Date(reading.recordedAt).toISOString()}>
                          {new Date(reading.recordedAt).toLocaleString()}
                        </time>
                      </p>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>
        <p className={styles.context}>
          Device speed, network latency, browser support and cache state affect your results. These readings describe
          this visit, not overall site performance. Lighthouse audits, build duration and accessibility scores are
          separate checks and are not presented as live visitor measurements.
        </p>
      </div>
    </main>
  );
}
