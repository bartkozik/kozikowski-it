export type SiteMetricKey =
  'ttfb' | 'fcp' | 'lcp' | 'inp' | 'cls' | 'loadTime' | 'transferred' | 'javascriptTransferred' | 'resources';

export type SiteMetricUnit = 'ms' | 'bytes' | 'ratio' | 'count';

export interface SiteMetricDefinition {
  readonly key: SiteMetricKey;
  readonly label: string;
  readonly unit: SiteMetricUnit;
  readonly description: string;
}

export const siteMetricDefinitions: readonly SiteMetricDefinition[] = [
  {
    key: 'ttfb',
    label: 'TTFB',
    unit: 'ms',
    description:
      'Time until the first byte of the document arrives in your browser, including network latency. A page restored from browser history can report zero.',
  },
  {
    key: 'fcp',
    label: 'FCP',
    unit: 'ms',
    description: 'First Contentful Paint: time until your browser first paints text or an image for this page opening.',
  },
  {
    key: 'lcp',
    label: 'LCP',
    unit: 'ms',
    description:
      'Largest Contentful Paint: when the largest visible content appears. The candidate can change until you interact with or leave the page.',
  },
  {
    key: 'inp',
    label: 'INP',
    unit: 'ms',
    description:
      'Interaction to Next Paint: responsiveness to clicks, taps and keyboard input during this visit. Waits for a qualifying interaction in a supported browser.',
  },
  {
    key: 'cls',
    label: 'Layout shift',
    unit: 'ratio',
    description:
      'Cumulative Layout Shift: the largest burst of unexpected layout movement during this visit. Unitless; a measured zero means no qualifying shifts so far.',
  },
  {
    key: 'loadTime',
    label: 'Load time',
    unit: 'ms',
    description:
      'Time until the initial document load event completes. Lazy-loaded content can arrive later. Not measured again on in-app navigation or history-cache restoration.',
  },
  {
    key: 'transferred',
    label: 'Transferred',
    unit: 'bytes',
    description:
      'Browser-reported transfer for this site’s completed requests, including the document, later loads and prefetches. Uses encoded bodies plus estimated headers; cached resources can add zero. Excludes other origins and iframe contents.',
  },
  {
    key: 'javascriptTransferred',
    label: 'JS transferred',
    unit: 'bytes',
    description:
      'Browser-reported transfer for this site’s script requests during this visit, using the actual encoding and cache state. Includes estimated headers; excludes third-party scripts and inline code.',
  },
  {
    key: 'resources',
    label: 'Resources',
    unit: 'count',
    description:
      'Completed same-origin resource requests observed in this document, including the document itself, cache hits, prefetches and repeated requests. Counts requests, not unique files.',
  },
];
