import { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ChipStyles } from "./ChipStyles";

interface IChipVariants extends VariantProps<(typeof ChipStyles)["base"]> {}

export interface ChipProps extends IChipVariants {
  label: ReactNode;
  onClick?: () => void;
  onDelete?: () => void;
  deleteIcon?: ReactNode;
  className?: string;
}