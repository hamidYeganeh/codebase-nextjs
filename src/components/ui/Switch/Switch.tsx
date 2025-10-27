"use client";

import { FC } from "react";
import { cn } from "@/utils/cn";
import { SwitchProps } from "./SwitchTypes.d";
import { SwitchStyles } from "./SwitchStyles";

const Switch: FC<SwitchProps> = (props) => {
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

  const rootClasses = SwitchStyles.root({ size });
  const trackClasses = SwitchStyles.track({ color, size });
  const thumbClasses = SwitchStyles.thumb({ size });
  const labelClasses = SwitchStyles.label({ size });

  const isChecked = !!checked || !!defaultChecked;

  return (
    <label className={cn(rootClasses, className)} {...labelProps}>
      <span className={trackClasses} data-checked={isChecked ? "true" : undefined}>
        <input
          id={id}
          name={name}
          type="checkbox"
          role="switch"
          className={cn("sr-only")}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={onChange}
          {...rest}
        />
        <span className={thumbClasses} data-checked={isChecked ? "true" : undefined} />
      </span>
      {label && <span className={labelClasses}>{label}</span>}
    </label>
  );
};

export default Switch;