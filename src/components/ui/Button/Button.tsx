"use client";

// libs
import { useImperativeHandle, useRef } from "react";
import { Ripple } from "@/shared/Ripple";
import { cn } from "@/utils/cn";
// types
import type { FC, MouseEvent } from "react";
import type { RippleRef } from "@/shared/Ripple";
import type { ButtonProps } from "./ButtonTypes.d";
// styles
import { ButtonStyles } from "./ButtonStyles";

const Button: FC<ButtonProps> = (props) => {
  const {
    ref,
    children,
    onClick,
    variant,
    color,
    size,
    radius,
    disabledRipple = false,
    className,
    fullWidth,
    disabledAnimation,
    ...buttonProps
  } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<RippleRef>(null);

  useImperativeHandle(ref, () => buttonRef.current!);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (rippleRef.current && !disabledRipple) {
      rippleRef.current.createRipple(e);
    }

    if (onClick) {
      onClick(e);
    }
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={cn(
        className,
        ButtonStyles.base({
          variant,
          color,
          size,
          radius,
          disabledAnimation,
          fullWidth,
        })
      )}
      {...buttonProps}
    >
      <Ripple parentRef={buttonRef} ref={rippleRef} />
      {children}
    </button>
  );
};
export default Button;
