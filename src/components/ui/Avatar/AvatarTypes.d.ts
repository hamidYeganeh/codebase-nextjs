import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { AvatarStyles } from './AvatarStyles';

export interface AvatarProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<(typeof AvatarStyles)['base']> {
  src?: string;
  alt?: string;
  name?: string;
}
