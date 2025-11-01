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
    as: Component = "button",
    href,
    loading = false,
    ...otherProps
  } = props;

  const buttonRef = useRef<HTMLElement>(null);
  const rippleRef = useRef<RippleRef>(null);

  useImperativeHandle(ref, () => buttonRef.current! as HTMLButtonElement);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (rippleRef.current && !disabledRipple) {
      rippleRef.current.createRipple(e);
    }

    if (onClick) {
      onClick(e);
    }
  }

  return (
    <Component
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
          loading,
        })
      )}
      disabled={loading}
      {...otherProps}
      {...(href ? { href } : {})}
    >
      <Ripple parentRef={buttonRef} ref={rippleRef} />
      {children}
    </Component>
  );
};
export default Button;
