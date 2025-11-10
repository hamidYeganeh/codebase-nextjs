"use client";

// libs
import { useEffect, useState } from "react";

export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData =
    typeof window !== "undefined"
      ? window.atob(base64)
      : Buffer.from(base64, "base64").toString("binary");
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

interface PushNotificationsProps {
  VAPID_PUBLIC_KEY: string;
}

export const usePushNotifications = (props: PushNotificationsProps) => {
  const { VAPID_PUBLIC_KEY } = props;

  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsSupported("serviceWorker" in navigator && "PushManager" in window);
    setPermission(Notification.permission);
  }, []);

  async function enableNotifications() {
    try {
      setIsLoading(true);
      if (!isSupported) return;
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== "granted") return;

      const reg = await navigator.serviceWorker.ready;
      const existing = await reg.pushManager.getSubscription();
      if (existing) return; // already subscribed

      if (!VAPID_PUBLIC_KEY) {
        console.warn(
          "Missing NEXT_PUBLIC_VAPID_PUBLIC_KEY; skipping push subscription."
        );
        return;
      }
      // Convert VAPID public key to ArrayBuffer to satisfy BufferSource type
      const keyBytes = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
      const keyBuffer = keyBytes.buffer as ArrayBuffer;
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: keyBuffer,
      });

      await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });
    } catch (err) {
      console.error("Failed to enable notifications:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function disableNotifications() {
    try {
      setIsLoading(true);
      const reg = await navigator.serviceWorker.ready;
      const current = await reg.pushManager.getSubscription();
      if (current) {
        await fetch("/api/notifications/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: current.endpoint }),
        });
        await current.unsubscribe();
      }
      setPermission("default");
    } catch (err) {
      console.error("Failed to disable notifications:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isSupported,
    permission,
    isLoading,
    enableNotifications,
    disableNotifications,
  };
};
