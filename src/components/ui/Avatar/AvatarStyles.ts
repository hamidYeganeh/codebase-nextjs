import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const base = cva(
  cn(
    'relative inline-flex items-center justify-center overflow-hidden bg-(--light-color) text-(--color)'
  ),
  {
    variants: {
      size: {
        xs: 'w-8 h-8 text-xs',
        sm: 'w-10 h-10 text-sm',
        md: 'w-12 h-12 text-sm',
        lg: 'w-14 h-14 text-base',
        xl: 'w-16 h-16 text-lg',
      },
      radius: {
        none: 'rounded-none',
        xs: 'rounded-xs',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
      color: {
        default: '[--color:theme(colors.gray.600)] [--light-color:theme(colors.gray.100)]',
        primary: '[--color:theme(colors.primary.600)] [--light-color:theme(colors.primary.100)]',
        success: '[--color:theme(colors.success.600)] [--light-color:theme(colors.success.100)]',
        error: '[--color:theme(colors.error.600)] [--light-color:theme(colors.error.100)]',
        warning: '[--color:theme(colors.warning.600)] [--light-color:theme(colors.warning.100)]',
        info: '[--color:theme(colors.info.600)] [--light-color:theme(colors.info.100)]',
      },
      ring: {
        true: 'ring-2 ring-(--color)',
        false: '',
      },
    },
    defaultVariants: { size: 'md', radius: 'full', color: 'default' },
  }
);

export const AvatarStyles = { base };
