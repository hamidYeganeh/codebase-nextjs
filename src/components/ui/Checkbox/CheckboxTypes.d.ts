import { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { CheckboxStyles } from "./CheckboxStyles";

interface IHTMLInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size" | "color"> {}

interface ICheckboxVariants
  extends VariantProps<(typeof CheckboxStyles)["box"]> {}

export interface CheckboxProps extends IHTMLInputProps, ICheckboxVariants {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: ReactNode;
  labelProps?: ComponentPropsWithoutRef<"label">;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}