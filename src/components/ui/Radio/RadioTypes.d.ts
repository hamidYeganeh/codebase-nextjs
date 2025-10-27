import { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { RadioStyles } from "./RadioStyles";

interface IHTMLInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size" | "color"> {}

interface IRadioVariants
  extends VariantProps<(typeof RadioStyles)["circle"]> {}

export interface RadioProps extends IHTMLInputProps, IRadioVariants {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  labelProps?: ComponentPropsWithoutRef<"label">;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}