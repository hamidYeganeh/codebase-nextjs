import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

export const SwitchRootStyles = cva(cn("inline-flex items-center gap-2"), {
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

export const SwitchTrackStyles = cva(
  cn(
    "relative rounded-full",
    "bg-gray-300",
    "transition-colors duration-200 ease-out",
    "data-[checked=true]:bg-(--color)"
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
        small: "w-9 h-5",
        medium: "w-11 h-6",
        large: "w-14 h-7",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "medium",
    },
  }
);

export const SwitchThumbStyles = cva(
  cn(
    "absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow",
    "transition-transform duration-200 ease-out"
  ),
  {
    variants: {
      size: {
        small: "w-4 h-4 left-0.5 data-[checked=true]:translate-x-4",
        medium: "w-5 h-5 left-0.5 data-[checked=true]:translate-x-5",
        large: "w-6 h-6 left-1 data-[checked=true]:translate-x-6",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export const SwitchLabelStyles = cva(cn("text-gray-700"), {
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

export const SwitchStyles = {
  root: SwitchRootStyles,
  track: SwitchTrackStyles,
  thumb: SwitchThumbStyles,
  label: SwitchLabelStyles,
};