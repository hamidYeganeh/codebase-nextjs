// ripple.d.ts or in the same file as Ripple
import React from "react";

export interface RippleRef {
  /**
   * create the ripple animation effect.
   * @param event The React MouseEvent from the parent Button click.
   */
  createRipple: (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => void;
}

export interface RippleProps {
  parentRef: Ref<HTMLButtonElement | HTMLDivElement>;
}
