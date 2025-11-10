"use client";

// libs
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  promt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const usePwaInstall = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [promptEvent, setPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    function handler(e: Event) {
      e.preventDefault();
      setPromptEvent(e as BeforeInstallPromptEvent);
      setIsSupported(true);
    }
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function onDismiss() {
    setIsDismissed(true);
  }
  async function onInstall() {
    if (promptEvent) {
      await promptEvent.promt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === "accepted") {
        setPromptEvent(null);
        setIsSupported(false);
      } else {
        onDismiss();
      }
    }
  }

  return {
    isSupported,
    isDismissed,
    onDismiss,
    onInstall,
  };
};
