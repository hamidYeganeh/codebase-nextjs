"use client";

import { useEffect, useState } from "react";
import { Button } from "@/ui/Button";
import { VAPID_PUBLIC_KEY, urlBase64ToUint8Array } from "@/configs/pwa.config";

export default function NotificationsToggle() {
  const [supported, setSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSupported("serviceWorker" in navigator && "PushManager" in window);
    setPermission(Notification.permission);
  }, []);

  const enableNotifications = async () => {
    try {
      setLoading(true);
      if (!supported) return;
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== "granted") return;

      const reg = await navigator.serviceWorker.ready;
      const existing = await reg.pushManager.getSubscription();
      if (existing) return; // already subscribed

      if (!VAPID_PUBLIC_KEY) {
        console.warn("Missing NEXT_PUBLIC_VAPID_PUBLIC_KEY; skipping push subscription.");
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
      setLoading(false);
    }
  };

  const disableNotifications = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  if (!supported) return null;

  return (
    <div className="flex gap-2 items-center">
      {permission !== "granted" ? (
        <Button onClick={enableNotifications} color="success" disabled={loading}>
          Enable Notifications
        </Button>
      ) : (
        <Button onClick={disableNotifications} color="warning" variant="ghost" disabled={loading}>
          Disable Notifications
        </Button>
      )}
    </div>
  );
}