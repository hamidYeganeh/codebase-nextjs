"use client";

// libs
import { DropdownMenuCheckboxItem as BaseDropdownCheckboxItem } from "@radix-ui/react-dropdown-menu";
import { motion } from "motion/react";
import { useDataState } from "@/hooks/useDataState";
import { HighlightItem } from "@/components/shared/Highlight";
import { cn } from "@/utils/cn";
import { useDropdownMenu } from "./DropdownContext";
// types
import type { FC } from "react";
import type { DropdownCheckboxItemProps } from "./DropdownTypes";
// styles
import { DropdownStyles } from "./DropdownStyles";

const DropdownCheckboxItem: FC<DropdownCheckboxItemProps> = (props) => {
  const {
    children,
    checked,
    onCheckedChange,
    disabled,
    onSelect,
    textValue,
    className,
    inset,
    size,
    variant,
    color,
    highlightItemProps,
    ...otherProps
  } = props;

  const { setHighlightedValue } = useDropdownMenu();
  const [, highlightedRef] = useDataState<HTMLDivElement>(
    "highlighted",
    undefined,
    (value) => {
      if (value === true) {
        const el = highlightedRef.current;
        const v = el?.dataset.value || el?.id || null;
        if (v) setHighlightedValue(v);
      }
    }
  );

  return (
    <HighlightItem
      data-slot="dropdown-menu-highlight-item"
      activeClassName={cn(DropdownStyles.item({ variant, color }))}
      disabled={disabled}
      {...highlightItemProps}
    >
      <BaseDropdownCheckboxItem
        ref={highlightedRef}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        onSelect={onSelect}
        textValue={textValue}
        asChild
        data-inset={inset}
        className={cn(DropdownStyles.item({ size }), className)}
        {...otherProps}
      >
        <motion.div
          data-slot="dropdown-menu-checkbox-item"
          data-disabled={disabled}
        >
          {children}
        </motion.div>
      </BaseDropdownCheckboxItem>
    </HighlightItem>
  );
};

export default DropdownCheckboxItem;