import React from "react";
import type { Transition } from "motion/react";

export type HighlightMode = "children" | "parent";

export type Bounds = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type HighlightContextType<T extends string> = {
  as?: keyof HTMLElementTagNameMap;
  mode: HighlightMode;
  activeValue: T | null;
  setActiveValue: (value: T | null) => void;
  setBounds: (bounds: DOMRect) => void;
  clearBounds: () => void;
  id: string;
  hover: boolean;
  click: boolean;
  className?: string;
  style?: React.CSSProperties;
  activeClassName?: string;
  setActiveClassName: (className: string) => void;
  transition?: Transition;
  disabled?: boolean;
  enabled?: boolean;
  exitDelay?: number;
  forceUpdateBounds?: boolean;
};

export type BaseHighlightProps<T extends React.ElementType = "div"> = {
  as?: T;
  ref?: React.Ref<HTMLDivElement>;
  mode?: HighlightMode;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  className?: string;
  style?: React.CSSProperties;
  transition?: Transition;
  hover?: boolean;
  click?: boolean;
  disabled?: boolean;
  enabled?: boolean;
  exitDelay?: number;
};

export type ParentModeHighlightProps = {
  boundsOffset?: Partial<Bounds>;
  containerClassName?: string;
  forceUpdateBounds?: boolean;
};

export type ControlledParentModeHighlightProps<
  T extends React.ElementType = "div",
> = BaseHighlightProps<T> &
  ParentModeHighlightProps & {
    mode: "parent";
    controlledItems: true;
    children: React.ReactNode;
  };

export type ControlledChildrenModeHighlightProps<
  T extends React.ElementType = "div",
> = BaseHighlightProps<T> & {
  mode?: "children" | undefined;
  controlledItems: true;
  children: React.ReactNode;
};

export type UncontrolledParentModeHighlightProps<
  T extends React.ElementType = "div",
> = BaseHighlightProps<T> &
  ParentModeHighlightProps & {
    mode: "parent";
    controlledItems?: false;
    itemsClassName?: string;
    children: React.ReactElement | React.ReactElement[];
  };

export type UncontrolledChildrenModeHighlightProps<
  T extends React.ElementType = "div",
> = BaseHighlightProps<T> & {
  mode?: "children";
  controlledItems?: false;
  itemsClassName?: string;
  children: React.ReactElement | React.ReactElement[];
};

export type HighlightProps<T extends React.ElementType = "div"> =
  | ControlledParentModeHighlightProps<T>
  | ControlledChildrenModeHighlightProps<T>
  | UncontrolledParentModeHighlightProps<T>
  | UncontrolledChildrenModeHighlightProps<T>;

export type ExtendedChildProps = React.ComponentProps<"div"> & {
  id?: string;
  ref?: React.Ref<HTMLElement>;
  "data-active"?: string;
  "data-value"?: string;
  "data-disabled"?: boolean;
  "data-highlight"?: boolean;
  "data-slot"?: string;
};

export type HighlightItemProps<T extends React.ElementType = "div"> =
  React.ComponentProps<T> & {
    as?: T;
    children: React.ReactElement;
    id?: string;
    value?: string;
    className?: string;
    style?: React.CSSProperties;
    transition?: Transition;
    activeClassName?: string;
    disabled?: boolean;
    exitDelay?: number;
    asChild?: boolean;
    forceUpdateBounds?: boolean;
  };