// styles
import { ButtonStyles } from "./ButtonStyles";
// types
import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ElementType } from "react";

interface IHTMLButtonProps
  extends Omit<ComponentPropsWithRef<"button">, "color"> {}
interface IButtonStylesVariants
  extends VariantProps<(typeof ButtonStyles)["base"]> {}
export interface ButtonProps extends IHTMLButtonProps, IButtonStylesVariants {
  disabledRipple?: boolean;
  fullWidth?: boolean;
  as?: ElementType;
  href?: string;
  loading?: boolean;
}
