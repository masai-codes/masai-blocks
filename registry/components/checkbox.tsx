"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckboxType = "default" | "default-with-label";
type CheckboxSize = "regular" | "large";

export type CheckboxProps = {
  type?: CheckboxType;
  size?: CheckboxSize;
  isSelected?: boolean;
  disabled?: boolean;
  label?: string;
  onSelect?: (selected: boolean) => void;
  className?: string;
};

const checkboxSizeClasses: Record<CheckboxSize, { root: string; icon: string }> = {
  regular: { root: "h-5 w-5 rounded-md", icon: "h-3 w-3" },
  large: { root: "h-6 w-6 rounded-md", icon: "h-3.5 w-3.5" },
};

export function Checkbox({
  type = "default",
  size = "regular",
  isSelected = false,
  disabled = false,
  label = "Option",
  onSelect,
  className,
}: CheckboxProps) {
  const { root, icon } = checkboxSizeClasses[size];

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className,
      )}
    >
      <CheckboxPrimitive.Root
        checked={isSelected}
        onCheckedChange={(next) => onSelect?.(next === true)}
        disabled={disabled}
        className={cn(
          "flex items-center justify-center border border-[#6962AC] bg-white text-white outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary-400 data-[state=checked]:bg-[#6962AC] data-[state=checked]:border-[#6962AC] disabled:data-[state=checked]:bg-primary-300",
          root,
        )}
      >
        <CheckboxPrimitive.Indicator>
          <Check className={icon} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {type === "default-with-label" ? (
        <span className="type-b2-regular text-gray-900">{label}</span>
      ) : null}
    </label>
  );
}

