import { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { ChipStyles } from './ChipStyles';

export type ChipVariants = VariantProps<(typeof ChipStyles)['base']>;

export interface ChipProps extends ChipVariants {
  label: ReactNode;
  onClick?: () => void;
  onDelete?: () => void;
  deleteIcon?: ReactNode;
  className?: string;
}
