'use client';

import { flexRender } from '@tanstack/react-table';
// import type { FC } from "react";
import type { HeaderGroup, Table as TableInstance } from '@tanstack/react-table';
import { cn } from '@/utils/cn';
import { TableStyles } from './TableStyles';
import { Button } from '@/components/ui/Button';

export interface TableHeaderProps<TData> {
  table: TableInstance<TData>;
  size?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center' | 'right';
  enableSorting?: boolean;
  enableColumnPinning?: boolean;
  enableRowSelection?: boolean;
  enableExpanding?: boolean;
}

const SortIndicator = ({ state }: { state: false | 'asc' | 'desc' }) => {
  if (state === 'asc') return <span aria-hidden>▲</span>;
  if (state === 'desc') return <span aria-hidden>▼</span>;
  return null;
};

const TableHeader = <TData,>(props: TableHeaderProps<TData>) => {
  const {
    table,
    size = 'md',
    align = 'left',
    enableSorting = true,
    enableColumnPinning = true,
    enableRowSelection = false,
    enableExpanding = false,
  } = props;

  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
        <tr key={headerGroup.id}>
          {enableRowSelection ? (
            <th className={cn(TableStyles.headerCell({ align, size }))}>
              <Button
                variant="outlined"
                size="sm"
                radius="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  table.toggleAllRowsSelected();
                }}
              >
                {table.getIsAllRowsSelected() ? 'Unselect' : 'Select'}
              </Button>
            </th>
          ) : null}
          {enableExpanding ? (
            <th className={cn(TableStyles.headerCell({ align, size }))}>Expand</th>
          ) : null}
          {headerGroup.headers.map((header) => {
            const sortable = enableSorting && header.column.getCanSort();
            const sortState = header.column.getIsSorted();
            const canPin = enableColumnPinning && header.column.getCanPin?.();
            const pinned = header.column.getIsPinned?.();

            return (
              <th
                key={header.id}
                onClick={sortable ? header.column.getToggleSortingHandler() : undefined}
                className={cn(TableStyles.headerCell({ align, size, sortable }), 'select-none')}
              >
                <div className={cn('flex items-center gap-2')}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                  {sortable ? <SortIndicator state={sortState} /> : null}
                  {canPin ? (
                    <div
                      className={cn('flex items-center gap-1 ml-auto')}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="outlined"
                        size="sm"
                        radius="sm"
                        onClick={() => header.column.pin('left')}
                      >
                        L
                      </Button>
                      <Button
                        variant="outlined"
                        size="sm"
                        radius="sm"
                        onClick={() => header.column.pin('right')}
                      >
                        R
                      </Button>
                      {pinned ? (
                        <Button
                          variant="outlined"
                          size="sm"
                          radius="sm"
                          onClick={() => header.column.pin(false)}
                        >
                          U
                        </Button>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
