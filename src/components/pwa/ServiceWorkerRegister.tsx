"use client";

import { useEffect, useRef } from "react";

export default function ServiceWorkerRegister() {
  const registeredRef = useRef(false);

  useEffect(() => {
    if (registeredRef.current) return;
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
        registeredRef.current = true;

        // Listen for updates to the service worker
        reg.onupdatefound = () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.onstatechange = () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // A new update is available; let clients decide to reload
              if (typeof window !== "undefined") {
                const event = new CustomEvent("pwa:update-available");
                window.dispatchEvent(event);
              }
            }
          };
        };
      } catch (err) {
        console.error("SW registration failed:", err);
      }
    };

    // Register after page load for reliable activation
    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }
  }, []);

  return null;
}