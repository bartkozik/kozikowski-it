import type { SiteMetricDefinition, SiteMetricKey } from './site-metrics';

const standardCopy = {
  title: 'Site metrics',
  shortTitle: 'Site metrics',
  back: 'All projects',
  subtitle: 'Your browser. Your connection. Real measurements.',
  visit: 'This visit',
  notice:
    'These are live readings from your browser, not a Lighthouse score or an average across visitors. Values can change as you interact with the site. Missing values mean the browser has not reported a measurement.',
  page: 'Page opened',
  waiting: 'Waiting for browser measurements',
  started: 'Visit started',
  unmeasured: 'Not measured',
  unrecorded: 'Not recorded',
  navigation: 'Navigation',
  restored: 'Restored from browser history cache',
  scope: 'Document visit, including in-app navigation',
  source: 'Source',
  sourceDescription: 'Browser Performance APIs and Google’s web-vitals library',
  privacy: 'Privacy',
  privacyDescription: 'Kept in this tab’s memory. No metrics are uploaded or saved in cookies or browser storage.',
  notes: [
    'Opening another page inside the site keeps the same document. Loading timings still describe the page opened above; transfer and interaction measurements continue across routes.',
    'Refresh any page to measure a new document load. Restoring a page from browser history starts a fresh measurement window without reusing its old load time.',
    'Transfer totals include this site’s completed requests and prefetches. Browser cache hits can add zero bytes. Third-party resources and iframe contents are excluded.',
    'LCP, INP and layout shift readings can evolve during the visit. Unsupported metrics stay unmeasured; an interaction may be needed before a value appears.',
  ],
  readings: 'Live readings',
  updated: 'Updated',
  context:
    'Device speed, network latency, browser support and cache state affect your results. These readings describe this visit, not overall site performance. Lighthouse audits, build duration and accessibility scores are separate checks and are not presented as live visitor measurements.',
  live: 'Live · your browser',
  measured: 'Measured',
  raw: 'Raw value',
  scopeLabel: 'Scope',
  tooltipScope: 'This document visit, including in-app navigation. Refresh to start a new measurement.',
  missing: 'Waiting for a measurement. Some metrics require interaction or browser support.',
};

const punkCopy: typeof standardCopy = {
  title: 'Rig diagnostics',
  shortTitle: 'Diagnostics',
  back: 'Back to the arsenal',
  subtitle: 'Your rig. Your uplink. Let’s see what survives the run.',
  visit: 'Current run // operator log',
  notice:
    'Live telemetry from the browser you brought to this job. Click around and watch the readings move. No signal means the sensor has not reported yet. This is your run, not a city-wide average or a Lighthouse score.',
  page: 'Entry node',
  waiting: 'Sensors warming up',
  started: 'Jack-in time',
  unmeasured: 'No signal yet',
  unrecorded: 'No pulse recorded',
  navigation: 'Route protocol',
  restored: 'Recovered from browser history cache. Fresh telemetry window.',
  scope: 'One document run. In-app route changes stay on the same channel.',
  source: 'Sensor stack',
  sourceDescription: 'Browser Performance APIs + Google’s web-vitals library. Real sensors under the neon.',
  privacy: 'Telemetry custody',
  privacyDescription:
    'Readings stay in this tab’s memory. No metrics uploaded, no cookies, no browser-storage stash. The megacorp gets no telemetry from this panel.',
  notes: [
    'Changing routes keeps the same run alive. Load timings belong to the entry node above; transfer and interaction sensors keep listening across pages.',
    'Refresh to jack in again and measure a new document load. A history-cache return opens a fresh telemetry window; old load times do not get a second life.',
    'Cargo manifest: completed requests and prefetches from this site. Cache hits may move zero bytes. Third-party resources and iframe contents are outside this scanner’s range.',
    'LCP, INP and layout shift can change while you roam. Some sensors need a click, tap or keypress. Unsupported sensors stay blank. No signal, no invented numbers.',
  ],
  readings: 'Live telemetry // no forged stats',
  updated: 'Last pulse',
  context:
    'Your hardware, uplink, browser and cache all leave fingerprints on these numbers. This panel describes one run, not the whole network. Lighthouse, build times and accessibility audits are separate diagnostics. Neon is not a performance upgrade.',
  live: 'LIVE FEED // YOUR RIG',
  measured: 'Last pulse',
  raw: 'Raw signal',
  scopeLabel: 'Run scope',
  tooltipScope: 'This document run includes in-app route changes. Refresh to start a fresh scan.',
  missing: 'Sensor quiet. Try an interaction; some readings need browser support before they come online.',
};

const punkDescriptions: Record<SiteMetricKey, string> = {
  ttfb: 'First contact. Time until the document’s first byte reaches your browser, including network latency. A history-cache restore can report zero.',
  fcp: 'First light on the visor. First Contentful Paint measures when this page opening first shows text or an image.',
  lcp: 'The big asset materializes. Largest Contentful Paint tracks the largest visible content; its candidate can change until you interact or leave.',
  inp: 'Reflex check. Interaction to Next Paint measures response to clicks, taps and keys during this run. Needs a qualifying interaction and browser support.',
  cls: 'Reality drift. Cumulative Layout Shift records the largest burst of unexpected layout movement. Unitless; a measured zero means no qualifying shifts so far.',
  loadTime:
    'Boot sequence complete. Time to the initial document load event; lazy-loaded cargo may arrive later. Not measured again on route changes or history-cache restores.',
  transferred:
    'Cargo through the uplink. Browser-reported transfer for completed requests and prefetches from this site: encoded bodies plus estimated headers. Cache hits can add zero. Other origins and iframe contents stay outside the manifest.',
  javascriptTransferred:
    'Executable cargo. Transfer for this site’s script requests, using actual encoding and cache state, plus estimated headers. No third-party scripts or inline code in this count.',
  resources:
    'Request manifest. Completed same-origin resource requests, including this document, cache hits, prefetches and repeats. Counts requests, not unique files.',
};

export function getMetricsCopy(punk: boolean) {
  return punk ? punkCopy : standardCopy;
}

export function getMetricDescription(metric: SiteMetricDefinition, punk: boolean) {
  return punk ? punkDescriptions[metric.key] : metric.description;
}
