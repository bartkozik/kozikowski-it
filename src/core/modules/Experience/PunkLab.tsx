'use client';

import { ArrowIcon } from '@/core/modules/Icons/ArrowIcon';

import { useExperience } from './ExperienceProvider';
import { getImplant } from './implants';
import { creditsRemaining, IMPLANT_SLOTS } from './loadout';
import styles from './PunkLab.module.scss';

export function PunkLab() {
  const { loadout, dispatch } = useExperience();
  return (
    <section className={styles.lab} aria-label="Cyberware playground">
      <div className={styles.headline}>
        <p className={styles.eyebrow}>
          <span /> WARSAW UNDERGROUND // RIPPERDOC ONLINE
        </p>
        <h2>
          LESS HUMAN.
          <br />
          <span>MORE FULL STACK.</span>
        </h2>
        <p className={styles.pitch}>
          Your hardware is organic. Your ambition shouldn’t be.
          <br />
          Turn real projects into a very questionable upgrade.
        </p>
        <span className={styles.stamp}>
          WARRANTY VOID
          <br />
          SINCE FIRST COMMIT
        </span>
      </div>
      <div className={styles.scan} aria-hidden="true" data-upgraded={loadout.installed.length > 0 || undefined}>
        <span className={styles.scanLabel}>SUBJECT // YOU</span>
        <svg viewBox="0 0 200 220" fill="none">
          <path
            d="M62 30 82 18h36l20 12 14 38-7 49-20 29v20l34 15 18 31H23l18-31 34-15v-20l-20-29-7-49Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="m63 71 22-8 10 15-13 7-19-5Zm74 0-22-8-10 15 13 7 19-5ZM94 95l-6 15h24l-6-15M77 125h46M85 119v12m15-12v12m15-12v12M75 146l25 17 25-17M75 166l25 24 25-24"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M30 40H10v50m160-50h20v50M30 160H10v-30m160 30h20v-30M100 18v30m-38-18 38 18 38-18"
            stroke="currentColor"
          />
          <circle cx="100" cy="49" r="6" className={loadout.installed.length > 0 ? styles.activeNode : styles.node} />
          <circle cx="55" cy="100" r="6" className={loadout.installed.length > 1 ? styles.activeNode : styles.node} />
          <circle cx="145" cy="100" r="6" className={loadout.installed.length > 2 ? styles.activeNode : styles.node} />
        </svg>
        <span className={styles.scanReadout}>
          {loadout.installed.length === 0 ? '100% ORGANIC / BORING' : `${loadout.installed.length} MODS / HUMAN-ISH`}
        </span>
      </div>
      <div className={styles.loadout}>
        <div className={styles.balance}>
          <span>YOUR PLAY MONEY</span>
          <strong>
            {creditsRemaining(loadout).toLocaleString('en-US')} <small>CR</small>
          </strong>
        </div>
        <div className={styles.slotsLabel}>
          <span>NEURAL SLOTS</span>
          <span>
            {loadout.installed.length} / {IMPLANT_SLOTS}
          </span>
        </div>
        <ol className={styles.slots}>
          {Array.from({ length: IMPLANT_SLOTS }, (_, index) => {
            const implant = getImplant(loadout.installed[index]);
            return (
              <li key={index} data-filled={!!implant || undefined}>
                <span className={styles.slotNumber}>0{index + 1}</span>
                <span>
                  {implant?.name ?? 'Empty socket'}
                  {implant && <small>{implant.perk}</small>}
                </span>
                {implant && (
                  <button
                    type="button"
                    aria-label={`Uninstall ${implant.name}`}
                    onClick={() => dispatch({ type: 'remove', slug: implant.slug })}
                  >
                    ×
                  </button>
                )}
              </li>
            );
          })}
        </ol>
        <button className={styles.reboot} type="button" onClick={() => dispatch({ type: 'reset' })}>
          <ArrowIcon direction="reset" size={20} /> Reboot humanity
        </button>
      </div>
      <div className={styles.console} role="status" aria-live="polite">
        <span aria-hidden="true">›_</span> {loadout.message}
      </div>
      <p className={styles.disclaimer}>
        Fictional implants. Real projects. Zero checkout. <span>Loadout lasts until you reload.</span>
      </p>
    </section>
  );
}
