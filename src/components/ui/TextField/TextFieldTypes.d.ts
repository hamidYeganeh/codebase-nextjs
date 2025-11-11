import { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ReactNode, Ref } from 'react';
import { TextFieldStyles } from './TextFieldStyles';

export type HTMLInputProps = Omit<ComponentPropsWithRef<'input'>, 'color' | 'size'>;

export type TextFieldVariants = VariantProps<(typeof TextFieldStyles)['container']>;

export interface TextFieldProps extends HTMLInputProps, TextFieldVariants {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  focused?: boolean;
  margin?: 'none' | 'dense' | 'normal';

  multiline?: boolean;
  rows?: number;
  minRows?: number;
  maxRows?: number;

  select?: boolean;
  children?: ReactNode; // for <option> when select

  startAdornment?: ReactNode;
  endAdornment?: ReactNode;

  inputRef?: Ref<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

  // className additions per sub-part
  inputClassName?: string;
  labelProps?: ComponentPropsWithoutRef<'label'>;
  helperTextProps?: ComponentPropsWithoutRef<'p'>;
  containerClassName?: string;
}
