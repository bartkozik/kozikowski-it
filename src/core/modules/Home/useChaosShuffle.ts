import { useEffect, useRef, useState, type RefObject } from 'react';
import { flushSync } from 'react-dom';

const messages = [
  'ORDER IS A CORPORATE CONSTRUCT.',
  'REALITY RECOMPILED. 0 WARRANTIES.',
  'YOUR PROJECTS HAVE LEFT THE CHAT.',
];

export function useChaosShuffle(enabled: boolean, canvas: RefObject<HTMLDivElement | null>, shuffle: () => void) {
  const [scrambling, setScrambling] = useState(false);
  const [message, setMessage] = useState('');
  const active = useRef<Animation[] | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 1100px) and (pointer: fine)');
    function cancel() {
      active.current?.forEach((animation) => animation.cancel());
    }
    function preferenceChanged() {
      if (reducedMotion.matches || !desktop.matches) cancel();
    }
    reducedMotion.addEventListener('change', preferenceChanged);
    desktop.addEventListener('change', preferenceChanged);
    return () => {
      cancel();
      reducedMotion.removeEventListener('change', preferenceChanged);
      desktop.removeEventListener('change', preferenceChanged);
    };
  }, [enabled]);

  function run() {
    if (active.current) return;
    if (!enabled || !canvas.current) {
      shuffle();
      return;
    }
    const nextMessage = messages[Math.floor(Math.random() * messages.length)];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      shuffle();
      setMessage(nextMessage);
      return;
    }
    const cards = Array.from(canvas.current.children).filter(
      (element): element is HTMLElement => element instanceof HTMLElement,
    );
    const before = cards.map((card) => ({
      x: card.offsetLeft,
      y: card.offsetTop,
      transform: getComputedStyle(card).transform,
      hidden: card.hidden,
    }));
    flushSync(() => {
      shuffle();
      setMessage('');
      setScrambling(true);
    });
    const animations = cards.map((card, index) => {
      const previous = before[index];
      const style = getComputedStyle(card);
      const end = `rotate(${style.getPropertyValue('--rotation')})`;
      const dx = previous.hidden ? 0 : previous.x - card.offsetLeft;
      const dy = previous.hidden ? 0 : previous.y - card.offsetTop;
      const start = previous.hidden ? `${end} scale(0.8)` : previous.transform;
      const direction = index % 2 === 0 ? -1 : 1;
      const burstX = direction * (35 + Math.random() * 55);
      const burstY = (Math.random() - 0.5) * 140;
      return card.animate(
        [
          { offset: 0, transform: `translate(${dx}px, ${dy}px) ${start}`, boxShadow: style.boxShadow },
          {
            offset: 0.12,
            transform: `translate(${dx + direction * 5}px, ${dy - 3}px) ${start}`,
            boxShadow: '9px 2px 0 #ff2bba, -9px -2px 0 #46f4e9',
          },
          {
            offset: 0.24,
            transform: `translate(${dx - direction * 5}px, ${dy + 3}px) ${start}`,
            boxShadow: '-8px 3px 0 #ff2bba, 8px -3px 0 #46f4e9',
          },
          {
            offset: 0.56,
            transform: `translate(${burstX}px, ${burstY}px) ${end} rotate(${direction * 18}deg) scale(0.94)`,
            boxShadow: `${-direction * 24}px 12px 0 #ff2bba55, ${-direction * 48}px 24px 0 #46f4e92e`,
          },
          { offset: 1, transform: end, boxShadow: style.boxShadow },
        ],
        { duration: 1000 + index * 12, easing: 'cubic-bezier(0.22, 0.7, 0.3, 1)' },
      );
    });
    active.current = animations;
    void Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
      active.current = null;
      setScrambling(false);
      setMessage(nextMessage);
    });
  }

  return { run, scrambling: enabled && scrambling, message: enabled ? message : '' };
}
