import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

const PopoverContentStyles = cva(
  cn(
    // base
    "outline-hidden outline-0 z-50 p-2 bg-white ring ring-gray-100"
  ),
  {
    variants: {
      shadow: {
        none: "shadow-none",
        "2xs": "shadow-2xs",
        xs: "shadow-xs",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
        "2xl": "shadow-2xl",
      },
      radius: {
        none: "rounded-none",
        xs: "rounded-xs",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      radius: "md",
      shadow: "2xl",
    },
  }
);

export const PopoverStyles = {
  content: PopoverContentStyles,
};
