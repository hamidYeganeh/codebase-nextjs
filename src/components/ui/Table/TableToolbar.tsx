'use client';

// import type { FC } from "react";
import type { Table as TableInstance } from '@tanstack/react-table';
import { cn } from '@/utils/cn';
import { TextField } from '@/components/ui/TextField';

export interface TableToolbarProps<TData> {
  table: TableInstance<TData>;
  placeholder?: string;
}

const TableToolbar = <TData,>(props: TableToolbarProps<TData>) => {
  const { table, placeholder = 'Filter...' } = props;

  return (
    <div
      className={cn('flex items-center gap-3 p-3 border-b border-gray-200 bg-white')}
      data-slot="table-toolbar"
    >
      <TextField
        size="sm"
        placeholder={placeholder}
        value={(table.getState().globalFilter ?? '') as string}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        label="Search"
      />
    </div>
  );
};

export default TableToolbar;
