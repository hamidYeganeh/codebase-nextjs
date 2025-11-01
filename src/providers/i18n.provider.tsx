// libs
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
// types
import type { PropsWithChildren } from "react";

interface I18nProviderProps extends PropsWithChildren {}

export const I18nProvider = async (props: I18nProviderProps) => {
  const { children } = props;
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
};
