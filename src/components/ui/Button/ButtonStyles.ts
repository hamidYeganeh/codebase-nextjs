import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

const ButtonBaseStyles = cva(
  cn(
    // base
    "outline-none inline-flex flex-row items-center min-w-max justify-center gap-1.5 relative overflow-hidden select-none cursor-pointer box-border select-none subpixel-antialiased whitespace-nowrap",
    // typography
    "font-semibold capitalize"
  ),
  {
    variants: {
      variant: {
        contained: "bg-(--color) text-(--text-color) hover:bg-(--dark-color)",
        outlined:
          "ring hover:ring-2 ring-(--color) bg-transparent hover:bg-(--light-color) text-(--color)",
        light: "bg-transparent text-(--color) hover:bg-(--light-color)",
        flat: "text-(--color) bg-(--light-color)",
        ghost:
          "bg-transparent border-2 border-(--color) text-(--color) hover:bg-(--color) hover:text-(--text-color)",
        faded:
          "ring hover:ring-2 ring-gray-100 text-(--color) bg-gray-200 hover:bg-gray-300",
      },
      color: {
        primary:
          "[--color:theme(colors.primary.500)] [--dark-color:theme(colors.primary.600)] [--light-color:theme(colors.primary.50)] [--text-color:theme(colors.primary.50)]",
        success:
          "[--color:theme(colors.success.500)] [--dark-color:theme(colors.success.600)] [--light-color:theme(colors.success.50)] [--text-color:theme(colors.success.50)]",
        error:
          "[--color:theme(colors.error.500)] [--dark-color:theme(colors.error.600)] [--light-color:theme(colors.error.50)] [--text-color:theme(colors.error.50)]",
        warning:
          "[--color:theme(colors.warning.500)] [--dark-color:theme(colors.warning.600)] [--light-color:theme(colors.warning.50)] [--text-color:theme(colors.warning.50)]",
        info: "[--color:theme(colors.info.500)] [--dark-color:theme(colors.info.600)] [--light-color:theme(colors.info.50)] [--text-color:theme(colors.info.50)]",
        default:
          "[--color:theme(colors.gray.500)] [--dark-color:theme(colors.gray.600)] [--light-color:theme(colors.gray.50)] [--text-color:theme(colors.gray.50)]",
      },
      size: {
        xs: "h-8 px-2 text-xs",
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-11 px-5 text-lg",
        xl: "h-12 px-6 text-xl",
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
      disabledAnimation: {
        true: "!transition-none",
        false:
          "transition-transform-colors-opacity motion-reduce:transition-none duration-200",
      },
    },
    defaultVariants: {
      color: "primary",
      radius: "md",
      size: "md",
      variant: "contained",
      disabledAnimation: false,
    },
  }
);

export const ButtonStyles = {
  base: ButtonBaseStyles,
};
