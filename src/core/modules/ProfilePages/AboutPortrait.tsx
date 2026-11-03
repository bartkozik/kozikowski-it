'use client';

import Image from 'next/image';

import { useExperience } from '@/core/modules/Experience/ExperienceProvider';

import styles from './AboutPortrait.module.scss';

export function AboutPortrait() {
  const { mode } = useExperience();
  const punk = mode === 'punk';

  return (
    <figure className={styles.portrait} data-punk={punk || undefined}>
      <div className={styles.label} aria-hidden="true">
        <span>{punk ? 'OPERATOR / BK—01' : 'HELLO, I’M BARTOSZ'}</span>
      </div>
      <div className={styles.imageFrame}>
        <Image
          src={punk ? '/images/profile/bartosz-punk.webp' : '/images/profile/bartosz-cutout.webp'}
          alt={
            punk
              ? 'Cyberpunk portrait of Bartosz Kozikowski with neon lighting and a temple implant'
              : 'Bartosz Kozikowski'
          }
          fill
          sizes="(max-width: 600px) 260px, 240px"
          className={styles.image}
        />
      </div>
      <figcaption className={styles.caption}>
        <span>{punk ? 'WARSAW NODE' : 'WARSAW, POLAND'}</span>
        <span>{punk ? 'HUMAN, AUGMENTED' : 'FULL STACK DEVELOPER'}</span>
      </figcaption>
    </figure>
  );
}
