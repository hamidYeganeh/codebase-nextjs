"use client";

// libs
import { DropdownMenuRadioGroup as BaseDropdownMenuRadioGroup } from "@radix-ui/react-dropdown-menu";
// types
import type { FC } from "react";
import type { DropdownRadioGroupProps } from "./DropdownTypes";

const DropdownRadioGroup: FC<DropdownRadioGroupProps> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <BaseDropdownMenuRadioGroup
      data-slot="dropdown-menu-radio-group"
      {...otherProps}
    >
      {children}
    </BaseDropdownMenuRadioGroup>
  );
};

export default DropdownRadioGroup;