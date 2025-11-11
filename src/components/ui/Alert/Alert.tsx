'use client';

import type { FC } from 'react';
import { cn } from '@/utils/cn';
import { AlertStyles } from './AlertStyles';
import type { AlertProps } from './AlertTypes.d';

const Alert: FC<AlertProps> = (props) => {
  const {
    className,
    variant,
    color,
    radius,
    title,
    description,
    startIcon,
    dismissible,
    onDismiss,
    ...otherProps
  } = props;

  return (
    <div
      className={cn(className, AlertStyles.base({ variant, color, radius }))}
      role="alert"
      {...otherProps}
    >
      {startIcon ? <span className={AlertStyles.icon()}>{startIcon}</span> : null}
      <div className="flex-1">
        {title ? <div className={AlertStyles.title()}>{title}</div> : null}
        {description ? <div className={AlertStyles.description()}>{description}</div> : null}
      </div>
      {dismissible ? (
        <button
          type="button"
          className={AlertStyles.close()}
          aria-label="Dismiss"
          onClick={onDismiss}
        >
          ✕
        </button>
      ) : null}
    </div>
  );
};

export default Alert;
