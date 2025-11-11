import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { SpinnerStyles } from './SpinnerStyles';

export interface SpinnerProps
  extends ComponentPropsWithoutRef<'span'>,
    VariantProps<(typeof SpinnerStyles)['base']> {}
