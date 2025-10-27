import { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { SwitchStyles } from "./SwitchStyles";

interface IHTMLInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size" | "color"> {}

interface ISwitchVariants
  extends VariantProps<(typeof SwitchStyles)["track"]> {}

export interface SwitchProps extends IHTMLInputProps, ISwitchVariants {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  labelProps?: ComponentPropsWithoutRef<"label">;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}