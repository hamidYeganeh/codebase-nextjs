"use client";

// libs
import { useState } from "react";
import { DropdownMenuSub as BaseDropdownMenuSub } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuSubProvider } from "./DropdownContext";
// types
import type { FC } from "react";
import type { DropdownSubProps } from "./DropdownTypes";

const DropdownSub: FC<DropdownSubProps> = (props) => {
  const { children, ...otherProps } = props;

  const [isOpen, setIsOpen] = useState(
    (props?.open || props?.defaultOpen) ?? false
  );

  return (
    <DropdownMenuSubProvider value={{ isOpen, setIsOpen }}>
      <BaseDropdownMenuSub
        data-slot="dropdown-menu-sub"
        onOpenChange={setIsOpen}
        {...otherProps}
      >
        {children}
      </BaseDropdownMenuSub>
    </DropdownMenuSubProvider>
  );
};

export default DropdownSub;
