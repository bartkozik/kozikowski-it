'use client';

import dayPortrait from '../../../../public/images/profile/bartosz-cutout.webp';
import punkPortrait from '../../../../public/images/profile/bartosz-punk.webp';
import { ProgressiveImage } from '@/core/modules/ProgressiveImage/ProgressiveImage';

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
        <div className={styles.dayImage}>
          <ProgressiveImage
            src={dayPortrait}
            alt="Bartosz Kozikowski"
            fill
            sizes="(max-width: 600px) 260px, 240px"
            loading="eager"
            fetchPriority={punk ? 'low' : 'high'}
          />
        </div>
        <div className={styles.punkImage}>
          <ProgressiveImage
            src={punkPortrait}
            alt="Cyberpunk portrait of Bartosz Kozikowski with neon lighting and a temple implant"
            fill
            sizes="(max-width: 600px) 260px, 240px"
            loading="eager"
            fetchPriority={punk ? 'high' : 'low'}
          />
        </div>
      </div>
      <figcaption className={styles.caption}>
        <span>{punk ? 'WARSAW NODE' : 'WARSAW, POLAND'}</span>
        <span>{punk ? 'HUMAN, AUGMENTED' : 'FULL STACK DEVELOPER'}</span>
      </figcaption>
    </figure>
  );
}
