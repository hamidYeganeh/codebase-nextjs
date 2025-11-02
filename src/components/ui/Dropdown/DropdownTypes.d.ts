// types
import type {
  DropdownMenuProps as BaseDropdownMenuProps,
  DropdownMenuTriggerProps as BaseDropdownMenuTriggerProps,
  DropdownMenuContentProps as BaseDropdownMenuContentProps,
  DropdownMenuPortalProps as BaseDropdownMenuPortalProps,
  DropdownMenuItemProps as BaseDropdownMenuItemProps,
  DropdownMenuLabelProps as BaseDropdownMenuLabelProps,
  DropdownMenuGroupProps as BaseDropdownMenuGroupProps,
  DropdownMenuSeparatorProps as BaseDropdownMenuSeparatorProps,
  DropdownMenuCheckboxItemProps as BaseDropdownMenuCheckboxItemProps,
  DropdownMenuRadioItemProps as BaseDropdownMenuRadioItemProps,
  DropdownMenuRadioGroupProps as BaseDropdownMenuRadioGroupProps,
  DropdownMenuItemIndicatorProps as BaseDropdownMenuItemIndicatorProps,
  DropdownMenuSubProps as BaseDropdownMenuSubProps,
  DropdownMenuSubTriggerProps as BaseDropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps as BaseDropdownMenuSubContentProps,
} from "@radix-ui/react-dropdown-menu";
import { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "motion/react";
import { DropdownStyles } from "./DropdownStyles";
import type { HighlightProps, HighlightItemProps } from "@/components/shared/Highlight";

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
  extends Omit<BaseDropdownMenuItemProps, "color">,
    VariantProps<typeof DropdownStyles.item> {
  highlightItemProps?: HighlightItemProps;
  inset?: boolean;
}
export interface DropdownLabelProps
  extends Omit<BaseDropdownMenuLabelProps, "color">,
    VariantProps<typeof DropdownStyles.label> {
  inset?: boolean;
}
export interface DropdownGroupProps extends BaseDropdownMenuGroupProps {}
export interface DropdownSeparatorProps
  extends BaseDropdownMenuSeparatorProps {}
export interface DropdownShortcutProps
  extends React.ComponentProps<"span"> {}
export interface DropdownCheckboxItemProps
  extends Omit<BaseDropdownMenuCheckboxItemProps, "color">,
    VariantProps<typeof DropdownStyles.item> {
  highlightItemProps?: HighlightItemProps;
  inset?: boolean;
}
export interface DropdownRadioItemProps
  extends Omit<BaseDropdownMenuRadioItemProps, "color">,
    VariantProps<typeof DropdownStyles.item> {
  highlightItemProps?: HighlightItemProps;
  inset?: boolean;
}
export interface DropdownRadioGroupProps
  extends BaseDropdownMenuRadioGroupProps {}
export interface DropdownItemIndicatorProps
  extends BaseDropdownMenuItemIndicatorProps,
    HTMLMotionProps<"div"> {}
export interface DropdownSubProps extends BaseDropdownMenuSubProps {}
export interface DropdownSubTriggerProps
  extends Omit<BaseDropdownMenuSubTriggerProps, "asChild" | "color">,
    VariantProps<typeof DropdownStyles.item>,
    HTMLMotionProps<"div"> {
  highlightItemProps?: HighlightItemProps;
  inset?: boolean;
}
export interface DropdownSubContentProps
  extends Omit<BaseDropdownMenuSubContentProps, "forceMount" | "asChild">,
    HTMLMotionProps<"div">,
    VariantProps<typeof DropdownStyles.item> {
  portalProps?: Omit<BaseDropdownMenuPortalProps, "forceMount">;
  highlightProps?: Omit<HighlightProps, "controlledItems" | "enabled" | "hover">;
}
