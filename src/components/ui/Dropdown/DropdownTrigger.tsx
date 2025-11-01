"use client";

// libs
import { DropdownMenuTrigger as BaseDropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
// types
import type { FC } from "react";
import type { DropdownTriggerProps } from "./DropdownTypes";

const DropdownTrigger: FC<DropdownTriggerProps> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <BaseDropdownMenuTrigger data-slot="dropdown-menu-trigger" {...otherProps}>
      {children}
    </BaseDropdownMenuTrigger>
  );
};
export default DropdownTrigger;
