"use client";

// libs
import { DropdownMenuSeparator as BaseDropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { cn } from "@/utils/cn";
// types
import type { FC } from "react";
import type { DropdownSeparatorProps } from "./DropdownTypes";

const DropdownSeparator: FC<DropdownSeparatorProps> = (props) => {
  const { className, ...otherProps } = props;
  return (
    <BaseDropdownMenuSeparator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-gray-200", className)}
      {...otherProps}
    />
  );
};

export default DropdownSeparator;