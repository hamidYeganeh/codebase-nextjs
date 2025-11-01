"use client";

import { Button } from "@/ui/Button";
import { useI18nContext } from "@/providers/i18n.provider";

export function LocaleSwitcher() {
  const { setLocale } = useI18nContext();

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button variant={"flat"} onClick={() => setLocale("en")}>
        English
      </Button>
      <Button variant={"flat"} onClick={() => setLocale("de")}>
        Deutsch
      </Button>
    </div>
  );
}
