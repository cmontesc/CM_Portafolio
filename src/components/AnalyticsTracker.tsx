import { useEffect, useMemo, useRef } from 'react';
import type { AppView, Project } from '../types';
import {
  analyticsSectionVisibilityMs,
  getContentAnalyticsContext,
  toAnalyticsId,
  trackContentView,
  trackSectionView
} from '../services/analytics';

interface AnalyticsTrackerProps {
  currentView: AppView;
  selectedProject?: Project;
}

export function AnalyticsTracker({ currentView, selectedProject }: AnalyticsTrackerProps) {
  const context = useMemo(
    () => getContentAnalyticsContext(
      currentView,
      currentView === 'project-detail' ? selectedProject : undefined
    ),
    [currentView, currentView === 'project-detail' ? selectedProject : undefined]
  );
  const trackedContentKey = useRef<string | undefined>(undefined);

  useEffect(() => {
    const contentKey = `${context.contentType}:${context.contentId}`;
    if (trackedContentKey.current === contentKey) return;
    const timer = window.setTimeout(() => {
      if (trackedContentKey.current === contentKey) return;
      trackedContentKey.current = contentKey;
      trackContentView(context);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [context]);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-analytics-view-root]');
    if (!root || typeof IntersectionObserver === 'undefined') return;

    const headings = Array.from(root.querySelectorAll<HTMLElement>('h1, h2'));
    const observed = new Map<Element, { id: string; name: string; position: number }>();
    const observedIds = new Set<string>();
    const timers = new Map<Element, number>();
    const sent = new Set<string>();

    headings.forEach((heading, index) => {
      const name = heading.textContent?.trim();
      if (!name) return;
      const section = heading.closest('section');
      const id = section?.getAttribute('data-analytics-section') || toAnalyticsId(name);
      if (observedIds.has(id)) return;
      observedIds.add(id);
      observed.set(heading, { id, name, position: index + 1 });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const section = observed.get(entry.target);
        if (!section) return;
        const key = `${context.contentId}:${section.id}`;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !sent.has(key)) {
          if (timers.has(entry.target)) return;
          const timer = window.setTimeout(() => {
            sent.add(key);
            timers.delete(entry.target);
            trackSectionView(context, section.id, section.name, section.position);
          }, analyticsSectionVisibilityMs);
          timers.set(entry.target, timer);
        } else {
          const timer = timers.get(entry.target);
          if (timer !== undefined) window.clearTimeout(timer);
          timers.delete(entry.target);
        }
      });
    }, { threshold: [0.5] });

    observed.forEach((_, element) => observer.observe(element));
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [context]);

  return null;
}
