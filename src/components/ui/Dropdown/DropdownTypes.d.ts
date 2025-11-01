// types
import type {
  DropdownMenuProps as BaseDropdownMenuProps,
  DropdownMenuTriggerProps as BaseDropdownMenuTriggerProps,
  DropdownMenuContentProps as BaseDropdownMenuContentProps,
  DropdownMenuPortalProps as BaseDropdownMenuPortalProps,
  DropdownMenuItemProps as BaseDropdownMenuItemProps,
  DropdownMenuLabelProps as BaseDropdownMenuLabelProps,
  DropdownMenuGroupProps as BaseDropdownMenuGroupProps,
} from "@radix-ui/react-dropdown-menu";
import { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "motion/react";
import { DropdownStyles } from "./DropdownStyles";

export interface DropdownMenuContextType {
  isOpen: boolean;
  setIsOpen: (o: boolean) => void;
  highlightedValue: string | null;
  setHighlightedValue: (value: string | null) => void;
}
export interface DropdownMenuSubContextType {
  isOpen: boolean;
  setIsOpen: (o: boolean) => void;
}
export interface DropdownProps extends BaseDropdownMenuProps {}
export interface DropdownTriggerProps extends BaseDropdownMenuTriggerProps {}
export interface DropdownContentProps
  extends BaseDropdownMenuContentProps,
    HTMLMotionProps<"div">,
    VariantProps<typeof DropdownStyles.item> {
  portalProps?: Omit<BaseDropdownMenuPortalProps, "forceMount">;
  highlightProps?: Omit<
    HighlightProps,
    "controlledItems" | "enabled" | "hover"
  >;
}
export interface DropdownItemProps
  extends BaseDropdownMenuItemProps,
    VariantProps<typeof DropdownStyles.item> {
  highlightItemProps?: HighlightItemProps;
  inset?: boolean;
}
export interface DropdownLabelProps extends BaseDropdownMenuLabelProps {
  inset?: boolean;
}
export interface DropdownGroupProps extends BaseDropdownMenuGroupProps {}
