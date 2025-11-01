// providers
import { I18nProvider } from "@/providers/i18n.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import { QueryProvider } from "@/providers/query.provider";
// types
import type { FC, PropsWithChildren } from "react";
// libs
import { getLocale, getMessages } from "next-intl/server";
import ServiceWorkerRegister from "@/components/pwa/ServiceWorkerRegister";

interface ProvidersProps extends PropsWithChildren {}

export const Providers: FC<ProvidersProps> = async (props) => {
  const { children } = props;

  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <>
      <QueryProvider>
        <I18nProvider messages={messages} locale={locale}>
          <ThemeProvider>
            <ServiceWorkerRegister />
            {children}
          </ThemeProvider>
        </I18nProvider>
      </QueryProvider>
    </>
  );
};
