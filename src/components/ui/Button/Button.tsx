'use client';

// libs
import { useImperativeHandle, useMemo, useRef } from 'react';
import { Ripple } from '@/shared/Ripple';
import { cn } from '@/utils/cn';
// types
import type { FC, MouseEvent, ElementType } from 'react';
import type { RippleRef } from '@/shared/Ripple';
import type { ButtonProps } from './ButtonTypes.d';
// styles
import { ButtonStyles } from './ButtonStyles';

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
    loading = false,
    isIconOnly = false,
    startIcon,
    endIcon,
    as,
    href,
    ...otherProps
  } = props;

  const buttonRef = useRef<HTMLElement>(null);
  const rippleRef = useRef<RippleRef>(null);

  useImperativeHandle(ref, () => buttonRef.current!);

  function handleClick(e: MouseEvent<HTMLElement>) {
    if (rippleRef.current && !disabledRipple) {
      rippleRef.current.createRipple(e);
    }

    if (onClick) {
      onClick(e);
    }
  }

  const Component: ElementType = as ?? 'button';

  const content = useMemo(() => {
    return (
      <>
        {startIcon ? <span className={ButtonStyles.icon({ size })}>{startIcon}</span> : null}
        <span className={cn(isIconOnly && 'sr-only')}>{children}</span>
        {endIcon ? <span className={ButtonStyles.icon({ size })}>{endIcon}</span> : null}
      </>
    );
  }, [children, endIcon, isIconOnly, size, startIcon]);

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
          isIconOnly,
        })
      )}
      disabled={
        loading ||
        ('disabled' in otherProps
          ? ((otherProps as { disabled?: boolean }).disabled ?? false)
          : false)
      }
      {...(href ? { href } : {})}
      {...otherProps}
    >
      <Ripple parentRef={buttonRef} ref={rippleRef} />
      {loading ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <span
            aria-hidden
            className="inline-block w-4 h-4 border-2 border-(--text-color) border-t-transparent rounded-full animate-spin"
          />
        </span>
      ) : null}
      <span
        className={cn(
          'inline-flex items-center gap-1.5',
          isIconOnly && 'w-full h-full justify-center'
        )}
      >
        {content}
      </span>
    </Component>
  );
};
export default Button;
