// libs
import { ThemeProvider as NextThemeProvider } from "next-themes";
// configs
import { LOCAL_STORAGE_KEYS } from "@/configs/storage.config";
import { THEME_ATTRIBUTE, THEMES } from "@/configs/theme.config";
// types
import type { FC, PropsWithChildren } from "react";

interface ThemeProviderProps extends PropsWithChildren {}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const { children } = props;

  return (
    <NextThemeProvider
      storageKey={LOCAL_STORAGE_KEYS.THEME}
      defaultTheme={THEMES.SHIRAZ}
      attribute={THEME_ATTRIBUTE}
      themes={Object.values(THEMES)}
    >
      {children}
    </NextThemeProvider>
  );
};
