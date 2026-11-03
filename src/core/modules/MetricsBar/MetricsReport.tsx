import { ArrowIcon } from '@/core/modules/Icons/ArrowIcon';
import Link from 'next/link';

import { siteMetricDefinitions, siteMetrics } from '@/core/content/site-metrics';

import { formatMetricValue } from './metric-format';
import styles from './MetricsReport.module.scss';

export function MetricsReport() {
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
        <p>Performance, page size and automated audit results for this portfolio.</p>
      </header>
      <div className={styles.content}>
        <section aria-labelledby="measurement-profile">
          <h2 id="measurement-profile">Measurement profile</h2>
          {siteMetrics.recordedAt === null && (
            <p className={styles.notice}>Results will appear here after a recorded measurement run.</p>
          )}
          <dl className={styles.profile}>
            <div>
              <dt>Environment</dt>
              <dd>{siteMetrics.environment ?? 'Not recorded'}</dd>
            </div>
            <div>
              <dt>Measured at</dt>
              <dd>
                {siteMetrics.recordedAt ? (
                  <time dateTime={siteMetrics.recordedAt}>{siteMetrics.recordedAt}</time>
                ) : (
                  'Not recorded'
                )}
              </dd>
            </div>
            <div>
              <dt>Page</dt>
              <dd>{siteMetrics.target ?? 'Not recorded'}</dd>
            </div>
            <div>
              <dt>Device, network and build profile</dt>
              <dd>{siteMetrics.profile ?? 'Not recorded'}</dd>
            </div>
            <div>
              <dt>Measurement tools</dt>
              <dd>{siteMetrics.tools ?? 'Not recorded'}</dd>
            </div>
            <div>
              <dt>Number of runs</dt>
              <dd>{siteMetrics.runs ?? 'Not recorded'}</dd>
            </div>
          </dl>
          {siteMetrics.notes.length > 0 && (
            <ul className={styles.notes}>
              {siteMetrics.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          )}
          {siteMetrics.evidence.length > 0 && (
            <ul className={styles.evidence} aria-label="Measurement reports">
              {siteMetrics.evidence.map((report) => (
                <li key={report.href}>
                  <a href={report.href}>{report.label}</a>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section aria-labelledby="measurement-results">
          <h2 id="measurement-results">Results</h2>
          <dl className={styles.results}>
            {siteMetricDefinitions.map((metric) => (
              <div className={styles.result} key={metric.key} id={metric.key}>
                <dt>{metric.label}</dt>
                <dd>
                  <span className={styles.value}>{formatMetricValue(siteMetrics.values[metric.key], metric.unit)}</span>
                  <p>{metric.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <p className={styles.context}>
          Results depend on the measured page, browser, device, network and cache state. A local production build
          measures this application on the recorded machine; a deployed site also includes hosting and network latency.
          Lighthouse scores describe one audit profile and can vary between runs.
        </p>
      </div>
    </main>
  );
}
