import styles from './CyberwarePortrait.module.scss';

export function CyberwarePortrait({ installedCount }: { readonly installedCount: number }) {
  const fullChrome = installedCount >= 3;

  return (
    <svg viewBox="0 0 200 220" fill="none" aria-hidden="true" className={styles.portrait}>
      <path d="M30 40H10v50m160-50h20v50M30 160H10v-30m160 30h20v-30" stroke="currentColor" opacity=".45" />
      <path
        d="M62 30 82 18h36l20 12 14 38-7 49-20 29v20l34 15 18 31H23l18-31 34-15v-20l-20-29-7-49Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      {!fullChrome && (
        <>
          <path
            d="m63 71 22-8 10 15-13 7-19-5Zm74 0-22-8-10 15 13 7 19-5ZM94 95l-6 15h24l-6-15M77 125h46M85 119v12m15-12v12m15-12v12M75 146l25 17 25-17M75 166l25 24 25-24"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M100 18v30m-38-18 38 18 38-18" stroke="currentColor" />
        </>
      )}
      {installedCount >= 1 && !fullChrome && (
        <g className={styles.augmentation}>
          <path d="m105 60 34-5 8 18-9 21-33-6-9-14Z" className={styles.plate} />
          <circle cx="123" cy="74" r="12" className={styles.optic} />
          <circle cx="123" cy="74" r="5" className={styles.core} />
          <path d="M123 58v7m0 18v7m-16-16h7m18 0h7m-2-17 9-10V30h12" className={styles.circuit} />
        </g>
      )}
      {installedCount >= 2 && (
        <g className={styles.augmentation}>
          <path d="m73 156-35 14-25 42h65l9-28Zm54 0 35 14 25 42h-65l-9-28Z" className={styles.plate} />
          <path d="m37 184 29-13 8 13-11 17H26Zm126 0-29-13-8 13 11 17h37Z" className={styles.armor} />
          <path
            d="M76 144v18l15 12v38m33-68v18l-15 12v38M49 107l-11 14v33l17 20m96-67 11 14v33l-17 20"
            className={styles.circuit}
          />
          <path d="m52 96 18 10 6 32-17-17Zm96 0-18 10-6 32 17-17Z" className={styles.plate} />
          <path d="m29 205 25-4m117 4-25-4M44 185l10-5m102 5-10-5" className={styles.signal} />
        </g>
      )}
      {fullChrome && (
        <g className={styles.augmentation}>
          <path
            d="m55 49 7-23 20-15h36l20 15 7 23 10 15-7 52-23 35-25 13-25-13-23-35-7-52Z"
            className={styles.helmet}
          />
          <path d="m64 28 22-9h28l22 9-9 25H73Z" className={styles.armor} />
          <path d="m56 60 14-8h60l14 8-7 31-37 8-37-8Z" className={styles.visorFrame} />
          <path d="m63 65 14-5h46l14 5-4 12-33 7-33-7Z" className={styles.visor} />
          <path d="m71 66 13 9m2-13 13 17m2-17 13 14m4-12 10 8" className={styles.visorSlits} />
          <path d="m76 104 24-8 24 8-3 30-21 14-21-14Z" className={styles.armor} />
          <path d="M86 111h28m-26 8h24m-22 8h20" className={styles.signal} />
          <path
            d="M45 64H33v36h14m108-36h12v36h-14M39 61V33l-9-12m131 40V33l9-12M93 21v19m14-19v19"
            className={styles.circuit}
          />
          <path d="m42 107 14 18m102-18-14 18M87 164l13 10 13-10" className={styles.signal} />
          <path d="m100 178 12 12-12 12-12-12Z" className={styles.core} />
          <path d="M100 181v18m-9-9h18" className={styles.visorSlits} />
        </g>
      )}
    </svg>
  );
}
