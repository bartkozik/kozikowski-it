'use client';

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
  const [enabled, setEnabled] = useState(false);
  const [showTracks, setShowTracks] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  function disconnect() {
    setEnabled(false);
    setShowTracks(false);
    trigger.current?.focus();
  }

  return (
    <aside
      className={styles.radio}
      aria-label="Pirate radio"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && enabled) {
          event.preventDefault();
          disconnect();
        }
      }}
    >
      <div id="punk-radio-player" className={styles.panel} hidden={!enabled}>
        {enabled && (
          <>
            <header className={styles.header}>
              <div>
                <span className={styles.serial}>RX—01 / UNLICENSED HARDWARE</span>
                <h2>
                  PIRATE FREQUENCY<span>_</span>
                </h2>
              </div>
              <button
                className={styles.close}
                type="button"
                onClick={disconnect}
                aria-label="Close radio and stop playback"
              >
                ×
              </button>
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
                Spotify ↗
              </a>
            </div>
            <p className={styles.note}>Manual ignition. Spotify may offer previews.</p>
          </>
        )}
      </div>
      <button
        ref={trigger}
        className={styles.trigger}
        type="button"
        aria-label="Pirate radio"
        aria-expanded={enabled}
        aria-controls="punk-radio-player"
        onClick={() => (enabled ? disconnect() : setEnabled(true))}
      >
        <span className={styles.icon} aria-hidden="true">
          ↯
        </span>
        <span>
          RADIO<span className={styles.channel}> / CH.01</span>
        </span>
        <span className={styles.indicator} aria-hidden="true">
          {enabled ? '×' : '+'}
        </span>
      </button>
    </aside>
  );
}
