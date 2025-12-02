import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';

const ButtonBaseStyles = cva(
  cn(
    'relative inline-flex min-w-max items-center justify-center gap-1.5 overflow-hidden rounded-medium font-semibold outline-none whitespace-nowrap select-none subpixel-antialiased box-border',
    'border border-transparent focus-visible:ring-2 focus-visible:ring-(--light-color) focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
    'disabled:opacity-60 disabled:cursor-not-allowed'
  ),
  {
    variants: {
      variant: {
        contained: 'bg-(--color) text-(--text-color) shadow-sm hover:bg-(--dark-color)',
        solid: 'bg-(--color) text-(--text-color) shadow-sm hover:bg-(--dark-color)',
        outlined:
          'ring ring-(--color) bg-transparent text-(--color) hover:ring-2 hover:bg-(--light-color)',
        bordered:
          'ring ring-(--color) bg-transparent text-(--color) hover:ring-2 hover:bg-(--light-color)',
        light: 'bg-transparent text-(--color) hover:bg-(--light-color)',
        flat: 'text-(--color) bg-(--light-color)',
        ghost:
          'bg-transparent border-2 border-(--color) text-(--color) hover:bg-(--color) hover:text-(--text-color)',
        faded: 'ring ring-gray-100 text-(--color) bg-gray-100 hover:bg-gray-200',
        shadow:
          'bg-(--color) text-(--text-color) shadow-lg shadow-(--light-color) hover:shadow-xl hover:bg-(--dark-color)',
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
      size: {
        xs: 'h-8 px-2 text-xs',
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-5 text-base',
        xl: 'h-12 px-6 text-lg',
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
      disabledAnimation: {
        true: '!transition-none',
        false: 'transition-transform-colors-opacity motion-reduce:transition-none duration-200',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-fit',
      },
      loading: {
        true: 'grayscale-100 pointer-events-none cursor-not-allowed',
      },
      isIconOnly: {
        true: 'px-0 [&_.btn-icon]:m-0',
        false: '',
      },
    },
    defaultVariants: {
      color: 'primary',
      radius: 'md',
      size: 'md',
      variant: 'contained',
      disabledAnimation: false,
    },
  }
);

export const ButtonStyles = {
  base: ButtonBaseStyles,
  content: cva('inline-flex items-center gap-1.5', {
    variants: {
      isIconOnly: {
        true: 'w-full h-full justify-center',
        false: '',
      },
    },
  }),
  icon: cva('btn-icon inline-flex items-center justify-center', {
    variants: {
      size: {
        xs: 'w-4 h-4 text-[0.8rem]',
        sm: 'w-4.5 h-4.5 text-[0.9rem]',
        md: 'w-5 h-5 text-[1rem]',
        lg: 'w-5.5 h-5.5 text-[1.1rem]',
        xl: 'w-6 h-6 text-[1.2rem]',
      },
    },
    defaultVariants: { size: 'md' },
  }),
  spinner: cva(
    'inline-flex animate-spin rounded-full border-2 border-(--text-color) border-t-transparent',
    {
      variants: {
        size: {
          xs: 'w-3.5 h-3.5',
          sm: 'w-3.5 h-3.5',
          md: 'w-4 h-4',
          lg: 'w-4.5 h-4.5',
          xl: 'w-5 h-5',
        },
      },
      defaultVariants: { size: 'md' },
    }
  ),
};
