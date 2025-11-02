"use client";

// libs
import { DropdownMenuSubTrigger as BaseDropdownMenuSubTrigger } from "@radix-ui/react-dropdown-menu";
import { motion } from "motion/react";
import { useDataState } from "@/hooks/useDataState";
import { HighlightItem } from "@/components/shared/Highlight";
import { cn } from "@/utils/cn";
import { useDropdownMenu } from "./DropdownContext";
// types
import type { FC } from "react";
import type { DropdownSubTriggerProps } from "./DropdownTypes";
// styles
import { DropdownStyles } from "./DropdownStyles";

const DropdownSubTrigger: FC<DropdownSubTriggerProps> = (props) => {
  const {
    children,
    disabled,
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
      <BaseDropdownMenuSubTrigger
        ref={highlightedRef}
        disabled={disabled}
        textValue={textValue}
        asChild
        data-inset={inset}
        className={cn(DropdownStyles.item({ size }), className)}
        {...otherProps}
      >
        <motion.div
          data-slot="dropdown-menu-sub-trigger"
          data-disabled={disabled}
        >
          {children}
        </motion.div>
      </BaseDropdownMenuSubTrigger>
    </HighlightItem>
  );
};

export default DropdownSubTrigger;