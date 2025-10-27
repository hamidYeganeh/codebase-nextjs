import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

export const CheckboxRootStyles = cva(
  cn(
    "inline-flex items-center gap-2 select-none",
    "data-[disabled=true]:opacity-60"
  ),
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

export const CheckboxBoxStyles = cva(
  cn(
    "relative inline-flex items-center justify-center",
    "rounded-md border",
    "transition-colors duration-200 ease-out",
    "bg-white",
    "data-[checked=true]:bg-(--color) data-[checked=true]:border-(--color)",
    "data-[indeterminate=true]:bg-(--color) data-[indeterminate=true]:border-(--color)",
    "data-[error=true]:border-error-500",
    "data-[disabled=true]:cursor-not-allowed"
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

export const CheckboxIconStyles = cva(
  cn(
    "text-white",
    "transition-opacity duration-200 ease-out",
    "opacity-0 data-[checked=true]:opacity-100 data-[indeterminate=true]:opacity-100"
  ),
  {
    variants: {
      size: {
        small: "text-[10px]",
        medium: "text-xs",
        large: "text-sm",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export const CheckboxLabelStyles = cva(
  cn("text-gray-700"),
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

export const CheckboxStyles = {
  root: CheckboxRootStyles,
  box: CheckboxBoxStyles,
  icon: CheckboxIconStyles,
  label: CheckboxLabelStyles,
};