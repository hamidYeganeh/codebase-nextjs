"use client";

// libs
import { DropdownMenuGroup as BaseDropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
// types
import type { FC } from "react";
import type { DropdownGroupProps } from "./DropdownTypes";

const DropdownGroup: FC<DropdownGroupProps> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <BaseDropdownMenuGroup data-slot="dropdown-menu-group" {...otherProps}>
      {children}
    </BaseDropdownMenuGroup>
  );
};

export default DropdownGroup;