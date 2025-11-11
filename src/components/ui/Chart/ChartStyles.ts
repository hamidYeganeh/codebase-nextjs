import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const ChartContainerStyles = cva(
  cn(
    'relative w-full',
    // provide a sensible minimum height to prevent layout shift
    'min-h-[200px]'
  ),
  {
    variants: {
      radius: {
        none: 'rounded-none',
        xs: 'rounded-xs',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
      },
    },
    defaultVariants: {
      radius: 'md',
    },
  }
);

export const ChartStyles = {
  container: ChartContainerStyles,
};
