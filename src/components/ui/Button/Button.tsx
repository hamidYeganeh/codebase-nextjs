"use client";

import { FC, MouseEvent, useImperativeHandle, useRef } from "react";
import { ButtonProps } from "./ButtonTypes";
import { ButtonStyles } from "./ButtonStyles";
import { cn } from "@/utils/cn";
import { Ripple, RippleRef } from "@/shared/Ripple";

const Button: FC<ButtonProps> = (props) => {
  const {
    ref,
    children,
    onClick,
    variant,
    color,
    size,
    radius = "md",
    disabledRipple = false,
    className,
    fullWidth,
    disabledAnimation = false,
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
        ButtonStyles.base({ variant, color, size, radius, disabledAnimation }),
        {
          "w-full": fullWidth,
        }
      )}
      {...buttonProps}
    >
      <Ripple parentRef={buttonRef} ref={rippleRef} />
      {children}
    </button>
  );
};
export default Button;
