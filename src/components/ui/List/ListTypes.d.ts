// types
import { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, PropsWithChildren } from "react";
import { ListStyles } from "./ListStyles";

export interface ListProps
  extends ComponentPropsWithRef<"ul">,
    VariantProps<(typeof ListStyles)["item"]> {}
export interface ListItemProps
  extends Omit<ComponentPropsWithRef<"li">, "color">,
    VariantProps<(typeof ListStyles)["item"]> {
  disabledRipple?: boolean;
}
