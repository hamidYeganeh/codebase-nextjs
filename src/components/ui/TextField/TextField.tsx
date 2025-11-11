'use client';

import { FC, useId, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { TextFieldProps } from './TextFieldTypes.d';
import { TextFieldStyles } from './TextFieldStyles';

const TextField: FC<TextFieldProps> = (props) => {
  const {
    // native input props
    id,
    name,
    value,
    defaultValue,
    onChange,
    type = 'text',
    placeholder,
    autoComplete,
    readOnly,
    disabled,
    required,
    // variants
    variant,
    color,
    size,
    margin,
    fullWidth,
    focused,
    // features
    label,
    helperText,
    error,
    multiline,
    rows,
    minRows,
    maxRows,
    select,
    children,
    startAdornment,
    endAdornment,
    inputRef,
    inputClassName,
    labelProps,
    helperTextProps,
    containerClassName,
    className,
    ...rest
  } = props;

  const generatedId = useId();
  const inputId = id ?? `tf-${generatedId}`;
  const helperId = `${inputId}-helper`;

  const internalInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);

  useImperativeHandle(inputRef, () => internalInputRef.current!);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const hasInitialValue = useMemo(
    () =>
      (value !== undefined && value !== null && `${value}`.length > 0) ||
      (defaultValue !== undefined && defaultValue !== null && `${defaultValue}`.length > 0),
    [value, defaultValue]
  );

  const [hasValue, setHasValue] = useState<boolean>(hasInitialValue);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    if (onChange) onChange(e as React.ChangeEvent<HTMLInputElement>);
    const v = e?.target?.value;
    setHasValue(v !== undefined && v !== null && `${v}`.length > 0);
  }

  const showLabel = !!label;
  const effectiveFocused = !!focused || isFocused;
  const hasStart = !!startAdornment;
  const hasEnd = !!endAdornment;

  // Placeholder handling: make label float usable when no placeholder provided
  const effectivePlaceholder = showLabel && !placeholder ? ' ' : placeholder;

  const containerClasses = TextFieldStyles.container({
    variant,
    color,
    // size,
    size,
    margin,
    className: cn(containerClassName, className),
  });

  const inputSize: 'small' | 'medium' | 'large' | undefined = useMemo(() => {
    switch (size) {
      case 'xs':
      case 'sm':
        return 'small';
      case 'md':
        return 'medium';
      case 'lg':
      case 'xl':
        return 'large';
      default:
        return undefined;
    }
  }, [size]);

  const inputClasses = cn(TextFieldStyles.input({ variant, size: inputSize }), inputClassName);

  const labelClasses = TextFieldStyles.label({
    variant,
    required,
    error,
    size: inputSize,
  });

  const helperClasses = TextFieldStyles.helper({ error, margin });

  const commonDataAttrs = {
    'data-error': error ? 'true' : undefined,
    'data-focused': effectiveFocused ? 'true' : undefined,
    'data-has-value': hasValue ? 'true' : undefined,
    'data-disabled': disabled ? 'true' : undefined,
  } as const;

  return (
    <div
      className={containerClasses}
      data-fullwidth={fullWidth ? 'true' : undefined}
      {...commonDataAttrs}
    >
      <div className={cn('relative w-full')}>
        {showLabel && (
          <label htmlFor={inputId} className={labelClasses} {...labelProps}>
            {label}
          </label>
        )}

        {/* Input wrapper to accommodate adornments */}
        <div className={cn('relative w-full')}>
          {hasStart && (
            <span
              className={cn(
                'absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'
                // size === "large"
                //   ? "text-lg"
                //   : size === "small"
                //   ? "text-sm"
                //   : "text-base"
              )}
            >
              {startAdornment}
            </span>
          )}

          {hasEnd && (
            <span
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2 text-gray-500'
                // size === "large"
                //   ? "text-lg"
                //   : size === "small"
                //   ? "text-sm"
                //   : "text-base"
              )}
            >
              {endAdornment}
            </span>
          )}

          {multiline ? (
            <textarea
              id={inputId}
              name={name}
              ref={internalInputRef as React.Ref<HTMLTextAreaElement>}
              className={inputClasses}
              placeholder={effectivePlaceholder}
              autoComplete={autoComplete}
              readOnly={readOnly}
              disabled={disabled}
              required={required}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              aria-describedby={helperText ? helperId : undefined}
              aria-invalid={error ? true : undefined}
              aria-required={required ? true : undefined}
              rows={rows}
              {...(minRows ? { 'data-min-rows': minRows } : {})}
              {...(maxRows ? { 'data-max-rows': maxRows } : {})}
              {...commonDataAttrs}
              data-start={hasStart ? 'true' : undefined}
              data-end={hasEnd ? 'true' : undefined}
            />
          ) : select ? (
            <select
              id={inputId}
              name={name}
              ref={internalInputRef as React.Ref<HTMLSelectElement>}
              className={inputClasses}
              disabled={disabled}
              required={required}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              aria-describedby={helperText ? helperId : undefined}
              aria-invalid={error ? true : undefined}
              aria-required={required ? true : undefined}
              {...commonDataAttrs}
              data-start={hasStart ? 'true' : undefined}
              data-end={hasEnd ? 'true' : undefined}
            >
              {children}
            </select>
          ) : (
            <input
              id={inputId}
              name={name}
              ref={internalInputRef as React.Ref<HTMLInputElement>}
              className={inputClasses}
              type={type}
              placeholder={effectivePlaceholder}
              autoComplete={autoComplete}
              readOnly={readOnly}
              disabled={disabled}
              required={required}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={value}
              defaultValue={defaultValue}
              aria-describedby={helperText ? helperId : undefined}
              aria-invalid={error ? true : undefined}
              aria-required={required ? true : undefined}
              {...rest}
              {...commonDataAttrs}
              data-start={hasStart ? 'true' : undefined}
              data-end={hasEnd ? 'true' : undefined}
            />
          )}
        </div>
      </div>

      {helperText && (
        <p id={helperId} className={helperClasses} {...helperTextProps}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default TextField;
