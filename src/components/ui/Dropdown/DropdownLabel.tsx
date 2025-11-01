// libs
import { DropdownMenuLabel as BaseDropdownLabel } from "@radix-ui/react-dropdown-menu";
import { cn } from "@/utils/cn";
// types
import type { FC } from "react";
import type { DropdownLabelProps } from "./DropdownTypes";
// styles
import { DropdownStyles } from "./DropdownStyles";

const DropdownLabel: FC<DropdownLabelProps> = (props) => {
  const { children, inset = false, className, ...otherProps } = props;
  return (
    <BaseDropdownLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(DropdownStyles.label(), className)}
      {...otherProps}
    >
      {children}
    </BaseDropdownLabel>
  );
};

export default DropdownLabel;
