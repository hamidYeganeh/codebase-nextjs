import { Messages } from "next-intl";

type MessageKeys = keyof IntlMessages;
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]:
        | `${K & string}`
        | `${K & string}.${NestedKeyOf<T[K]> & string}`;
    }[keyof T]
  : never;

declare interface IntlMessages {
  HomePage: {
    title: string;
    subtitle: string;
    name: string;
  };
}

declare module "next-intl" {
  export function useTranslations<
    T extends MessageKeys | NestedKeyOf<IntlMessages> | undefined = undefined
  >(
    namespace?: T
  ): T extends undefined
    ? (key: NestedKeyOf<IntlMessages>) => string
    : T extends MessageKeys
    ? (key: NestedKeyOf<IntlMessages[T]>) => string
    : (key: T) => string;
}
