"use client";

// libs
import { DropdownMenuItem as BaseDropdownItem } from "@radix-ui/react-dropdown-menu";
import { motion } from "motion/react";
import { useDataState } from "@/hooks/useDataState";
import { useDropdownMenu } from "./DropdownContext";
// types
import type { FC } from "react";
import type { DropdownItemProps } from "./DropdownTypes";
import { HighlightItem } from "@/components/shared/Highlight";
import { cn } from "@/utils/cn";
import { DropdownStyles } from "./DropdownStyles";

const DropdownItem: FC<DropdownItemProps> = (props) => {
  const {
    children,
    disabled,
    onSelect,
    textValue,
    className,
    inset,
    size,
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
      activeClassName="bg-pink-500"
      disabled={disabled}
    >
      <BaseDropdownItem
        ref={highlightedRef}
        disabled={disabled}
        onSelect={onSelect}
        textValue={textValue}
        asChild
        data-inset={inset}
        className={cn(DropdownStyles.item({ size }), className)}
        {...otherProps}
      >
        <motion.div data-slot="dropdown-menu-item" data-disabled={disabled}>
          {children}
        </motion.div>
      </BaseDropdownItem>
    </HighlightItem>
  );
};
export default DropdownItem;
