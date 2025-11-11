import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';

export const ChipBaseStyles = cva(
  cn(
    'inline-flex items-center gap-1 rounded-full',
    'border',
    'px-2 py-0.5',
    'transition-colors duration-200 ease-out',
    'bg-(--bg) text-(--text) border-(--border)'
  ),
  {
    variants: {
      color: {
        primary:
          '[--bg:theme(colors.primary.50)] [--text:theme(colors.primary.700)] [--border:theme(colors.primary.200)]',
        success:
          '[--bg:theme(colors.success.50)] [--text:theme(colors.success.700)] [--border:theme(colors.success.200)]',
        error:
          '[--bg:theme(colors.error.50)] [--text:theme(colors.error.700)] [--border:theme(colors.error.200)]',
        warning:
          '[--bg:theme(colors.warning.50)] [--text:theme(colors.warning.700)] [--border:theme(colors.warning.200)]',
        info: '[--bg:theme(colors.info.50)] [--text:theme(colors.info.700)] [--border:theme(colors.info.200)]',
        default:
          '[--bg:theme(colors.gray.100)] [--text:theme(colors.gray.700)] [--border:theme(colors.gray.200)]',
      },
      size: {
        small: 'text-xs',
        medium: 'text-sm',
        large: 'text-base',
      },
      variant: {
        filled: '',
        outlined: 'bg-transparent [--text:theme(colors.gray.800)]',
      },
      clickable: {
        true: 'cursor-pointer hover:bg-(--hover)',
        false: '',
      },
    },
    compoundVariants: [
      {
        color: 'primary',
        clickable: 'true',
        className: '[--hover:theme(colors.primary.100)]',
      },
      {
        color: 'default',
        clickable: 'true',
        className: '[--hover:theme(colors.gray.200)]',
      },
    ],
    defaultVariants: {
      color: 'default',
      size: 'medium',
      variant: 'filled',
      clickable: 'false',
    },
  }
);

export const ChipDeleteStyles = cva(
  cn('inline-flex items-center justify-center rounded-full', 'text-(--text) hover:text-(--text)'),
  {
    variants: {
      size: {
        small: 'w-4 h-4 text-[10px]',
        medium: 'w-5 h-5 text-xs',
        large: 'w-6 h-6 text-sm',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

export const ChipStyles = {
  base: ChipBaseStyles,
  delete: ChipDeleteStyles,
};
