import { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { RadioStyles } from './RadioStyles';

export type HTMLInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'color'>;

export type RadioVariants = VariantProps<(typeof RadioStyles)['circle']>;

export interface RadioProps extends HTMLInputProps, RadioVariants {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  labelProps?: ComponentPropsWithoutRef<'label'>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
