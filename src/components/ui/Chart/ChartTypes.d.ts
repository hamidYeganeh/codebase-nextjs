// types
import type { ApexOptions, ApexAxisChartSeries, ApexNonAxisChartSeries } from 'apexcharts';
import type { ComponentPropsWithoutRef } from 'react';

export type ApexChartType =
  | 'line'
  | 'area'
  | 'bar'
  | 'pie'
  | 'donut'
  | 'radialBar'
  | 'scatter'
  | 'bubble'
  | 'heatmap'
  | 'treemap'
  | 'boxPlot'
  | 'candlestick'
  | 'radar'
  | 'polarArea'
  | 'rangeBar'
  | 'rangeArea';

export interface ChartProps extends ComponentPropsWithoutRef<'div'> {
  type: ApexChartType;
  options?: ApexOptions;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  height?: number | string;
  width?: number | string;
}
