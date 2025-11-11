/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
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
} from '@radix-ui/react-dropdown-menu';
import { VariantProps } from 'class-variance-authority';
import type { HTMLMotionProps } from 'motion/react';
import { DropdownStyles } from './DropdownStyles';
import type { HighlightProps, HighlightItemProps } from '@/components/shared/Highlight';

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
export type DropdownProps = BaseDropdownMenuProps;
export type DropdownTriggerProps = BaseDropdownMenuTriggerProps;
export interface DropdownContentProps
  extends BaseDropdownMenuContentProps,
    HTMLMotionProps<'div'>,
    VariantProps<typeof DropdownStyles.item> {
  portalProps?: Omit<BaseDropdownMenuPortalProps, 'forceMount'>;
  highlightProps?: Omit<HighlightProps, 'controlledItems' | 'enabled' | 'hover'>;
  // Explicitly include variant props to satisfy consumers that destructure these
  size?: VariantProps<typeof DropdownStyles.item>['size'];
  variant?: VariantProps<typeof DropdownStyles.item>['variant'];
  color?: VariantProps<typeof DropdownStyles.item>['color'];
}
export interface DropdownItemProps
  extends Omit<BaseDropdownMenuItemProps, 'color'>,
    VariantProps<typeof DropdownStyles.item> {
  highlightItemProps?: HighlightItemProps;
  inset?: boolean;
  // Explicit variant props (optional) for clearer type availability
  size?: VariantProps<typeof DropdownStyles.item>['size'];
  variant?: VariantProps<typeof DropdownStyles.item>['variant'];
  color?: VariantProps<typeof DropdownStyles.item>['color'];
}
export interface DropdownLabelProps
  extends Omit<BaseDropdownMenuLabelProps, 'color'>,
    VariantProps<typeof DropdownStyles.label> {
  inset?: boolean;
}
export type DropdownGroupProps = BaseDropdownMenuGroupProps;
export type DropdownSeparatorProps = BaseDropdownMenuSeparatorProps;
export type DropdownShortcutProps = React.ComponentProps<'span'>;
export interface DropdownCheckboxItemProps
  extends Omit<BaseDropdownMenuCheckboxItemProps, 'color'>,
    VariantProps<typeof DropdownStyles.item> {
  highlightItemProps?: HighlightItemProps;
  inset?: boolean;
  size?: VariantProps<typeof DropdownStyles.item>['size'];
  variant?: VariantProps<typeof DropdownStyles.item>['variant'];
  color?: VariantProps<typeof DropdownStyles.item>['color'];
}
export interface DropdownRadioItemProps
  extends Omit<BaseDropdownMenuRadioItemProps, 'color'>,
    VariantProps<typeof DropdownStyles.item> {
  highlightItemProps?: HighlightItemProps;
  inset?: boolean;
  size?: VariantProps<typeof DropdownStyles.item>['size'];
  variant?: VariantProps<typeof DropdownStyles.item>['variant'];
  color?: VariantProps<typeof DropdownStyles.item>['color'];
}
export type DropdownRadioGroupProps = BaseDropdownMenuRadioGroupProps;
export type DropdownItemIndicatorProps = BaseDropdownMenuItemIndicatorProps &
  HTMLMotionProps<'div'>;
export type DropdownSubProps = BaseDropdownMenuSubProps;
export interface DropdownSubTriggerProps
  extends Omit<BaseDropdownMenuSubTriggerProps, 'asChild' | 'color'>,
    VariantProps<typeof DropdownStyles.item>,
    HTMLMotionProps<'div'> {
  highlightItemProps?: HighlightItemProps;
  inset?: boolean;
  size?: VariantProps<typeof DropdownStyles.item>['size'];
  variant?: VariantProps<typeof DropdownStyles.item>['variant'];
  color?: VariantProps<typeof DropdownStyles.item>['color'];
}
export interface DropdownSubContentProps
  extends Omit<BaseDropdownMenuSubContentProps, 'forceMount' | 'asChild'>,
    HTMLMotionProps<'div'>,
    VariantProps<typeof DropdownStyles.item> {
  portalProps?: Omit<BaseDropdownMenuPortalProps, 'forceMount'>;
  highlightProps?: Omit<HighlightProps, 'controlledItems' | 'enabled' | 'hover'>;
  size?: VariantProps<typeof DropdownStyles.item>['size'];
  variant?: VariantProps<typeof DropdownStyles.item>['variant'];
  color?: VariantProps<typeof DropdownStyles.item>['color'];
}
