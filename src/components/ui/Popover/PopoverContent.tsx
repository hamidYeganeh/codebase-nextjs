"use client";

// libs
import { AnimatePresence, motion } from "motion/react";
import {
  PopoverContent as BasePopoverContent,
  PopoverPortal as BasePopoverPortal,
} from "@radix-ui/react-popover";
import { usePopoverContext } from "./PopoverContext";
import { cn } from "@/utils/cn";
// types
import type { FC } from "react";
import type { PopoverContentProps } from "./PopoverTypes";
// styles
import { PopoverStyles } from "./PopoverStyles";

const PopoverContent: FC<PopoverContentProps> = (props) => {
  const {
    children,
    side = "bottom",
    align = "center",
    sideOffset = 8,
    className,
    shadow,
    radius,
    sticky = "partial",
    transition = { type: "spring", stiffness: 300, damping: 25 },
    ...otherProps
  } = props;

  const { isOpen } = usePopoverContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <BasePopoverPortal forceMount data-slot="popover-portal">
          <BasePopoverContent
            asChild
            align={align}
            side={side}
            sideOffset={sideOffset}
            sticky={sticky}
            className={cn(PopoverStyles.content({ shadow, radius }), className)}
            {...otherProps}
          >
            <motion.div
              key="popover-content"
              data-slot="popover-content"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                transformOrigin: PopoverTransformOrigin[side],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={transition}
            >
              {children}
            </motion.div>
          </BasePopoverContent>
        </BasePopoverPortal>
      )}
    </AnimatePresence>
  );
};

export default PopoverContent;

const PopoverTransformOrigin = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};
