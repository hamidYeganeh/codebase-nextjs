// providers
import { I18nProvider } from "@/providers/i18n.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import { QueryProvider } from "@/providers/query.provider";
import ServiceWorkerRegister from "@/components/pwa/ServiceWorkerRegister";
// types
import type { FC, PropsWithChildren } from "react";

interface ProvidersProps extends PropsWithChildren {}

export const Providers: FC<ProvidersProps> = (props) => {
  const { children } = props;
  return (
    <>
      <QueryProvider>
        <I18nProvider>
          <ThemeProvider>
            <ServiceWorkerRegister />
            {children}
          </ThemeProvider>
        </I18nProvider>
      </QueryProvider>
    </>
  );
};
