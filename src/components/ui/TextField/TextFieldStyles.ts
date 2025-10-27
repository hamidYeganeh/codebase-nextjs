import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

// Container controls overall layout and core variants (variant, color, size)
export const TextFieldContainerStyles = cva(
  cn(
    "relative inline-flex w-max flex-col subpixel-antialiased",
    // spacing is controlled via margin variant
    "data-[fullwidth=true]:w-full"
  ),
  {
    variants: {
      variant: {
        outlined: "",
        filled: "",
        standard: "",
      },
      color: {
        primary:
          "[--color:theme(colors.primary.500)] [--dark-color:theme(colors.primary.600)] [--light-color:theme(colors.primary.50)]",
        success:
          "[--color:theme(colors.success.500)] [--dark-color:theme(colors.success.600)] [--light-color:theme(colors.success.50)]",
        error:
          "[--color:theme(colors.error.500)] [--dark-color:theme(colors.error.600)] [--light-color:theme(colors.error.50)]",
        warning:
          "[--color:theme(colors.warning.500)] [--dark-color:theme(colors.warning.600)] [--light-color:theme(colors.warning.50)]",
        info: "[--color:theme(colors.info.500)] [--dark-color:theme(colors.info.600)] [--light-color:theme(colors.info.50)]",
        default:
          "[--color:theme(colors.gray.500)] [--dark-color:theme(colors.gray.600)] [--light-color:theme(colors.gray.50)]",
      },
      size: {
        xs: "",
        sm: "",
        md: "",
        lg: "",
        xl: "",
      },
      margin: {
        none: "",
        dense: "gap-1",
        normal: "gap-2",
      },
    },
    defaultVariants: {
      variant: "outlined",
      color: "default",
      size: "md",
      margin: "normal",
    },
  }
);

// Input element styles per variant/size/state
export const TextFieldInputStyles = cva(
  cn(
    // base
    "peer w-full outline-none",
    "disabled:cursor-not-allowed disabled:opacity-60",
    // transitions
    "transition-colors motion-reduce:transition-none duration-200"
  ),
  {
    variants: {
      variant: {
        outlined: cn(
          "rounded-md border",
          "bg-white",
          // default border and hover/focus
          "border-gray-300 focus:border-(--dark-color)",
          // error
          "data-[error=true]:border-error-500 focus:data-[error=true]:border-error-600",
          // padding adjusts with adornments via data attributes
          "data-[start=true]:pl-10 data-[end=true]:pr-10"
        ),
        filled: cn(
          "rounded-md",
          "bg-gray-100 focus:bg-gray-50",
          "border border-transparent focus:border-(--dark-color)",
          "data-[error=true]:border-error-500",
          "data-[start=true]:pl-10 data-[end=true]:pr-10"
        ),
        standard: cn(
          "border-0 border-b",
          "bg-transparent",
          "border-b-gray-300 focus:border-b-(--dark-color)",
          "data-[error=true]:border-b-error-500",
          "data-[start=true]:pl-8 data-[end=true]:pr-8"
        ),
      },
      size: {
        small: "h-9 px-3 text-sm",
        medium: "h-10 px-3.5 text-base",
        large: "h-12 px-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "outlined",
      size: "medium",
    },
  }
);

// Label styles (floats/shrinks on focus or when has value)
export const TextFieldLabelStyles = cva(
  cn(
    "absolute select-none",
    // animate position, scale, and color smoothly
    "transition-transform transition-colors motion-reduce:transition-none duration-200 ease-out",
    "text-gray-500",
    // interactions
    "pointer-events-none",
    // transform origin so shrink animates from the start of input
    "origin-left transform"
  ),
  {
    variants: {
      variant: {
        outlined: cn(
          // default position
          "left-3 top-1/2 -translate-y-1/2",
          // shrink
          // move to top-start and shrink
          "data-[focused=true]:top-0 data-[focused=true]:left-3 data-[focused=true]:-translate-y-1/2 data-[focused=true]:scale-90 data-[focused=true]:text-xs",
          "data-[has-value=true]:top-0 data-[has-value=true]:left-3 data-[has-value=true]:-translate-y-1/2 data-[has-value=true]:scale-90 data-[has-value=true]:text-xs",
          // background notch illusion
          "bg-white px-1"
        ),
        filled: cn(
          "left-3 top-3",
          "data-[focused=true]:top-1 data-[focused=true]:scale-90 data-[focused=true]:text-xs",
          "data-[has-value=true]:top-1 data-[has-value=true]:scale-90 data-[has-value=true]:text-xs"
        ),
        standard: cn(
          "left-0 top-1/2 -translate-y-1/2",
          "data-[focused=true]:top-0 data-[focused=true]:-translate-y-1/2 data-[focused=true]:scale-90 data-[focused=true]:text-xs",
          "data-[has-value=true]:top-0 data-[has-value=true]:-translate-y-1/2 data-[has-value=true]:scale-90 data-[has-value=true]:text-xs"
        ),
      },
      required: {
        true: "after:ml-0.5 after:text-error-500 after:content-['*']",
        false: "",
      },
      error: {
        true: "text-error-600",
        false: "",
      },
      size: {
        small: "text-sm",
        medium: "text-base",
        large: "text-lg",
      },
    },
    defaultVariants: {
      variant: "outlined",
      required: false,
      error: false,
      size: "medium",
    },
  }
);

// Helper text styles
export const TextFieldHelperStyles = cva(cn("mt-1 text-xs text-gray-500"), {
  variants: {
    error: {
      true: "text-error-600",
      false: "",
    },
    margin: {
      none: "mt-0",
      dense: "mt-1",
      normal: "mt-1.5",
    },
  },
  defaultVariants: {
    error: false,
    margin: "normal",
  },
});

export const TextFieldStyles = {
  container: TextFieldContainerStyles,
  input: TextFieldInputStyles,
  label: TextFieldLabelStyles,
  helper: TextFieldHelperStyles,
};
