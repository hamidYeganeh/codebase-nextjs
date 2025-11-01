import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

const DropdownContentStyles = cva(
  cn(
    // base
    "z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto shadow-md outline-none",
    "rounded-md bg-white"
  )
);
const DropdownItemStyles = cva(
  cn(
    // base
    "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "bg-red-500_ p-2"

    // variants
    // "focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground"
  ),
  {
    variants: {
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
  "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8"
);
const DropdownHighlightStyles = cva(
  cn(
    // base
    "absolute inset-0 z-0 rounded-sm p-1 bg-blue-500"
  )
);
export const DropdownStyles = {
  content: DropdownContentStyles,
  item: DropdownItemStyles,
  label: DropdownLabelStyles,
  highlight: DropdownHighlightStyles,
};
