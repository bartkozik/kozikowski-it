'use client';

import styles from './ProfilePages.module.scss';

export function PrintButton() {
  return (
    <button type="button" className={styles.printButton} onClick={() => window.print()}>
      Print resume <span aria-hidden="true">↗</span>
    </button>
  );
}
