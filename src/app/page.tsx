"use client";

import { Button } from "@/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import { useAppTheme } from "@/providers/theme.provider";
import { List, ListItem } from "@/components/ui/List";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { useState } from "react";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownTrigger,
  DropdownCheckboxItem,
  DropdownCheckboxItemProps,
  DropdownContentProps,
  DropdownGroup,
  DropdownGroupProps,
  DropdownItemIndicatorProps,
  DropdownItemProps,
  DropdownLabelProps,
  DropdownMenuContextType,
  DropdownMenuSubContextType,
  DropdownProps,
  DropdownRadioGroup,
  DropdownRadioGroupProps,
  DropdownRadioItem,
  DropdownRadioItemProps,
  DropdownSeparator,
  DropdownSeparatorProps,
  DropdownShortcut,
  DropdownShortcutProps,
  DropdownSub,
  DropdownSubContent,
  DropdownSubContentProps,
  DropdownSubProps,
  DropdownSubTrigger,
  DropdownSubTriggerProps,
  DropdownTriggerProps,
} from "@/components/ui/Dropdown";
import { useI18n } from "@/hooks/useI18n";
import { useTheme } from "@/hooks/useTheme";

export default function Home() {
  const { theme, setTheme, themes } = useTheme();
  const t = useTranslations("HomePage");
  const { setLocale, locales } = useI18n();

  console.log(themes);

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full max-w-md mx-auto px-2">
      <h1 className="text-white">{t("title")}</h1>

      <p>Locale</p>
      <List variant={"light"}>
        {locales.map((locale) => (
          <ListItem key={locale} onClick={() => setLocale(locale)}>
            {locale}
          </ListItem>
        ))}
      </List>

      <p>Theme</p>
      <List variant={"light"}>
        {themes.map((t) => (
          <ListItem key={t} onClick={() => setTheme(t)}>
            {t}
          </ListItem>
        ))}
      </List>

      <List size={"xs"} variant={"contained"} disabledRipple>
        {themes.map((t) => (
          <ListItem key={t} color={t === "BLUEBERRY" ? "error" : undefined}>
            {t}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
