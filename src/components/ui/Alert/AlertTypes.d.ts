import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { AlertStyles } from './AlertStyles';

export interface AlertProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<(typeof AlertStyles)['base']> {
  title?: ReactNode;
  description?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  startIcon?: ReactNode;
}
