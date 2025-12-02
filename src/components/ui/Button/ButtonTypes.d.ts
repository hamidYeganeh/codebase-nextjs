// styles
import { ButtonStyles } from './ButtonStyles';
// types
import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';

export type HTMLButtonProps = Omit<ComponentPropsWithRef<'button'>, 'color'>;
export type ButtonStylesVariants = VariantProps<(typeof ButtonStyles)['base']>;
export interface ButtonProps extends HTMLButtonProps, ButtonStylesVariants {
  disabledRipple?: boolean;
  fullWidth?: boolean;
  as?: ElementType;
  href?: string;
  loading?: boolean;
  spinnerPlacement?: 'start' | 'end' | 'center';
  spinner?: ReactNode;
  isIconOnly?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disableAnimation?: boolean;
}
