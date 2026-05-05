"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

type RadioSize = "regular" | "large";

export type RadioButtonProps = {
  size?: RadioSize;
  isSelected?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  onSelect?: (selected: boolean) => void;
  className?: string;
};

const radioSizeClasses: Record<RadioSize, { root: string; dot: string }> = {
  regular: { root: "h-5 w-5", dot: "h-2.5 w-2.5" },
  large: { root: "h-6 w-6", dot: "h-3 w-3" },
};

/**
 * Single radio button wrapper built on Radix RadioGroup.
 * Useful for standalone previews and custom layouts.
 */
export function RadioButton({
  size = "regular",
  isSelected = false,
  disabled = false,
  label,
  description,
  onSelect,
  className,
}: RadioButtonProps) {
  const value = isSelected ? "selected" : "unselected";
  const { root, dot } = radioSizeClasses[size];
  const labelClassName = size === "large" ? "type-b1-regular text-gray-900" : "type-b2-regular text-gray-900";

  return (
    <RadioGroupPrimitive.Root
      value={value}
      onValueChange={(next) => onSelect?.(next === "selected")}
      disabled={disabled}
      className={cn("inline-flex items-start", className)}
    >
      <label className="inline-flex cursor-pointer items-start gap-2">
        <RadioGroupPrimitive.Item
          value="selected"
          className={cn(
            "rounded-full border border-[#6962AC] bg-white outline-none focus-visible:ring-2 focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-60",
            root,
          )}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <span className={cn("rounded-full bg-[#6962AC]", dot)} />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        {label || description ? (
          <span className="flex flex-col">
            {label ? <span className={labelClassName}>{label}</span> : null}
            {description ? <span className="type-caption text-gray-700">{description}</span> : null}
          </span>
        ) : null}
      </label>
    </RadioGroupPrimitive.Root>
  );
}

