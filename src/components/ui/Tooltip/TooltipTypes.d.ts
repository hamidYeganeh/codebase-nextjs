import { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { TooltipStyles } from './TooltipStyles';

export interface TooltipProps extends VariantProps<(typeof TooltipStyles)['content']> {
  title: ReactNode;
  children: ReactNode;
}
