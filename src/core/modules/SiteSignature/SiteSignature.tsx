import Image from 'next/image';

import styles from './SiteSignature.module.scss';

export function SiteSignature() {
  return (
    <div className={styles.signature}>
      <Image src="/assets/lajka-corp-it.webp" alt="" width={64} height={37} sizes="64px" />
      <span>Lajka Corp. IT</span>
    </div>
  );
}
