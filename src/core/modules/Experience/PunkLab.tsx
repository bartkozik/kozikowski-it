'use client';

import { ArrowIcon } from '@/core/modules/Icons/ArrowIcon';

import { useExperience } from './ExperienceProvider';
import { getImplant } from './implants';
import { CyberwarePortrait } from './CyberwarePortrait';
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
      <div className={styles.scan} aria-hidden="true" data-stage={loadout.installed.length}>
        <span className={styles.scanLabel}>SUBJECT // YOU</span>
        <CyberwarePortrait installedCount={loadout.installed.length} />
        <span className={styles.scanReadout}>
          {
            ['100% ORGANIC / BORING', '1 MOD / OPTICS ONLINE', '2 MODS / CHROME REINFORCED', '3 MODS / LIMITERS OFF'][
              loadout.installed.length
            ]
          }
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
