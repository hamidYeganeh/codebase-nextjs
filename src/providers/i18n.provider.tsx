// libs
import { NextIntlClientProvider } from "next-intl";
import messages from "../../messages/en.json";
// types
import { FC, PropsWithChildren } from "react";

interface I18nProviderProps extends PropsWithChildren {}

export const I18nProvider: FC<I18nProviderProps> = (props) => {
  const { children } = props;

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};
