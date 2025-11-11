import type { RefObject } from 'react';

export interface RippleRef {
  /**
   * create the ripple animation effect.
   * @param event The React MouseEvent from the parent Button click.
   */
  createRipple: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface RippleProps {
  parentRef: RefObject<HTMLElement | null>;
}
