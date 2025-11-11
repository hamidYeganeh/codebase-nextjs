import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const root = cva(cn('w-full'), {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
    radius: {
      none: 'rounded-none',
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
    color: {
      primary:
        '[--color:theme(colors.primary.500)] [--dark-color:theme(colors.primary.600)] [--light-color:theme(colors.primary.50)] [--text-color:theme(colors.primary.50)]',
      success:
        '[--color:theme(colors.success.500)] [--dark-color:theme(colors.success.600)] [--light-color:theme(colors.success.50)] [--text-color:theme(colors.success.50)]',
      error:
        '[--color:theme(colors.error.500)] [--dark-color:theme(colors.error.600)] [--light-color:theme(colors.error.50)] [--text-color:theme(colors.error.50)]',
      warning:
        '[--color:theme(colors.warning.500)] [--dark-color:theme(colors.warning.600)] [--light-color:theme(colors.warning.50)] [--text-color:theme(colors.warning.50)]',
      info: '[--color:theme(colors.info.500)] [--dark-color:theme(colors.info.600)] [--light-color:theme(colors.info.50)] [--text-color:theme(colors.info.50)]',
      default:
        '[--color:theme(colors.gray.500)] [--dark-color:theme(colors.gray.600)] [--light-color:theme(colors.gray.50)] [--text-color:theme(colors.gray.50)]',
    },
    variant: {
      underlined: '',
      bordered: '',
      contained: '',
    },
  },
  defaultVariants: { size: 'md', radius: 'md', color: 'primary', variant: 'underlined' },
});

const list = cva(cn('flex items-center gap-2 border-b border-(--light-color)'), {
  variants: {
    variant: {
      underlined: 'border-b',
      bordered: 'p-1 border rounded-(--radius)',
      contained: 'p-1 bg-(--light-color) rounded-(--radius)',
    },
  },
  defaultVariants: { variant: 'underlined' },
});

const trigger = cva(
  cn(
    'relative inline-flex items-center justify-center whitespace-nowrap select-none',
    'px-3 py-2 font-medium text-(--color) outline-none',
    'focus-visible:ring-2 focus-visible:ring-(--light-color) focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
  ),
  {
    variants: {
      variant: {
        underlined:
          'data-[selected=true]:text-(--dark-color) after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-(--color) after:opacity-0 data-[selected=true]:after:opacity-100',
        bordered:
          'rounded-[inherit] data-[selected=true]:bg-(--light-color) data-[selected=true]:text-(--dark-color)',
        contained:
          'rounded-[inherit] data-[selected=true]:bg-(--color) data-[selected=true]:text-(--text-color)',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: { variant: 'underlined' },
  }
);

const panel = cva(cn('pt-3'), {
  variants: {
    variant: {
      underlined: '',
      bordered: '',
      contained: '',
    },
  },
  defaultVariants: { variant: 'underlined' },
});

export const TabsStyles = {
  root,
  list,
  trigger,
  panel,
};
