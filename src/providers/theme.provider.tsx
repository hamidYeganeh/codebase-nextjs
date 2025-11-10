"use client";

// libs
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { useMemo, useCallback } from "react";
// configs
import { LOCAL_STORAGE_KEYS } from "@/configs/storage.config";
import {
  DEFAULT_THEME,
  DEFAULT_THEME_MODE,
  THEME_ATTRIBUTE,
  THEME_MODES,
  THEMES,
} from "@/configs/theme.config";
// types
import type { FC, PropsWithChildren } from "react";

const THEMES_LIST = Object.values(THEMES).flatMap((baseTheme) => [
  `${baseTheme.toLowerCase()}-${THEME_MODES.LIGHT.toLowerCase()}`,
  `${baseTheme.toLowerCase()}-${THEME_MODES.DARK.toLowerCase()}`,
]);

const getFullThemeName = (
  themeKey: keyof typeof THEMES,
  modeKey: keyof typeof THEME_MODES
) => {
  const baseThemeValue = THEMES[themeKey]?.toLowerCase();
  const modeValue = THEME_MODES[modeKey]?.toLowerCase();
  return `${baseThemeValue}-${modeValue}`;
};

const getThemeKeyFromValue = (themeValue: string) =>
  (Object.entries(THEMES)
    .find(([, value]) => value.toLowerCase() === themeValue)
    ?.at(0) as keyof typeof THEMES | undefined) ?? DEFAULT_THEME;

const getModeKeyFromValue = (modeValue: string) =>
  (Object.entries(THEME_MODES)
    .find(([, value]) => value.toLowerCase() === modeValue)
    ?.at(0) as keyof typeof THEME_MODES | undefined) ?? DEFAULT_THEME_MODE;

interface IAppTheme {
  theme: keyof typeof THEMES;
  setTheme: (theme: IAppTheme["theme"]) => void;
  mode: keyof typeof THEME_MODES;
  setMode: (mode: IAppTheme["mode"]) => void;
  resolvedTheme?: string;
  themes: (keyof typeof THEMES)[];
}

export const useAppTheme = (): IAppTheme => {
  const { setTheme: setNextTheme, resolvedTheme: nextResolvedTheme } =
    useTheme();

  if (typeof nextResolvedTheme === "undefined") {
    return {
      theme: DEFAULT_THEME,
      setTheme: () => {},
      mode: DEFAULT_THEME_MODE,
      setMode: () => {},
      resolvedTheme: undefined,
      themes: Object.keys(THEMES) as (keyof typeof THEMES)[],
    };
  }

  const [themeValue, modeValue] = nextResolvedTheme.split("-");
  const themeKey = getThemeKeyFromValue(themeValue);
  const modeKey = getModeKeyFromValue(modeValue);

  const handleSetTheme = useCallback(
    (newThemeKey: keyof typeof THEMES) => {
      const newFullTheme = getFullThemeName(newThemeKey, modeKey);
      setNextTheme(newFullTheme);
    },
    [modeKey, setNextTheme]
  );

  const handleSetMode = useCallback(
    (newModeKey: keyof typeof THEME_MODES) => {
      const newFullTheme = getFullThemeName(themeKey, newModeKey);
      setNextTheme(newFullTheme);
    },
    [themeKey, setNextTheme]
  );

  return useMemo(
    () => ({
      theme: themeKey,
      setTheme: handleSetTheme,
      mode: modeKey,
      setMode: handleSetMode,
      resolvedTheme: nextResolvedTheme,
      themes: Object.keys(THEMES) as (keyof typeof THEMES)[],
    }),
    [
      themeKey,
      modeKey,
      handleSetTheme,
      handleSetMode,
      nextResolvedTheme,
      THEMES,
    ]
  );
};

interface ThemeProviderProps extends PropsWithChildren {}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const defaultFullTheme = getFullThemeName(DEFAULT_THEME, DEFAULT_THEME_MODE);

  return (
    <NextThemeProvider
      storageKey={LOCAL_STORAGE_KEYS.THEME}
      defaultTheme={defaultFullTheme}
      attribute={THEME_ATTRIBUTE}
      themes={THEMES_LIST}
      enableSystem={false}
    >
      {children}
    </NextThemeProvider>
  );
};
