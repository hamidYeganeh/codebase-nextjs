import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

export const AlertStyles = {
  base: cva(
    cn(
      'w-full relative flex items-start gap-2 p-3',
      'border rounded-md',
      'transition-transform-colors-opacity duration-200'
    ),
    {
      variants: {
        variant: {
          contained: 'bg-(--color) text-(--text-color) border-transparent',
          outlined: 'bg-transparent text-(--color) border-(--color)',
          flat: 'bg-(--light-color) text-(--color) border-transparent',
          ghost: 'bg-transparent text-(--color) border-2 border-(--color)',
          faded: 'bg-gray-200 text-(--color) border-gray-300',
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
        radius: {
          none: 'rounded-none',
          xs: 'rounded-xs',
          sm: 'rounded-sm',
          md: 'rounded-md',
          lg: 'rounded-lg',
          xl: 'rounded-xl',
        },
      },
      defaultVariants: { variant: 'flat', color: 'info', radius: 'md' },
    }
  ),
  title: cva('font-semibold'),
  description: cva('text-sm opacity-90'),
  icon: cva('inline-flex items-center justify-center w-5 h-5'),
  close: cva(
    cn(
      'absolute top-2 right-2 inline-flex items-center justify-center w-5 h-5 rounded-sm',
      'hover:bg-(--light-color) focus-visible:ring-2 focus-visible:ring-(--light-color)'
    )
  ),
};
