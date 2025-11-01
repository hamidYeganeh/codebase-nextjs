// libs
import { useState } from "react";
import { DropdownMenu as BaseDropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuProvider } from "./DropdownContext";
// types
import type { FC } from "react";
import type { DropdownProps } from "./DropdownTypes";

const Dropdown: FC<DropdownProps> = (props) => {
  const { children, ...otherProps } = props;

  const [isOpen, setIsOpen] = useState(
    (props?.open || props?.defaultOpen) ?? false
  );
  const [highlightedValue, setHighlightedValue] = useState<string | null>(null);

  return (
    <DropdownMenuProvider
      value={{ isOpen, setIsOpen, highlightedValue, setHighlightedValue }}
    >
      <BaseDropdownMenu
        data-slot="dropdown-menu"
        onOpenChange={setIsOpen}
        {...otherProps}
      >
        {children}
      </BaseDropdownMenu>
    </DropdownMenuProvider>
  );
};
export default Dropdown;
