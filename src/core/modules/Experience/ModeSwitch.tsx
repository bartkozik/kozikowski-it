'use client';

import { useExperience } from './ExperienceProvider';
import { interfaceModes } from './interface-mode';
import { setInterfaceMode } from './mode-store';
import styles from './ModeSwitch.module.scss';

const modes = {
  day: { icon: '☼', label: 'Day', title: 'Day shift — the original portfolio' },
  night: { icon: '☾', label: 'Night', title: 'Night shift — lights down, focus up' },
  punk: { icon: '↯', label: 'Punk', title: 'Punk mode — enter the implant lab' },
};

export function ModeSwitch({ embedded = false }: Readonly<{ embedded?: boolean }>) {
  const { mode } = useExperience();
  return (
    <div className={`${styles.bar} ${embedded ? styles.embedded : ''}`}>
      <span className={styles.label}>{mode === 'punk' ? 'UNAUTHORIZED INTERFACE // v.2077' : 'Choose your shift'}</span>
      <div className={styles.switch} role="group" aria-label="Interface mode">
        {interfaceModes.map((value) => (
          <button
            type="button"
            key={value}
            aria-pressed={mode === value}
            title={modes[value].title}
            onClick={() => setInterfaceMode(value)}
          >
            <span aria-hidden="true">{modes[value].icon}</span>
            {modes[value].label}
          </button>
        ))}
      </div>
    </div>
  );
}
