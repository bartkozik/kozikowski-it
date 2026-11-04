'use client';

import { useSyncExternalStore } from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

import {
  createVisit,
  emptyVisit,
  recordLoad,
  recordResources,
  recordVital,
  type VisitMeasurement,
} from './visitor-measurement';

let current = emptyVisit;
let initialized = false;
const listeners = new Set<() => void>();

function publish(next: VisitMeasurement) {
  if (next === current) return;
  current = next;
  listeners.forEach((listener) => listener());
}

function startMeasurement() {
  if (initialized) return;
  initialized = true;
  publish(createVisit(window.location.href, performance.timeOrigin));
  let resourceWindowStart = 0;

  window.addEventListener(
    'pageshow',
    (event) => {
      if (!event.persisted) return;
      resourceWindowStart = event.timeStamp;
      publish(createVisit(window.location.href, Date.now(), true));
    },
    true,
  );

  function reportVital(metric: Metric) {
    publish(recordVital(current, metric, Date.now()));
  }

  onTTFB(reportVital);
  onFCP(reportVital);
  onLCP(reportVital, { reportAllChanges: true });
  onINP(reportVital, { reportAllChanges: true });
  onCLS(reportVital, { reportAllChanges: true });

  if (typeof PerformanceObserver === 'undefined') return;
  const supported = PerformanceObserver.supportedEntryTypes ?? [];
  if (supported.includes('resource')) {
    const resources = new PerformanceObserver((list) => {
      const entries = (list.getEntries() as PerformanceResourceTiming[]).filter(
        (entry) => entry.startTime >= resourceWindowStart,
      );
      publish(recordResources(current, entries, Date.now()));
    });
    resources.observe({ type: 'resource', buffered: true });
  }
  if (supported.includes('navigation')) {
    let documentCounted = false;
    const navigation = new PerformanceObserver((list) => {
      if (current.restored) return;
      for (const entry of list.getEntries() as PerformanceNavigationTiming[]) {
        let next = recordLoad(current, entry, Date.now());
        if (!documentCounted && entry.responseEnd > 0) {
          next = recordResources(next, [entry], Date.now());
          documentCounted = true;
        }
        publish(next);
      }
    });
    navigation.observe({ type: 'navigation', buffered: true });
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  startMeasurement();
  return () => {
    listeners.delete(listener);
  };
}

export function useVisitorMetrics() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => emptyVisit,
  );
}
