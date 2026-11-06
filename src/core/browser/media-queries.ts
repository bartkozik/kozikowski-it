import { createMediaQuery } from './media-query';

export const mobileViewport = createMediaQuery('(max-width: 699px)');
export const desktopBoard = createMediaQuery('(min-width: 1100px) and (pointer: fine)');
export const reducedMotion = createMediaQuery('(prefers-reduced-motion: reduce)');
