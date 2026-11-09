import { useState, type FocusEvent, type PointerEvent } from 'react';

export function useProjectHighlight() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  function getHandlers(slug: string) {
    return {
      onPointerEnter(event: PointerEvent<HTMLElement>) {
        if (event.pointerType !== 'touch') setHovered(slug);
      },
      onPointerLeave() {
        setHovered(null);
      },
      onFocus(event: FocusEvent<HTMLElement>) {
        if (event.target instanceof HTMLElement && event.target.matches(':focus-visible')) setFocused(slug);
      },
      onBlur() {
        setFocused(null);
      },
    };
  }

  function clear() {
    setHovered(null);
    setFocused(null);
  }

  return { project: focused ?? hovered, getHandlers, clear };
}
