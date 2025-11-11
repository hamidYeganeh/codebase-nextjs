"use client";

// libs
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import {
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/utils/cn";
// types
import type { FC } from "react";
import type { TableProps } from "./TableTypes";
// styles
import { TableStyles } from "./TableStyles";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableToolbar from "./TableToolbar";

const SortIndicator = ({ state }: { state: false | "asc" | "desc" }) => {
  if (state === "asc") return <span aria-hidden>▲</span>;
  if (state === "desc") return <span aria-hidden>▼</span>;
  return null;
};

const Table = <TData,>(props: TableProps<TData>) => {
  const {
    data,
    columns,
    className,
    shadow,
    radius,
    size = "md",
    striped = true,
    hoverable = true,
    align = "left",
    enableSorting = true,
    enableColumnPinning = true,
    enableRowSelection = false,
    enableExpanding = false,
    enableFiltering = true,
    enablePagination = false,
    pageSize = 10,
    renderSubComponent,
    toolbarPlaceholder,
    getSubRows,
    ...restProps
  } = props as TableProps<TData>;
  // Avoid passing HTML "dir" (string) to Radix ScrollArea, which expects Direction
  const { dir: _dir, ...otherProps } = restProps as Record<string, unknown>;

  // Normalize possible nulls from external props to undefined for child components
  const normalizedSize = (size ?? undefined) as "sm" | "md" | "lg" | undefined;
  const normalizedAlign = (align ?? undefined) as "left" | "center" | "right" | undefined;

  const table = useReactTable({
    data,
    columns,
    // Let TanStack manage state internally for simplicity
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getExpandedRowModel: enableExpanding ? getExpandedRowModel() : undefined,
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    ...(getSubRows ? { getSubRows } : {}),
    initialState: enablePagination
      ? {
          pagination: { pageIndex: 0, pageSize },
        }
      : undefined,
  });

  return (
    <ScrollAreaPrimitive.Root
      data-slot="table-container"
      className={cn(TableStyles.container({ shadow, radius }), className)}
      {...otherProps}
    >
      {enableFiltering ? (
        <TableToolbar table={table} placeholder={toolbarPlaceholder} />
      ) : null}

      <ScrollAreaPrimitive.Viewport className={cn("w-full")}>
        <table
          data-slot="table"
          className={cn(
            TableStyles.table({ size: normalizedSize, striped, hoverable }),
            "min-w-full"
          )}
        >
          <TableHeader
            table={table}
            size={normalizedSize}
            align={normalizedAlign}
            enableSorting={enableSorting}
            enableColumnPinning={enableColumnPinning}
            enableRowSelection={enableRowSelection}
            enableExpanding={enableExpanding}
          />
          <TableBody
            table={table}
            size={normalizedSize}
            align={normalizedAlign}
            enableRowSelection={enableRowSelection}
            enableExpanding={enableExpanding}
            renderSubComponent={renderSubComponent as any}
          />
        </table>
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar orientation="horizontal" />
      <ScrollAreaPrimitive.Scrollbar orientation="vertical" />
      <ScrollAreaPrimitive.Corner />

      {enablePagination ? (
        <div className={cn("flex items-center justify-between px-3 py-2 border-t border-gray-200")}>
          <div className={cn("text-xs text-gray-600")}>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
          </div>
          <div className={cn("flex items-center gap-2")}>
            <button
              data-slot="table-page-prev"
              className={cn(
                "px-2 py-1 text-sm rounded-sm ring ring-gray-200 disabled:opacity-50",
                "bg-white hover:bg-gray-50"
              )}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Prev
            </button>
            <button
              data-slot="table-page-next"
              className={cn(
                "px-2 py-1 text-sm rounded-sm ring ring-gray-200 disabled:opacity-50",
                "bg-white hover:bg-gray-50"
              )}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </ScrollAreaPrimitive.Root>
  );
};

export default Table;