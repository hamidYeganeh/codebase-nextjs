import { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { TooltipStyles } from "./TooltipStyles";

interface ITooltipVariants
  extends VariantProps<(typeof TooltipStyles)["content"]> {}

export interface TooltipProps extends ITooltipVariants {
  title: ReactNode;
  children: ReactNode;
}