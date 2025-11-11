import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const TableContainerStyles = cva(
  cn("w-full overflow-auto outline-hidden outline-0 bg-white ring ring-gray-100"),
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
      shadow: "sm",
      radius: "md",
    },
  }
);

const TableBaseStyles = cva(
  cn("w-full border-collapse text-left"),
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      striped: {
        true: "[&_tbody_tr:nth-child(odd)]:bg-gray-50",
        false: "",
      },
      hoverable: {
        true: "[&_tbody_tr:hover]:bg-gray-100",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      striped: true,
      hoverable: true,
    },
  }
);

const TableHeaderCellStyles = cva(
  cn("text-gray-700 font-medium bg-gray-50 border-b border-gray-200 select-none"),
  {
    variants: {
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      size: {
        sm: "px-2 py-1",
        md: "px-3 py-2",
        lg: "px-4 py-3",
      },
      sortable: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      align: "left",
      size: "md",
      sortable: false,
    },
  }
);

const TableCellStyles = cva(
  cn("text-gray-800 border-t border-gray-100"),
  {
    variants: {
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      size: {
        sm: "px-2 py-1",
        md: "px-3 py-2",
        lg: "px-4 py-3",
      },
    },
    defaultVariants: {
      align: "left",
      size: "md",
    },
  }
);

export const TableStyles = {
  container: TableContainerStyles,
  table: TableBaseStyles,
  headerCell: TableHeaderCellStyles,
  cell: TableCellStyles,
};