import React from 'react';
import type { SpinnerProps } from './SpinnerTypes.d';
import { spinnerClassName } from './SpinnerStyles';

export default function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <span
      role="progressbar"
      aria-busy="true"
      className={spinnerClassName({ ...props, className })}
    />
  );
}
