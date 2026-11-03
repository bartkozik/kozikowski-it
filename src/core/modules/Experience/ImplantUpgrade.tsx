'use client';

import { useExperience } from './ExperienceProvider';
import { getImplant } from './implants';
import { creditsRemaining, IMPLANT_SLOTS } from './loadout';
import styles from './ImplantUpgrade.module.scss';

export function ImplantUpgrade({ slug }: { slug: string }) {
  const { loadout, dispatch } = useExperience();
  const implant = getImplant(slug);
  if (!implant) return null;
  const installed = loadout.installed.includes(slug);
  const blocked =
    !installed && (loadout.installed.length >= IMPLANT_SLOTS || creditsRemaining(loadout) < implant.price);
  const action = installed
    ? 'Uninstall'
    : loadout.installed.length >= IMPLANT_SLOTS
      ? 'Slots full'
      : creditsRemaining(loadout) < implant.price
        ? 'Low credits'
        : 'Install';
  return (
    <div className={styles.upgrade} data-installed={installed || undefined}>
      <div className={styles.topline}>
        <span>
          {implant.code} / {implant.category}
        </span>
        <span>{installed ? '● LINKED' : '○ STOCK'}</span>
      </div>
      <h3>{implant.name}</h3>
      <p>{implant.perk}</p>
      <button
        type="button"
        aria-label={`${action} ${implant.name}`}
        disabled={blocked}
        onClick={() => dispatch({ type: installed ? 'remove' : 'install', slug })}
      >
        <span>
          {action} {installed ? '−' : '↗'}
        </span>
        <span>
          {installed ? '+' : ''}
          {implant.price} CR
        </span>
      </button>
      <small>{installed ? implant.sideEffect : 'Fictional upgrade · real project above'}</small>
    </div>
  );
}
