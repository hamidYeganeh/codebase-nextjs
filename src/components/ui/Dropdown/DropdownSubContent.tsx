"use client";

// libs
import {
  DropdownMenuPortal as BaseDropdownMenuPortal,
  DropdownMenuSubContent as BaseDropdownMenuSubContent,
} from "@radix-ui/react-dropdown-menu";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/utils/cn";
import { Highlight } from "@/components/shared/Highlight";
import { useDropdownMenu, useDropdownMenuSub } from "./DropdownContext";
// types
import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  type FC,
} from "react";
import type {
  DropdownSubContentProps,
  DropdownItemProps,
} from "./DropdownTypes";
import { DropdownStyles } from "./DropdownStyles";
import { VariantProps } from "class-variance-authority";

const DropdownSubContent: FC<DropdownSubContentProps> = (props) => {
  const {
    portalProps,
    children,
    loop,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    sideOffset = 4,
    className,
    alignOffset,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    arrowPadding,
    sticky,
    hideWhenDetached,
    transition = { duration: 0.2 },
    style,
    size,
    variant,
    color,
    highlightProps,
    ...otherProps
  } = props;

  const { isOpen } = useDropdownMenuSub();
  const { highlightedValue } = useDropdownMenu();

  const childrenWithProps = Children.map(children, (child) => {
    const childElement = child as ReactElement<DropdownItemProps>;
    if (isValidElement(child)) {
      return cloneElement(child, {
        size: childElement?.props.size ?? size,
        variant: childElement?.props?.variant ?? variant,
        color: childElement?.props?.color ?? color,
      } as Partial<VariantProps<typeof DropdownStyles.item>>);
    }
    return child;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <BaseDropdownMenuPortal forceMount {...portalProps}>
          <BaseDropdownMenuSubContent
            asChild
            forceMount
            loop={loop}
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={onPointerDownOutside}
            onFocusOutside={onFocusOutside}
            onInteractOutside={onInteractOutside}
            sideOffset={sideOffset}
            avoidCollisions={avoidCollisions}
            collisionBoundary={collisionBoundary}
            collisionPadding={collisionPadding}
            arrowPadding={arrowPadding}
            sticky={sticky}
            hideWhenDetached={hideWhenDetached}
            className={cn(DropdownStyles.content(), className)}
            {...otherProps}
          >
            <motion.div
              key="dropdown-menu-sub-content"
              data-slot="dropdown-menu-sub-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={transition}
              style={{ willChange: "opacity, transform", ...style }}
            >
              <Highlight
                data-slot="dropdown-menu-highlight"
                click={false}
                controlledItems
                hover
                transition={
                  highlightProps?.transition || {
                    type: "spring",
                    stiffness: 350,
                    damping: 35,
                  }
                }
                value={highlightedValue}
                className={cn(
                  DropdownStyles.highlight(),
                  highlightProps?.className
                )}
                {...highlightProps}
              >
                {childrenWithProps}
              </Highlight>
            </motion.div>
          </BaseDropdownMenuSubContent>
        </BaseDropdownMenuPortal>
      )}
    </AnimatePresence>
  );
};

export default DropdownSubContent;