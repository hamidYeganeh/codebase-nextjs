'use client';

// libs
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { cn } from '@/utils/cn';
// theme
import { useTheme } from '@/hooks/useTheme';
import { THEME_MODES } from '@/configs/theme.config';
// types
import type { FC } from 'react';
import type { ApexOptions } from 'apexcharts';
import type { ChartProps } from './ChartTypes.d';
// styles
import { ChartStyles } from './ChartStyles';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Chart: FC<ChartProps> = (props) => {
  const { type, options, series, height = 300, width = '100%', className, ...otherProps } = props;

  const { mode } = useTheme();

  const mergedOptions = useMemo<ApexOptions>(() => {
    const themeMode = THEME_MODES[mode];

    const defaultChart: ApexOptions['chart'] = {
      fontFamily:
        getComputedStyle(document.documentElement).getPropertyValue('--font-sans') ||
        'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans',
      toolbar: { show: true },
    };

    const defaultGrid: ApexOptions['grid'] = {
      borderColor: themeMode === 'dark' ? '#1f2937' : '#e5e7eb',
      strokeDashArray: 2,
    };

    const defaultLegend: ApexOptions['legend'] = {
      position: 'top',
    };

    const defaultTooltip: ApexOptions['tooltip'] = {
      theme: themeMode,
    };

    const merged: ApexOptions = {
      ...options,
      chart: { ...defaultChart, ...options?.chart },
      grid: { ...defaultGrid, ...options?.grid },
      legend: { ...defaultLegend, ...options?.legend },
      tooltip: { ...defaultTooltip, ...options?.tooltip },
      theme: {
        mode: (options?.theme?.mode as 'light' | 'dark' | undefined) ?? themeMode,
        ...options?.theme,
      },
    };

    return merged;
  }, [options, mode]);

  return (
    <div className={cn(ChartStyles.container({}), className)} {...otherProps}>
      <ReactApexChart
        type={type}
        options={mergedOptions}
        series={series}
        height={height}
        width={width}
      />
    </div>
  );
};

export default Chart;
