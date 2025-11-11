import { cn } from '@/utils/cn';

type VariantsDef = Record<string, Record<string, string>>;
type DefaultVariants<V extends VariantsDef> = Partial<{ [K in keyof V]: keyof V[K] }>;
type CompoundVariant<V extends VariantsDef> = Partial<{ [K in keyof V]: keyof V[K] }> & {
  className?: string;
  class?: string;
};

export function cva<
  V extends VariantsDef = VariantsDef,
  D extends DefaultVariants<V> = DefaultVariants<V>,
>(
  base: string,
  options?: {
    variants?: V;
    defaultVariants?: D;
    compoundVariants?: CompoundVariant<V>[];
  }
) {
  // Accept boolean/number values to mirror cva library behavior
  type Props = Partial<{ [K in keyof V]: keyof V[K] | boolean | number }> & {
    className?: string;
  };

  const fn = (props: Props = {} as Props) => {
    const classes: string[] = [base];
    const variants = options?.variants || ({} as V);
    const defaults = options?.defaultVariants || ({} as D);

    // Apply selected or default variant classes
    for (const key in variants) {
      const k = key as keyof V;
      const vDef = variants[k] as Record<string, string>;
      const pVal = props[k] as keyof V[typeof k] | boolean | number | undefined;
      const dVal = (defaults as Partial<Record<keyof V, unknown>>)[k] as
        | keyof V[typeof k]
        | boolean
        | number
        | undefined;
      const effective = pVal ?? dVal;
      const valueKey = effective != null ? String(effective) : undefined;
      if (valueKey && vDef && vDef[valueKey]) {
        classes.push(vDef[valueKey]);
      }
    }

    // Apply compound variants when all conditions match
    if (options?.compoundVariants) {
      for (const cv of options.compoundVariants) {
        const { class: cvClassLegacy, className: cvClassName, ...rest } = cv as CompoundVariant<V>;
        const conds: Partial<Record<keyof V, unknown>> = rest;
        const cvClass = cvClassName ?? cvClassLegacy;
        const keys = Object.keys(conds) as Array<keyof V>;
        const matches = keys.every((k) => {
          const condVal = conds[k];
          const pVal = props[k] as unknown;
          const dVal = (defaults as Partial<Record<keyof V, unknown>>)[k];
          const effective = pVal ?? dVal;
          return String(effective) === String(condVal);
        });
        if (matches && cvClass) classes.push(cvClass);
      }
    }

    // Append user className
    if (props.className) classes.push(props.className);

    return cn(...classes);
  };

  return fn;
}

export type VariantProps<T> = T extends (props: infer P) => unknown ? P : never;
