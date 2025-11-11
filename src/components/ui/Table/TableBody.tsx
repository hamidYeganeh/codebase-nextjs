"use client";

import { flexRender } from "@tanstack/react-table";
import React, { type FC } from "react";
import type { Row, Table as TableInstance } from "@tanstack/react-table";
import { cn } from "@/utils/cn";
import { TableStyles } from "./TableStyles";
import { Checkbox } from "@/components/ui/Checkbox";

export interface TableBodyProps<TData> {
  table: TableInstance<TData>;
  size?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
  enableRowSelection?: boolean;
  enableExpanding?: boolean;
  renderSubComponent?: (row: Row<TData>) => React.ReactNode;
}

const TableBody = <TData,>(props: TableBodyProps<TData>) => {
  const { table, size = "md", align = "left", enableRowSelection = false, enableExpanding = false, renderSubComponent } = props;

  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <React.Fragment key={row.id}>
          <tr>
            {enableRowSelection ? (
              <td className={cn(TableStyles.cell({ align, size }))}>
                <Checkbox
                  checked={row.getIsSelected()}
                  indeterminate={row.getIsSomeSelected()}
                  onChange={(e) => row.toggleSelected(!!e.currentTarget.checked)}
                  size={size === "sm" ? "small" : size === "lg" ? "large" : "medium"}
                />
              </td>
            ) : null}

            {enableExpanding ? (
              <td className={cn(TableStyles.cell({ align, size }))}>
                {row.getCanExpand() ? (
                  <button
                    className={cn("px-2 py-1 text-sm rounded-sm ring ring-gray-200 bg-white hover:bg-gray-50")}
                    onClick={() => row.toggleExpanded()}
                  >
                    {row.getIsExpanded() ? "Collapse" : "Expand"}
                  </button>
                ) : null}
              </td>
            ) : null}

            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className={cn(TableStyles.cell({ align, size }))}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
          {enableExpanding && row.getIsExpanded() && renderSubComponent ? (
            <tr>
              <td colSpan={row.getVisibleCells().length + (enableRowSelection ? 1 : 0) + (enableExpanding ? 1 : 0)} className={cn("p-3 bg-gray-50 border-t border-gray-200")}
              >
                {renderSubComponent(row)}
              </td>
            </tr>
          ) : null}
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default TableBody as FC<TableBodyProps<any>>;