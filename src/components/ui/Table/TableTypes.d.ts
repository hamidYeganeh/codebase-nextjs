// types
import type { ColumnDef } from "@tanstack/react-table";
import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
// styles
import { TableStyles } from "./TableStyles";

export interface TableProps<TData>
  extends Omit<ComponentPropsWithRef<"div">, "children">,
    VariantProps<typeof TableStyles["container"]>,
    VariantProps<typeof TableStyles["table"]>,
    VariantProps<typeof TableStyles["cell"]>,
    VariantProps<typeof TableStyles["headerCell"]> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  enableSorting?: boolean;
  enableColumnPinning?: boolean;
  enableRowSelection?: boolean;
  enableExpanding?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  enableFiltering?: boolean;
  renderSubComponent?: (row: any) => React.ReactNode;
  toolbarPlaceholder?: string;
  getSubRows?: (row: TData) => TData[] | undefined;
}