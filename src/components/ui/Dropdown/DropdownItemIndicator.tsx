"use client";

// libs
import { DropdownMenuItemIndicator as BaseDropdownMenuItemIndicator } from "@radix-ui/react-dropdown-menu";
import { motion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
// types
import type { FC } from "react";
import type { DropdownItemIndicatorProps } from "./DropdownTypes";

const DropdownItemIndicator: FC<DropdownItemIndicatorProps> = (props) => {
  const { className, style, children, ...rest } = props;
  const motionProps = rest as Omit<HTMLMotionProps<"div">, "ref">;

  return (
    <BaseDropdownMenuItemIndicator
      data-slot="dropdown-menu-item-indicator"
      asChild
    >
      <motion.div className={className} style={style} {...motionProps}>
        {children}
      </motion.div>
    </BaseDropdownMenuItemIndicator>
  );
};

export default DropdownItemIndicator;