'use client';

import { ArrowIcon } from '@/core/modules/Icons/ArrowIcon';
import Link from 'next/link';

import { useExperience } from '@/core/modules/Experience/ExperienceProvider';
import { getMetricsCopy, getMetricDescription } from '@/core/content/metrics-copy';
import { siteMetricDefinitions } from '@/core/content/site-metrics';

import { formatMetricValue } from './metric-format';
import { MeasurementTime } from './MeasurementTime';
import { useVisitorMetrics } from './use-visitor-metrics';
import styles from './MetricsReport.module.scss';

export function MetricsReport() {
  const measurement = useVisitorMetrics();
  const { mode } = useExperience();
  const punk = mode === 'punk';
  const copy = getMetricsCopy(punk);

  return (
    <main className={styles.page} id="main-content" tabIndex={-1}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          <span aria-hidden="true">
            <ArrowIcon direction="left" />
          </span>{' '}
          {copy.back}
        </Link>
        <h1>{copy.title}</h1>
        <p>{copy.subtitle}</p>
      </header>
      <div className={styles.content}>
        <section aria-labelledby="measurement-profile">
          <h2 id="measurement-profile">{copy.visit}</h2>
          <p className={styles.notice}>{copy.notice}</p>
          <dl className={styles.profile}>
            <div>
              <dt>{copy.page}</dt>
              <dd>{measurement.page ?? copy.waiting}</dd>
            </div>
            <div>
              <dt>{copy.started}</dt>
              <dd>
                <MeasurementTime timestamp={measurement.startedAt} fallback={copy.unmeasured} />
              </dd>
            </div>
            <div>
              <dt>{copy.navigation}</dt>
              <dd>{measurement.restored ? copy.restored : copy.scope}</dd>
            </div>
            <div>
              <dt>{copy.source}</dt>
              <dd>{copy.sourceDescription}</dd>
            </div>
            <div>
              <dt>{copy.privacy}</dt>
              <dd>{copy.privacyDescription}</dd>
            </div>
          </dl>
          <ul className={styles.notes}>
            {copy.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="measurement-results">
          <h2 id="measurement-results">{copy.readings}</h2>
          <dl className={styles.results}>
            {siteMetricDefinitions.map((metric) => {
              const reading = measurement.metrics[metric.key];
              return (
                <div className={styles.result} key={metric.key} id={metric.key}>
                  <dt>{metric.label}</dt>
                  <dd>
                    <span className={styles.value}>{formatMetricValue(reading.value, metric.unit)}</span>
                    <p>{getMetricDescription(metric, punk)}</p>
                    {reading.recordedAt !== null && (
                      <p>
                        {copy.updated} <MeasurementTime timestamp={reading.recordedAt} fallback={copy.unrecorded} />
                      </p>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>
        <p className={styles.context}>{copy.context}</p>
      </div>
    </main>
  );
}
