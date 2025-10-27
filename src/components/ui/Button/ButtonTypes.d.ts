import { ButtonStyles } from "./ButtonStyles";
import { VariantProps } from "class-variance-authority";
import { ComponentPropsWithRef } from "react";

interface IHTMLButtonProps
  extends Omit<ComponentPropsWithRef<"button">, "color"> {}
interface IButtonStylesVariants
  extends VariantProps<(typeof ButtonStyles)["base"]> {}
export interface ButtonProps extends IHTMLButtonProps, IButtonStylesVariants {
  disabledRipple?: boolean;
  fullWidth?: boolean;
}
