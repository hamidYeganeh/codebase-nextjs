import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

export const TooltipContentStyles = cva(
  cn(
    "z-50 rounded-md px-2 py-1 text-xs",
    "bg-(--bg) text-(--text) shadow",
    "transition-opacity duration-150 ease-out"
  ),
  {
    variants: {
      color: {
        default:
          "[--bg:theme(colors.gray.900)] [--text:theme(colors.gray.50)]",
        primary:
          "[--bg:theme(colors.primary.700)] [--text:theme(colors.primary.50)]",
      },
      placement: {
        top: "",
        bottom: "",
        left: "",
        right: "",
      },
    },
    defaultVariants: {
      color: "default",
      placement: "top",
    },
  }
);

export const TooltipStyles = {
  content: TooltipContentStyles,
};