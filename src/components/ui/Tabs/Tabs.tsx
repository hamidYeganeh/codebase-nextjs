'use client';

import { useMemo, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import type { FC, KeyboardEvent } from 'react';
import { TabsStyles } from './TabsStyles';
import type { TabsProps } from './TabsTypes.d';

const Tabs: FC<TabsProps> = (props) => {
  const {
    items,
    value,
    defaultValue,
    onValueChange,
    className,
    size,
    radius,
    color,
    variant,
    ...otherProps
  } = props;
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string>(defaultValue ?? items[0]?.value);
  const currentValue = isControlled ? value! : internalValue;
  const listRef = useRef<HTMLDivElement>(null);

  // defaultValue is only used for initial uncontrolled state; subsequent changes are ignored by design

  // Narrow color to the allowed union for style helpers
  const colorResolved = (color ?? 'default') as
    | 'primary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'default'
    | null
    | undefined;

  const indexMap = useMemo(() => new Map(items.map((item, idx) => [item.value, idx])), [items]);

  const handleSelect = (val: string) => {
    if (!isControlled) setInternalValue(val);
    onValueChange?.(val);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIdx = indexMap.get(currentValue) ?? 0;
    let nextIdx = currentIdx;
    if (e.key === 'ArrowRight') nextIdx = Math.min(items.length - 1, currentIdx + 1);
    if (e.key === 'ArrowLeft') nextIdx = Math.max(0, currentIdx - 1);
    if (nextIdx !== currentIdx) {
      const nextVal = items[nextIdx].value;
      handleSelect(nextVal);
      const btn = listRef.current?.querySelector<HTMLButtonElement>(
        `button[data-value="${nextVal}"]`
      );
      btn?.focus();
      e.preventDefault();
    }
  };

  return (
    <div
      className={cn(className, TabsStyles.root({ size, radius, color: colorResolved, variant }))}
      {...otherProps}
    >
      <div
        role="tablist"
        aria-orientation="horizontal"
        ref={listRef}
        onKeyDown={onKeyDown}
        className={TabsStyles.list({ variant })}
      >
        {items.map((item) => {
          const selected = item.value === currentValue;
          return (
            <button
              key={item.value}
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${item.value}`}
              id={`tab-${item.value}`}
              disabled={item.disabled}
              data-selected={selected}
              data-value={item.value}
              className={TabsStyles.trigger({ variant, disabled: item.disabled })}
              onClick={() => handleSelect(item.value)}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => {
        const selected = item.value === currentValue;
        return (
          <div
            key={item.value}
            role="tabpanel"
            id={`panel-${item.value}`}
            aria-labelledby={`tab-${item.value}`}
            className={TabsStyles.panel({ variant })}
            hidden={!selected}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
