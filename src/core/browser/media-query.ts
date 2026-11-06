export function createMediaQuery(query: string) {
  return {
    getSnapshot: () => window.matchMedia(query).matches,
    getServerSnapshot: () => false,
    subscribe(onChange: () => void) {
      const media = window.matchMedia(query);
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    },
  };
}
