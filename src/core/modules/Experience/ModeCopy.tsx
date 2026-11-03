'use client';

import { useExperience } from './ExperienceProvider';

interface ModeCopyProps {
  readonly children: string;
  readonly punk?: string;
}

export function ModeCopy({ children, punk }: ModeCopyProps) {
  const { mode } = useExperience();
  return mode === 'punk' && punk ? punk : children;
}
