// providers
import { I18nProvider } from "@/providers/i18n.provider";
import { ThemeProvider } from "@/providers/theme.provider";
// types
import type { FC, PropsWithChildren } from "react";

interface ProvidersProps extends PropsWithChildren {}
export const Providers: FC<ProvidersProps> = (props) => {
  const { children } = props;
  return (
    <>
      <I18nProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </I18nProvider>
    </>
  );
};
