'use client';

import { useState } from 'react';
import styles from './PunkRadio.module.scss';

const playlistId = '37i9dQZF1DWYMokBiQj5qF';
const playlistUrl = `https://open.spotify.com/playlist/${playlistId}`;

export function PunkRadio() {
  const [enabled, setEnabled] = useState(false);

  return (
    <section className={styles.radio} aria-labelledby="punk-radio-title">
      <div className={styles.header}>
        <div className={styles.identity}>
          <span className={styles.dial} aria-hidden="true">
            ↯
          </span>
          <div>
            <p className={styles.frequency}>WARSAW UNDERGROUND // CHANNEL 01</p>
            <h2 id="punk-radio-title">
              PIRATE RADIO<span>_</span>
            </h2>
          </div>
        </div>
        <button
          className={styles.power}
          type="button"
          aria-expanded={enabled}
          aria-controls="punk-radio-player"
          onClick={() => setEnabled((current) => !current)}
        >
          <span aria-hidden="true">{enabled ? '■' : '▶'}</span>
          {enabled ? 'Switch off' : 'Tune in'}
        </button>
      </div>
      <div id="punk-radio-player" hidden={!enabled}>
        {enabled && (
          <div className={styles.broadcast}>
            <div className={styles.station}>
              <span className={styles.stationLabel}>YOUR NEXT UPGRADE: A SOUNDTRACK.</span>
              <p>
                Code loud.
                <br />
                Stay human.
                <br />
                <span>Or don’t.</span>
              </p>
              <div className={styles.tuner} aria-hidden="true">
                <span />
              </div>
              <small>Cyberpunk 2077 Official Playlist</small>
            </div>
            <iframe
              title="Spotify — Cyberpunk 2077 Official Playlist"
              src={`https://open.spotify.com/embed/playlist/${playlistId}?theme=0`}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              className={styles.player}
            />
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <p>
          {enabled
            ? 'Pick a track in the player. Spotify may offer previews.'
            : 'Sound is optional. Good taste isn’t. Load Spotify to tune in.'}
        </p>
        <a href={playlistUrl} target="_blank" rel="noreferrer">
          Open in Spotify <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
