'use client';

import { useMemo, useRef } from 'react';
// libs
import { Ripple } from '@/shared/Ripple';
import { cn } from '@/utils/cn';
// types
import type { ElementType, FC, MouseEvent } from 'react';
import type { RippleRef } from '@/shared/Ripple';
import type { ButtonProps } from './ButtonTypes.d';
// styles
import { ButtonStyles } from './ButtonStyles';

const Button: FC<ButtonProps> = (props) => {
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

  const buttonRef = useRef<HTMLElement>(null);
  const rippleRef = useRef<RippleRef>(null);

  const Component: ElementType = href ? 'a' : (as ?? 'button');
  const isDisabled =
    loading ||
    ('disabled' in otherProps ? ((otherProps as { disabled?: boolean }).disabled ?? false) : false);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (rippleRef.current && !disabledRipple) {
      rippleRef.current.createRipple(e);
    }

    if (onClick) {
      onClick(e as MouseEvent<HTMLButtonElement>);
    }
  };

  const spinnerNode = useMemo(() => {
    return spinner ?? <span aria-hidden className={ButtonStyles.spinner({ size })} />;
  }, [size, spinner]);

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
          disabledAnimation: disableAnimation ?? disabledAnimation,
          fullWidth,
          loading,
          isIconOnly,
        })
      )}
      {...(Component === 'button' ? { disabled: isDisabled } : {})}
      aria-busy={loading}
      {...(Component === 'a' && href ? { href } : {})}
      {...otherProps}
    >
      <Ripple parentRef={buttonRef} ref={rippleRef} />

      {loading ? (
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
          {spinnerNode}
        </span>
      ) : null}

      {startIcon ? <span className={ButtonStyles.icon({ size })}>{startIcon}</span> : null}
      <span className={cn(isIconOnly && 'sr-only')}>{children}</span>
      {endIcon ? <span className={ButtonStyles.icon({ size })}>{endIcon}</span> : null}
    </Component>
  );
};

Button.displayName = 'Button';

export default Button;
