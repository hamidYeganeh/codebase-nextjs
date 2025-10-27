"use client";

import { FC, MouseEvent, useImperativeHandle, useRef } from "react";
import { ButtonProps } from "./ButtonTypes.d";
import { cn } from "@utils/cn";
import { ButtonStyles } from "./ButtonStyles";
import { Ripple, RippleRef } from "@/shared/Ripple";

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
