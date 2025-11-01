"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/ui/Button";
import { COOKIE_KEYS } from "@/configs/storage.config";

export function LocaleSwitcher() {
  const router = useRouter();

  const setLocale = (locale: string) => {
    document.cookie = `${COOKIE_KEYS.LOCALE}=${locale}; path=/`;
    router.refresh();
  };

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
