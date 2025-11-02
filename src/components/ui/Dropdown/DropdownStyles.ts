// libs
import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

const DropdownContentStyles = cva(
  cn(
    // base
    "z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto shadow-md outline-none",
    "rounded-md bg-white p-1"
  )
);
const DropdownItemStyles = cva(
  cn(
    // base
    "w-full relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  ),
  {
    variants: {
      variant: {
        contained: "bg-(--color) text-(--text-color) hover:bg-(--dark-color)",
        outlined:
          "ring hover:ring-2 ring-(--color) bg-transparent hover:bg-(--light-color) text-(--color)",
        flat: "text-(--color) bg-(--light-color)",
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
    },
  }
);
const DropdownLabelStyles = cva(
  cn("px-2 py-1.5 text-sm font-medium", "text-(--color)"),
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
      inset: {
        true: "pl-8",
        false: "pl-2",
      },
    },
  }
);
const DropdownHighlightStyles = cva(
  cn(
    // base
    "absolute inset-0 z-0 rounded-sm p-1"
  )
);
export const DropdownStyles = {
  content: DropdownContentStyles,
  item: DropdownItemStyles,
  label: DropdownLabelStyles,
  highlight: DropdownHighlightStyles,
};
