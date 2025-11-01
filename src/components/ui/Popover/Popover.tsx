"use client";

// libs
import { useState } from "react";
import { PopoverProvider } from "./PopoverContext";
import { Popover as BasePopover } from "@radix-ui/react-popover";
// types
import type { FC } from "react";
import type { PopoverProps } from "./PopoverTypes";

const Popover: FC<PopoverProps> = (props) => {
  const { children, ...otherProps } = props;

  const [isOpen, setIsOpen] = useState(
    (props?.open || props?.defaultOpen) ?? false
  );

  return (
    <PopoverProvider value={{ isOpen, setIsOpen }}>
      <BasePopover data-slot="popover" onOpenChange={setIsOpen} {...otherProps}>
        {children}
      </BasePopover>
    </PopoverProvider>
  );
};
export default Popover;
