import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';

const ButtonBaseStyles = cva(
  cn(
    // base
    'outline-none border-0 inline-flex flex-row items-center min-w-max justify-center gap-1.5 relative overflow-hidden select-none cursor-pointer box-border subpixel-antialiased whitespace-nowrap',
    // interaction states
    'focus-visible:ring-2 focus-visible:ring-(--light-color) focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
    'disabled:opacity-60 disabled:cursor-not-allowed',
    // typography
    'font-semibold'
  ),
  {
    variants: {
      variant: {
        contained: 'bg-(--color) text-(--text-color) hover:bg-(--dark-color)',
        solid: 'bg-(--color) text-(--text-color) hover:bg-(--dark-color)',
        outlined:
          'ring hover:ring-2 ring-(--color) bg-transparent hover:bg-(--light-color) text-(--color)',
        bordered:
          'ring hover:ring-2 ring-(--color) bg-transparent hover:bg-(--light-color) text-(--color)',
        light: 'bg-transparent text-(--color) hover:bg-(--light-color)',
        flat: 'text-(--color) bg-(--light-color)',
        ghost:
          'bg-transparent border-2 border-(--color) text-(--color) hover:bg-(--color) hover:text-(--text-color)',
        faded: 'ring hover:ring-2 ring-gray-100 text-(--color) bg-gray-200 hover:bg-gray-300',
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
};
