"use client";

import { FC, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { TooltipProps } from "./TooltipTypes.d";
import { TooltipStyles } from "./TooltipStyles";

const Tooltip: FC<TooltipProps> = (props) => {
  const { title, children, color, placement } = props;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const contentClasses = TooltipStyles.content({ color, placement });

  return (
    <span
      ref={ref}
      className={cn("relative inline-block")}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          className={cn(
            contentClasses,
            placement === "top" && "absolute -top-8 left-1/2 -translate-x-1/2",
            placement === "bottom" &&
              "absolute -bottom-8 left-1/2 -translate-x-1/2",
            placement === "left" && "absolute left-0 -translate-x-full top-1/2 -translate-y-1/2",
            placement === "right" && "absolute right-0 translate-x-full top-1/2 -translate-y-1/2",
            open ? "opacity-100" : "opacity-0"
          )}
        >
          {title}
        </span>
      )}
    </span>
  );
};

export default Tooltip;