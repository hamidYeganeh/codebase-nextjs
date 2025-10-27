"use client";

import { FC } from "react";
import { cn } from "@/utils/cn";
import { RadioProps } from "./RadioTypes.d";
import { RadioStyles } from "./RadioStyles";

const Radio: FC<RadioProps> = (props) => {
  const {
    id,
    name,
    checked,
    defaultChecked,
    disabled,
    color,
    size,
    onChange,
    label,
    labelProps,
    className,
    ...rest
  } = props;

  const rootClasses = RadioStyles.root({ size });
  const circleClasses = RadioStyles.circle({ color, size });
  const dotClasses = RadioStyles.dot({ size });
  const labelClasses = RadioStyles.label({ size });

  const isChecked = !!checked || !!defaultChecked;

  return (
    <label className={cn(rootClasses, className)} {...labelProps}>
      <span
        className={circleClasses}
        data-checked={isChecked ? "true" : undefined}
        data-disabled={disabled ? "true" : undefined}
      >
        <input
          id={id}
          name={name}
          type="radio"
          className={cn("sr-only")}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={onChange}
          {...rest}
        />
        <span className={dotClasses} />
      </span>
      {label && <span className={labelClasses}>{label}</span>}
    </label>
  );
};

export default Radio;