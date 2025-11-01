"use client";

// libs
import { NextIntlClientProvider, Messages } from "next-intl";
import { useRouter } from "next/navigation";
import { getStrictContext } from "@/lib/get-strict-context";
// configs
import { LOCALES } from "@/configs/i18n.config";
import { COOKIE_KEYS } from "@/configs/storage.config";
// types
import type { PropsWithChildren } from "react";

interface I18nProviderProps extends PropsWithChildren {
  messages: Messages;
  locale: keyof typeof LOCALES;
}
interface II18nContext extends Pick<I18nProviderProps, "locale"> {
  setLocale: (locale: II18nContext["locale"]) => void;
}

export const [I18nContextProvider, useI18nContext] =
  getStrictContext<II18nContext>("I18nProvider");

export const I18nProvider = (props: I18nProviderProps) => {
  const { children, messages, locale } = props;

  const router = useRouter();

  function handleSetLocale(locale: II18nContext["locale"]) {
    document.cookie = `${COOKIE_KEYS.LOCALE}=${locale}; path=/`;
    router.refresh();
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <I18nContextProvider value={{ locale, setLocale: handleSetLocale }}>
        {children}
      </I18nContextProvider>
    </NextIntlClientProvider>
  );
};
