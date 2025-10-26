// providers
import { ThemeProvider } from "@/providers/theme.provider";
// types
import type { FC, PropsWithChildren } from "react";

interface ProvidersProps extends PropsWithChildren {}
export const Providers: FC<ProvidersProps> = (props) => {
  const { children } = props;
  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
};
