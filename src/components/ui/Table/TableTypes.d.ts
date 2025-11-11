// types
import type { ColumnDef, Row } from '@tanstack/react-table';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef, ReactNode } from 'react';
// styles
import { TableStyles } from './TableStyles';

export interface TableProps<TData>
  extends Omit<ComponentPropsWithRef<'div'>, 'children'>,
    VariantProps<(typeof TableStyles)['container']>,
    VariantProps<(typeof TableStyles)['table']>,
    VariantProps<(typeof TableStyles)['cell']>,
    VariantProps<(typeof TableStyles)['headerCell']> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  enableSorting?: boolean;
  enableColumnPinning?: boolean;
  enableRowSelection?: boolean;
  enableExpanding?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  enableFiltering?: boolean;
  renderSubComponent?: (row: Row<TData>) => ReactNode;
  toolbarPlaceholder?: string;
  getSubRows?: (row: TData) => TData[] | undefined;
}
