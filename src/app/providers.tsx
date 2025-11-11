// providers
import { I18nProvider } from '@/providers/i18n.provider';
import { ThemeProvider } from '@/providers/theme.provider';
import { QueryProvider } from '@/providers/query.provider';
// types
import type { FC, PropsWithChildren } from 'react';
// libs
import { getLocale, getMessages, getTimeZone } from 'next-intl/server';
// components
import { ServiceWorkerRegister } from '@/components/shared/Pwa/ServiceWorkerRegister';

type ProvidersProps = PropsWithChildren;

export const Providers: FC<ProvidersProps> = async (props) => {
  const { children } = props;

  const locale = await getLocale();
  const messages = await getMessages();
  const timeZone = await getTimeZone();

  return (
    <>
      <QueryProvider>
        <I18nProvider messages={messages} locale={locale} timeZone={timeZone}>
          <ThemeProvider>
            <ServiceWorkerRegister />
            {children}
          </ThemeProvider>
        </I18nProvider>
      </QueryProvider>
    </>
  );
};
