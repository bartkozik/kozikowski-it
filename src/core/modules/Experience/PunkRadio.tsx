'use client';

import { ArrowIcon } from '@/core/modules/Icons/ArrowIcon';

import { useRef, useState } from 'react';
import { useExperience } from './ExperienceProvider';
import styles from './PunkRadio.module.scss';

const playlistId = '37i9dQZF1DWYMokBiQj5qF';
const playlistUrl = `https://open.spotify.com/playlist/${playlistId}`;

export function PunkRadio() {
  const { mode } = useExperience();
  return mode === 'punk' ? <RadioReceiver /> : null;
}

function RadioReceiver() {
  const [view, setView] = useState<'closed' | 'expanded' | 'minimized'>('closed');
  const enabled = view !== 'closed';
  const minimized = view === 'minimized';
  const [showTracks, setShowTracks] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  function disconnect() {
    setView('closed');
    setShowTracks(false);
    trigger.current?.focus();
  }

  function minimize() {
    setView('minimized');
    trigger.current?.focus();
  }

  return (
    <aside
      className={styles.radio}
      aria-label="Pirate radio"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && enabled) {
          event.preventDefault();
          minimize();
        }
      }}
    >
      <div id="punk-radio-player" className={styles.panel} hidden={view !== 'expanded'}>
        {enabled && (
          <>
            <header className={styles.header}>
              <div>
                <span className={styles.serial}>RX—01 / UNLICENSED HARDWARE</span>
                <h2>
                  PIRATE FREQUENCY<span>_</span>
                </h2>
              </div>
              <div className={styles.windowControls}>
                <button
                  className={styles.close}
                  type="button"
                  onClick={minimize}
                  aria-label="Minimize radio"
                  title="Minimize radio"
                >
                  −
                </button>
                <button
                  className={styles.close}
                  type="button"
                  onClick={disconnect}
                  aria-label="Close radio and stop playback"
                >
                  ×
                </button>
              </div>
            </header>
            <div className={styles.tuner} aria-hidden="true">
              <span /> <b>2077</b>
            </div>
            <iframe
              title="Spotify — Cyberpunk 2077 Official Playlist"
              src={`https://open.spotify.com/embed/playlist/${playlistId}?theme=0`}
              width="100%"
              height={showTracks ? 352 : 152}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              className={styles.player}
            />
            <div className={styles.controls}>
              <button type="button" aria-pressed={showTracks} onClick={() => setShowTracks((current) => !current)}>
                {showTracks ? '− Hide tracklist' : '+ Tracklist'}
              </button>
              <a href={playlistUrl} target="_blank" rel="noreferrer">
                Spotify <ArrowIcon size={16} />
              </a>
            </div>
          </>
        )}
      </div>
      <div className={styles.dock}>
        <button
          ref={trigger}
          className={styles.trigger}
          type="button"
          aria-label={view === 'closed' ? 'Pirate radio' : minimized ? 'Expand radio' : 'Minimize radio'}
          aria-expanded={view === 'expanded'}
          aria-controls="punk-radio-player"
          onClick={() => (view === 'expanded' ? minimize() : setView('expanded'))}
        >
          <span className={styles.icon} aria-hidden="true">
            ↯
          </span>
          <span>
            RADIO<span className={styles.channel}> / CH.01</span>
          </span>
          <span className={styles.indicator} aria-hidden="true">
            {view === 'expanded' ? '−' : '+'}
          </span>
        </button>
        {enabled && (
          <button type="button" className={styles.stop} onClick={disconnect} aria-label="Stop radio" title="Stop radio">
            <span aria-hidden="true">■</span>
          </button>
        )}
      </div>
    </aside>
  );
}
