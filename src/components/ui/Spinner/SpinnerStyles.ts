import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

export const SpinnerStyles = {
  base: cva('inline-block animate-spin', {
    variants: {
      size: {
        sm: 'h-4 w-4 border-2',
        md: 'h-6 w-6 border-2',
        lg: 'h-8 w-8 border-4',
      },
      color: {
        default: 'border-gray-400 border-t-transparent',
        primary: 'border-primary-500 border-t-transparent',
        success: 'border-success-500 border-t-transparent',
        warning: 'border-warning-500 border-t-transparent',
        error: 'border-error-500 border-t-transparent',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'default',
    },
  }),
};

export function spinnerClassName({
  className,
  ...props
}: { className?: string } & Parameters<typeof SpinnerStyles.base>[0]) {
  return cn(SpinnerStyles.base(props), className);
}
