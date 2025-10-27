"use client";

import { FC, useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import { CheckboxProps } from "./CheckboxTypes.d";
import { CheckboxStyles } from "./CheckboxStyles";

const Checkbox: FC<CheckboxProps> = (props) => {
  const {
    id,
    name,
    checked,
    defaultChecked,
    indeterminate,
    disabled,
    error,
    color,
    size,
    onChange,
    label,
    labelProps,
    className,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  const rootClasses = CheckboxStyles.root({ size });
  const boxClasses = CheckboxStyles.box({ color, size });
  const iconClasses = CheckboxStyles.icon({ size });
  const labelClasses = CheckboxStyles.label({ size });

  const isChecked = !!checked || !!defaultChecked;
  const isIndeterminate = !!indeterminate;

  return (
    <label className={cn(rootClasses, className)} {...labelProps}>
      <span
        className={boxClasses}
        data-checked={isChecked ? "true" : undefined}
        data-indeterminate={isIndeterminate ? "true" : undefined}
        data-disabled={disabled ? "true" : undefined}
        data-error={error ? "true" : undefined}
      >
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="checkbox"
          className={cn("sr-only")}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={onChange}
          {...rest}
        />
        <span className={iconClasses}>
          {isIndeterminate ? "−" : isChecked ? "✓" : null}
        </span>
      </span>
      {label && <span className={labelClasses}>{label}</span>}
    </label>
  );
};

export default Checkbox;