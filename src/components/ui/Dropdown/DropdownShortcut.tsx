"use client";

// types
import type { FC } from "react";
import type { DropdownShortcutProps } from "./DropdownTypes";

const DropdownShortcut: FC<DropdownShortcutProps> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <span data-slot="dropdown-menu-shortcut" {...otherProps}>
      {children}
    </span>
  );
};

export default DropdownShortcut;