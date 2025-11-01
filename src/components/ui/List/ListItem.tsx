"use client";

// libs
import { useImperativeHandle, useRef } from "react";
import { Ripple } from "@/components/shared/Ripple";
import { cn } from "@/utils/cn";
// types
import type { FC, MouseEvent } from "react";
import type { RippleRef } from "@/components/shared/Ripple";
import type { ListItemProps } from "./ListTypes";
// styles
import { ListStyles } from "./ListStyles";

const ListItem: FC<ListItemProps> = (props) => {
  const {
    ref,
    children,
    onClick,
    className,
    size,
    variant,
    color,
    radius,
    disabledRipple,
    disabledAnimation,
    ...otherProps
  } = props;

  const liRef = useRef<HTMLLIElement>(null);
  const rippleRef = useRef<RippleRef>(null);

  useImperativeHandle(ref, () => liRef.current!);

  function handleClick(e: MouseEvent<HTMLLIElement>) {
    if (rippleRef.current && !disabledRipple) {
      rippleRef.current.createRipple(e);
    }

    if (onClick) {
      onClick(e);
    }
  }

  return (
    <li
      ref={liRef}
      onClick={handleClick}
      className={cn(
        className,
        ListStyles.item({ size, variant, color, disabledAnimation, radius })
      )}
      {...otherProps}
    >
      <Ripple parentRef={liRef} ref={rippleRef} />
      {children}
    </li>
  );
};
export default ListItem;
