import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

export const RadioRootStyles = cva(
  cn("inline-flex items-center gap-2 select-none"),
  {
    variants: {
      size: {
        small: "text-sm",
        medium: "text-base",
        large: "text-lg",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export const RadioCircleStyles = cva(
  cn(
    "relative inline-flex items-center justify-center",
    "rounded-full border",
    "transition-colors duration-200 ease-out",
    "bg-white",
    "data-[checked=true]:border-(--color)"
  ),
  {
    variants: {
      color: {
        primary: "[--color:theme(colors.primary.500)]",
        success: "[--color:theme(colors.success.500)]",
        error: "[--color:theme(colors.error.500)]",
        warning: "[--color:theme(colors.warning.500)]",
        info: "[--color:theme(colors.info.500)]",
        default: "[--color:theme(colors.gray.500)]",
      },
      size: {
        small: "w-4 h-4",
        medium: "w-5 h-5",
        large: "w-6 h-6",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "medium",
    },
  }
);

export const RadioDotStyles = cva(
  cn(
    "rounded-full",
    "bg-(--color)",
    "transition-opacity duration-200 ease-out",
    "opacity-0 data-[checked=true]:opacity-100"
  ),
  {
    variants: {
      size: {
        small: "w-2 h-2",
        medium: "w-2.5 h-2.5",
        large: "w-3 h-3",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export const RadioLabelStyles = cva(cn("text-gray-700"), {
  variants: {
    size: {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export const RadioStyles = {
  root: RadioRootStyles,
  circle: RadioCircleStyles,
  dot: RadioDotStyles,
  label: RadioLabelStyles,
};