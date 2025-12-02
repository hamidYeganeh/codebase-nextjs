'use client';

import { forwardRef, useMemo, useRef } from 'react';
// libs
import { Ripple } from '@/shared/Ripple';
import { cn } from '@/utils/cn';
// types
import type { ElementType, MouseEvent, MutableRefObject, Ref, RefObject } from 'react';
import type { RippleRef } from '@/shared/Ripple';
import type { ButtonProps } from './ButtonTypes.d';
// styles
import { ButtonStyles } from './ButtonStyles';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef: Ref<HTMLButtonElement>) => {
    const {
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
      disableAnimation,
      loading = false,
      spinnerPlacement = 'center',
      spinner,
      isIconOnly = false,
      startIcon,
      endIcon,
      as,
      href,
      ...otherProps
    } = props;

    const buttonRef = useRef<HTMLButtonElement>(null);
    const rippleRef = useRef<RippleRef>(null);

    const Component: ElementType = as ?? 'button';
    const isDisabled =
      loading ||
      ('disabled' in otherProps
        ? ((otherProps as { disabled?: boolean }).disabled ?? false)
        : false);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (rippleRef.current && !disabledRipple) {
        rippleRef.current.createRipple(e);
      }

      if (onClick) {
        onClick(e);
      }
    };

    const spinnerNode = useMemo(() => {
      return spinner ?? <span aria-hidden className={ButtonStyles.spinner({ size })} />;
    }, [size, spinner]);

    const content = useMemo(() => {
      return (
        <>
          {loading && spinnerPlacement === 'start' ? spinnerNode : null}
          {startIcon ? <span className={ButtonStyles.icon({ size })}>{startIcon}</span> : null}
          <span className={cn(isIconOnly && 'sr-only')}>{children}</span>
          {endIcon ? <span className={ButtonStyles.icon({ size })}>{endIcon}</span> : null}
          {loading && spinnerPlacement === 'end' ? spinnerNode : null}
        </>
      );
    }, [children, endIcon, isIconOnly, loading, size, spinnerNode, spinnerPlacement, startIcon]);

    const mergedRef = (node: HTMLButtonElement | null) => {
      buttonRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as MutableRefObject<HTMLButtonElement | null>).current = node;
      }
    };

    return (
      <Component
        ref={mergedRef}
        onClick={handleClick}
        className={cn(
          className,
          ButtonStyles.base({
            variant,
            color,
            size,
            radius,
            disabledAnimation: disableAnimation ?? disabledAnimation,
            fullWidth,
            loading,
            isIconOnly,
          })
        )}
        disabled={isDisabled}
        aria-busy={loading}
        {...(href ? { href } : {})}
        {...otherProps}
      >
        <Ripple parentRef={buttonRef as unknown as RefObject<HTMLElement>} ref={rippleRef} />
        {loading && spinnerPlacement === 'center' ? (
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
            {spinnerNode}
          </span>
        ) : null}
        <span className={ButtonStyles.content({ isIconOnly })}>{content}</span>
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;
