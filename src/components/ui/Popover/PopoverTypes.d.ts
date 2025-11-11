// types
import type {
  PopoverProps as BasePopoverProps,
  PopoverTriggerProps as BasePopoverTriggerProps,
  PopoverContentProps as BasePopoverContentProps,
} from '@radix-ui/react-popover';
import { VariantProps } from 'class-variance-authority';
import type { HTMLMotionProps } from 'motion/react';
import { PopoverStyles } from './PopoverStyles';

export interface IPopoverContext {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export type PopoverProps = BasePopoverProps;
export type PopoverTriggerProps = BasePopoverTriggerProps;
export type PopoverContentProps = BasePopoverContentProps &
  HTMLMotionProps<'div'> &
  VariantProps<typeof PopoverStyles.content>;
