import styles from './ArrowIcon.module.scss';

const rotations = {
  'up-right': 0,
  right: 45,
  down: 135,
  left: 225,
  up: -45,
};

interface ArrowIconProps {
  readonly direction?: keyof typeof rotations | 'shuffle' | 'reset';
  readonly size?: number;
}

function getArrowPath(direction: NonNullable<ArrowIconProps['direction']>) {
  if (direction === 'shuffle') {
    return { d: 'M4 7h3c4 0 6 10 10 10h3m-4-4 4 4-4 4M4 17h3c4 0 6-10 10-10h3m-4-4 4 4-4 4' };
  }
  if (direction === 'reset') return { d: 'M20 8a8 8 0 1 0 0 8M20 3v5h-5' };
  return { d: 'M6 18 18 6M9 6h9v9', transform: `rotate(${rotations[direction]} 12 12)` };
}

export function ArrowIcon({ direction = 'up-right', size = 24 }: ArrowIconProps) {
  const path = getArrowPath(direction);
  return (
    <svg
      className={styles.icon}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path {...path} />
    </svg>
  );
}
