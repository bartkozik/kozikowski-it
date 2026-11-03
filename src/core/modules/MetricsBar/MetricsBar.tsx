import Link from 'next/link';

import { siteMetricDefinitions, siteMetrics } from '@/core/content/site-metrics';

import { formatMetricValue } from './metric-format';
import styles from './MetricsBar.module.scss';

export function MetricsBar() {
  return (
    <footer className={styles.footer} aria-label="Site metrics">
      <div className={styles.scrollArea} role="region" aria-label="Site metrics, scroll horizontally" tabIndex={0}>
        <ul className={styles.metrics}>
          <li className={styles.item}>
            <Link href="/metrics" className={styles.detailsLink}>
              Site metrics <span aria-hidden="true">↗</span>
            </Link>
          </li>
          {siteMetricDefinitions.map((metric) => (
            <li className={styles.item} key={metric.key}>
              <span className={styles.separator} aria-hidden="true" />
              <span>
                {metric.label}: {formatMetricValue(siteMetrics.values[metric.key], metric.unit)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
