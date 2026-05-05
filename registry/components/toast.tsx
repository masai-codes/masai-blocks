"use client";

import * as React from "react";
import { CheckCircle, Warning, WarningCircle, X } from "@phosphor-icons/react";
import { Button } from "@/registry/components/button";
import { cn } from "@/lib/utils";

type ToastType = "success" | "info" | "alert" | "generic";
type ToastDirection =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

const toastTypeStyles: Record<ToastType, string> = {
  success: "bg-white",
  info: "bg-white",
  alert: "bg-white",
  generic: "bg-white",
};

const toastIconColor: Record<Exclude<ToastType, "generic">, string> = {
  success: "text-green-600",
  info: "text-blue-600",
  alert: "text-orange-600",
};

const toastTextColorVar: Record<ToastType, string> = {
  success: "var(--color-green-500)",
  info: "var(--color-blue-500)",
  alert: "var(--color-red-500)",
  generic: "var(--color-gray-600)",
};

const toastDirectionClasses: Record<ToastDirection, string> = {
  "top-right": "fixed right-4 top-4 z-50",
  "top-left": "fixed left-4 top-4 z-50",
  "bottom-right": "fixed bottom-4 right-4 z-50",
  "bottom-left": "fixed bottom-4 left-4 z-50",
  "top-center": "fixed left-1/2 top-4 z-50 -translate-x-1/2",
  "bottom-center": "fixed bottom-4 left-1/2 z-50 -translate-x-1/2",
};

export type ToastProps = {
  type?: ToastType;
  direction?: ToastDirection;
  title: React.ReactNode;
  ctaText?: string;
  onClick?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  durationMs?: number;
  className?: string;
};

export function Toast({
  type = "generic",
  direction,
  title,
  ctaText,
  onClick,
  open,
  onOpenChange,
  durationMs = 2000,
  className,
}: ToastProps) {
  const [internalOpen, setInternalOpen] = React.useState(true);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const showCta = Boolean(ctaText);
  const iconColorClass = type === "generic" ? null : toastIconColor[type];

  const closeToast = React.useCallback(() => {
    if (!isControlled) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  React.useEffect(() => {
    if (!isOpen || durationMs <= 0) return;
    const timeoutId = window.setTimeout(() => {
      closeToast();
    }, durationMs);
    return () => window.clearTimeout(timeoutId);
  }, [closeToast, durationMs, isOpen, title, type, ctaText, direction]);

  React.useEffect(() => {
    if (!isControlled) {
      setInternalOpen(true);
    }
  }, [isControlled, title, type, ctaText, direction]);

  if (!isOpen) return null;

  return (
    <div
      role="status"
      className={cn(
        "flex w-full max-w-[448px] items-center gap-3 rounded-lg border border-gray-200 p-3 shadow-[0_1px_2px_0_rgba(0,0,0,0.08)] md:p-4",
        direction ? toastDirectionClasses[direction] : null,
        toastTypeStyles[type],
        className,
      )}
    >
      {type !== "generic" ? (
        <span className={cn("shrink-0", iconColorClass)}>
          {type === "success" ? <CheckCircle size={20} weight="fill" /> : null}
          {type === "info" ? <WarningCircle size={20} weight="fill" /> : null}
          {type === "alert" ? <Warning size={20} weight="fill" /> : null}
        </span>
      ) : null}

      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
          <p
            className="min-w-0 type-b3-md md:type-b2-md"
            style={
              {
                "--masai-text-color": toastTextColorVar[type],
              } as React.CSSProperties
            }
          >
            {title}
          </p>

          {showCta ? (
            <Button
              type="tertiary"
              size="sm"
              ctaText={ctaText}
              onClick={onClick}
              className="shrink-0 !text-primary-500 hover:!bg-primary-50 hover:!text-primary-600 type-b3-md md:type-b2-md"
            />
          ) : null}
        </div>

        <button
          type="button"
          onClick={closeToast}
          aria-label="Close toast"
          className="shrink-0 rounded-md p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          <X size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
}
