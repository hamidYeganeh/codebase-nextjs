import { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { CheckboxStyles } from './CheckboxStyles';

export type HTMLInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'color'>;

export type CheckboxVariants = VariantProps<(typeof CheckboxStyles)['box']>;

export interface CheckboxProps extends HTMLInputProps, CheckboxVariants {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: ReactNode;
  labelProps?: ComponentPropsWithoutRef<'label'>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
