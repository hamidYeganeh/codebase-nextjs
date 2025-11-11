// types
import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef } from 'react';
// styles
import { ListStyles } from './ListStyles';

export interface ListProps
  extends ComponentPropsWithRef<'ul'>,
    VariantProps<(typeof ListStyles)['item']>,
    VariantProps<(typeof ListStyles)['base']> {
  disabledRipple?: boolean;
}
export interface ListItemProps
  extends Omit<ComponentPropsWithRef<'li'>, 'color'>,
    VariantProps<(typeof ListStyles)['item']> {
  disabledRipple?: boolean;
}
