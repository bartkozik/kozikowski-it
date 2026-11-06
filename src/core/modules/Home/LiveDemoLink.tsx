import styles from './LiveDemoLink.module.scss';

interface LiveDemoLinkProps {
  readonly href: `https://${string}`;
  readonly projectName: string;
}

export function LiveDemoLink({ href, projectName }: LiveDemoLinkProps) {
  return (
    <a
      className={styles.badge}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${projectName}: Live demo (opens in a new tab)`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="m10 8 6 4-6 4Z" />
      </svg>
      Live demo
    </a>
  );
}
