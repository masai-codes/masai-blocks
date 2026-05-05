"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

type TooltipDirection = "top" | "bottom" | "left" | "right";

export type TooltipProps = {
  direction?: TooltipDirection;
  withCta?: boolean;
  content: React.ReactNode;
  ctaText?: string;
  onCtaClick?: () => void;
  trigger: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

export function Tooltip({
  direction = "top",
  withCta = false,
  content,
  ctaText = "Learn more",
  onCtaClick,
  trigger,
  open,
  defaultOpen,
  onOpenChange,
  className,
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={120}>
      <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger asChild>{trigger}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={direction}
            sideOffset={10}
            className={cn(
              "z-50 max-w-72 rounded-lg border border-primary-700 bg-primary-800 px-3 py-2.5 text-white shadow-[0_6px_16px_rgba(24,24,27,0.28)]",
              "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0",
              "data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1",
              "data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
              className,
            )}
          >
            <div className="flex flex-col gap-1.5">
              <div className="type-b3-regular text-white">{content}</div>
              {withCta ? (
                <button
                  type="button"
                  onClick={onCtaClick}
                  className="w-fit p-0 type-b3-md text-primary-100 underline underline-offset-2 hover:text-white"
                >
                  {ctaText}
                </button>
              ) : null}
            </div>
            <TooltipPrimitive.Arrow className="fill-primary-800" width={14} height={7} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

