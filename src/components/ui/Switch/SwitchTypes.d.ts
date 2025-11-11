import { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { SwitchStyles } from './SwitchStyles';

export type HTMLInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'color'>;

export type SwitchVariants = VariantProps<(typeof SwitchStyles)['track']>;

export interface SwitchProps extends HTMLInputProps, SwitchVariants {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  labelProps?: ComponentPropsWithoutRef<'label'>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
