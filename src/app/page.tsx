"use client";

import { Button } from "@/ui/Button";
import { useAppTheme } from "@/providers/theme.provider";
import { List, ListItem } from "@/components/ui/List";
import { useTranslations } from "next-intl";

export default function Home() {
  const { setMode, setTheme, mode, theme } = useAppTheme();
  const t = useTranslations("HomePage");

  return (
    <main className="min-h-screen w-full py-10 px-4 sm:px-8 space-y-10 dark:bg-primary-900 bg-primary-200">
      <h1 suppressHydrationWarning>{`${mode}, ${theme}`}</h1>
      <List size={"xl"} variant={"light"} color="success" radius={"md"}>
        <ListItem color={"warning"} size={"xs"} variant={"ghost"}>
          {t("title")}
        </ListItem>
        <ListItem>How Are You</ListItem>
      </List>

      <div>
        <Button
          color={"warning"}
          onClick={() => {
            setMode("LIGHT");
          }}
        >
          Light
        </Button>
        <Button
          color={"success"}
          onClick={() => {
            setMode("DARK");
          }}
        >
          Dark
        </Button>
      </div>
      <div className="bg-red-500">
        <Button
          onClick={() => {
            setTheme("SHIRAZ");
          }}
        >
          Shiraz
        </Button>
        <Button
          onClick={() => {
            setTheme("BLUEBERRY");
          }}
        >
          BLUEBERRY
        </Button>
        <Button
          onClick={() => {
            setTheme("WATERCOURSE");
          }}
        >
          WATERCOURSE
        </Button>
      </div>
    </main>
  );
}
