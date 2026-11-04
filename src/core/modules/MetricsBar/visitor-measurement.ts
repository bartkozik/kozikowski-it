import type { SiteMetricKey } from '../../content/site-metrics';

type Reading = { readonly value: number | null; readonly recordedAt: number | null };

export interface VisitMeasurement {
  readonly page: string | null;
  readonly startedAt: number | null;
  readonly restored: boolean;
  readonly metrics: Readonly<Record<SiteMetricKey, Reading>>;
}

const emptyReading: Reading = { value: null, recordedAt: null };

export const emptyVisit: VisitMeasurement = {
  page: null,
  startedAt: null,
  restored: false,
  metrics: {
    ttfb: emptyReading,
    fcp: emptyReading,
    lcp: emptyReading,
    inp: emptyReading,
    cls: emptyReading,
    loadTime: emptyReading,
    transferred: emptyReading,
    javascriptTransferred: emptyReading,
    resources: emptyReading,
  },
};

export function createVisit(url: string, startedAt: number, restored = false): VisitMeasurement {
  const page = new URL(url);
  return { ...emptyVisit, page: page.origin + page.pathname, startedAt, restored };
}

const vitalKeys = { TTFB: 'ttfb', FCP: 'fcp', LCP: 'lcp', INP: 'inp', CLS: 'cls' } as const;

export function recordVital(
  visit: VisitMeasurement,
  metric: { name: keyof typeof vitalKeys; value: number },
  recordedAt: number,
): VisitMeasurement {
  if (!Number.isFinite(metric.value) || metric.value < 0) return visit;
  return {
    ...visit,
    metrics: { ...visit.metrics, [vitalKeys[metric.name]]: { value: metric.value, recordedAt } },
  };
}

export function recordLoad(
  visit: VisitMeasurement,
  navigation: { startTime: number; loadEventEnd: number },
  recordedAt: number,
): VisitMeasurement {
  const value = navigation.loadEventEnd - navigation.startTime;
  if (visit.restored || !Number.isFinite(value) || value <= 0) return visit;
  return { ...visit, metrics: { ...visit.metrics, loadTime: { value, recordedAt } } };
}

export function recordResources(
  visit: VisitMeasurement,
  resources: readonly { name: string; transferSize: number; initiatorType: string }[],
  recordedAt: number,
): VisitMeasurement {
  if (!visit.page) return visit;
  const origin = new URL(visit.page).origin;
  let transferred = 0;
  let scripts = 0;
  let count = 0;
  for (const resource of resources) {
    let url: URL;
    try {
      url = new URL(resource.name);
    } catch {
      continue;
    }
    if (url.origin !== origin || !['http:', 'https:'].includes(url.protocol)) continue;
    if (!Number.isFinite(resource.transferSize) || resource.transferSize < 0) continue;
    transferred += resource.transferSize;
    if (resource.initiatorType === 'script') scripts += resource.transferSize;
    count++;
  }
  if (!count) return visit;
  return {
    ...visit,
    metrics: {
      ...visit.metrics,
      transferred: { value: (visit.metrics.transferred.value ?? 0) + transferred, recordedAt },
      javascriptTransferred: { value: (visit.metrics.javascriptTransferred.value ?? 0) + scripts, recordedAt },
      resources: { value: (visit.metrics.resources.value ?? 0) + count, recordedAt },
    },
  };
}
