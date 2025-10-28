// libs
import { PopoverTrigger as BasePopoverTrigger } from "@radix-ui/react-popover";
// types
import type { FC } from "react";
import type { PopoverTriggerProps } from "./PopoverTypes";
import { cn } from "@/utils/cn";

const PopoverTrigger: FC<PopoverTriggerProps> = (props) => {
  const { className, children, ...otherProps } = props;
  return (
    <>
      <BasePopoverTrigger
        data-slot="popover-trigger"
        className={cn(className)}
        {...otherProps}
      >
        {children}
      </BasePopoverTrigger>
    </>
  );
};
export default PopoverTrigger;
