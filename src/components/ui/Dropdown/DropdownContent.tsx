"use client";

// libs
import {
  DropdownMenuPortal as BaseDropdownMenuPortal,
  DropdownMenuContent as BaseDropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/utils/cn";
import { Highlight } from "@/components/shared/Highlight";
import { useDropdownMenu } from "./DropdownContext";
// types
import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  type FC,
} from "react";
import type { DropdownContentProps, DropdownItemProps } from "./DropdownTypes";
import { DropdownStyles } from "./DropdownStyles";
import { VariantProps } from "class-variance-authority";

const DropdownContent: FC<DropdownContentProps> = (props) => {
  const {
    portalProps,
    children,
    loop,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    side,
    sideOffset = 4,
    className,
    align,
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
    highlightProps,
    ...otherProps
  } = props;

  const { isOpen, highlightedValue } = useDropdownMenu();

  const childrenWithProps = Children.map(children, (child) => {
    const childElement = child as ReactElement<DropdownItemProps>;
    if (isValidElement(child)) {
      return cloneElement(child, {
        size: childElement?.props.size ?? size,
        // variant: childElement?.props?.variant ?? variant,
        // radius: childElement?.props?.radius ?? radius,
        // disabledAnimation:
        //   childElement?.props?.disabledAnimation ?? disabledAnimation,
      } as Partial<VariantProps<typeof DropdownStyles.item>>);
    }
    return child;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <BaseDropdownMenuPortal forceMount {...portalProps}>
          <BaseDropdownMenuContent
            asChild
            loop={loop}
            onCloseAutoFocus={onCloseAutoFocus}
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={onPointerDownOutside}
            onFocusOutside={onFocusOutside}
            onInteractOutside={onInteractOutside}
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
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
              key="dropdown-menu-content"
              data-slot="dropdown-menu-content"
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
          </BaseDropdownMenuContent>
        </BaseDropdownMenuPortal>
      )}
    </AnimatePresence>
  );
};
export default DropdownContent;
