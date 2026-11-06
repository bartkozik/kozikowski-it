'use client';

import { ArrowIcon } from '@/core/modules/Icons/ArrowIcon';

import { useExperience } from './ExperienceProvider';
import { getImplant } from './implants';
import { creditsRemaining, IMPLANT_SLOTS } from './loadout';
import styles from './ImplantUpgrade.module.scss';

function getActionLabel(installed: boolean, slotsFull: boolean, lowCredits: boolean): string {
  if (installed) return 'Uninstall';
  if (slotsFull) return 'Slots full';
  if (lowCredits) return 'Low credits';
  return 'Install';
}

export function ImplantUpgrade({ slug }: { slug: string }) {
  const { loadout, dispatch } = useExperience();
  const implant = getImplant(slug);
  if (!implant) return null;
  const installed = loadout.installed.includes(slug);
  const slotsFull = loadout.installed.length >= IMPLANT_SLOTS;
  const lowCredits = creditsRemaining(loadout) < implant.price;
  const blocked = !installed && (slotsFull || lowCredits);
  const action = getActionLabel(installed, slotsFull, lowCredits);
  const actionIcon = installed ? <span aria-hidden="true">−</span> : <ArrowIcon size={16} />;
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
          {action} {actionIcon}
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
