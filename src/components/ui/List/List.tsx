"use client";

// libs
import { Children, cloneElement, isValidElement, ReactElement } from "react";
import { cn } from "@/utils/cn";
// types
import type { FC } from "react";
import type { ListItemProps, ListProps } from "./ListTypes";
import type { VariantProps } from "class-variance-authority";
// styles
import { ListStyles } from "./ListStyles";

const List: FC<ListProps> = (props) => {
  const {
    children,
    className,
    size,
    variant,
    color,
    radius,
    disabledAnimation,
    ...otherProps
  } = props;

  const childrenWithProps = Children.map(children, (child) => {
    const childElement = child as ReactElement<ListItemProps>;
    if (isValidElement(child)) {
      return cloneElement(child, {
        color: childElement.props.color ?? color,
        size: childElement?.props.size ?? size,
        variant: childElement?.props?.variant ?? variant,
        radius: childElement?.props?.radius ?? radius,
        disabledAnimation:
          childElement?.props?.disabledAnimation ?? disabledAnimation,
      } as Partial<VariantProps<(typeof ListStyles)["item"]>>);
    }
    return child;
  });

  return (
    <ul className={cn(className, ListStyles.base({}))} {...otherProps}>
      {childrenWithProps}
    </ul>
  );
};

export default List;
