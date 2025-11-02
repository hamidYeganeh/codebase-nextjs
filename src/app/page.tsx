"use client";

import { Button } from "@/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import { useAppTheme } from "@/providers/theme.provider";
import { List, ListItem } from "@/components/ui/List";
import Link from "next/link";
import { LocaleSwitcher } from "@/components/shared/LocaleSwitcher";
import { useTranslations } from "next-intl";
import PWAInstallPrompt from "@/components/pwa/PWAInstallPrompt";
import NotificationsToggle from "@/components/pwa/NotificationsToggle";
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

export default function Home() {
  const { setMode, setTheme, mode, theme } = useAppTheme();
  const t = useTranslations("HomePage");

  return (
    <main className="min-h-screen w-full py-10 px-4 sm:px-8 space-y-10 dark:bg-primary-900 bg-primary-200">
      <LocaleSwitcher />
      <PWAInstallPrompt />
      <NotificationsToggle />

      <Dropdown>
        <DropdownTrigger asChild>
          <Button variant={"flat"}>Open Dropdown</Button>
        </DropdownTrigger>
        <DropdownContent
          color="primary"
          variant={"contained"}
          className="p-1 w-100 "
          align="start"
        >
          <DropdownLabel>Label</DropdownLabel>
          <DropdownSub>
            <DropdownSubTrigger>File</DropdownSubTrigger>
            <DropdownSubContent variant={"contained"} color="primary">
              <DropdownItem>New</DropdownItem>
              <DropdownItem>Open</DropdownItem>
              <DropdownItem>Save</DropdownItem>
            </DropdownSubContent>
          </DropdownSub>
          <DropdownItem>Edit</DropdownItem>
          <DropdownItem>Text</DropdownItem>
          <DropdownItem>Image</DropdownItem>
        </DropdownContent>
      </Dropdown>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"flat"}>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 w-100" align="start" shadow={"2xl"}>
          <p>Popover Content</p>
        </PopoverContent>
      </Popover>
      <h1 suppressHydrationWarning>{`${mode}, ${theme}`}</h1>
      <List size={"xl"} variant={"light"} color="success" radius={"md"}>
        <ListItem color={"warning"} size={"xs"} variant={"ghost"}>
          {t("description")}
        </ListItem>
        <ListItem>How Are You</ListItem>
      </List>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">State Management Example</h2>
        <div className="mt-4">
          <a
            href="/server-demo"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            View Server-Side API Demo
          </a>
        </div>
      </div>

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
      <Button as={Link} href="/users">
        REDIRECT USERS
      </Button>
    </main>
  );
}
