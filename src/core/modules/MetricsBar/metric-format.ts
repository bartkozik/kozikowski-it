import type { SiteMetricUnit } from '../../content/site-metrics';

const numberFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });

export function formatMetricValue(value: number | null, unit: SiteMetricUnit): string {
  if (value === null || !Number.isFinite(value) || value < 0 || (unit === 'score' && value > 100)) {
    return 'Not measured';
  }

  if (unit === 'bytes') {
    const divisor = value >= 1024 * 1024 ? 1024 * 1024 : 1024;
    const suffix = divisor === 1024 ? 'KiB' : 'MiB';
    return `${numberFormat.format(value / divisor)} ${suffix}`;
  }

  if (unit === 'score') {
    return `${numberFormat.format(value)}/100`;
  }

  return `${numberFormat.format(value)} ${unit}`;
}
