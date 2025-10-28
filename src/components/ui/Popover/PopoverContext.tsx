"use client";

// libs
import { getStrictContext } from "@/lib/get-strict-context";
// types
import type { IPopoverContext } from "./PopoverTypes";

export const [PopoverProvider, usePopoverContext] =
  getStrictContext<IPopoverContext>("PopoverProvider");
