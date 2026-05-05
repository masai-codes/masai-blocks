"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

type RadioSize = "regular" | "large";

export type RadioOption = {
  value: string;
  label?: string;
  description?: string;
  disabled?: boolean;
};

export type RadioGroupProps = {
  size?: RadioSize;
  value: string;
  onValueChange: (value: string) => void;
  options: RadioOption[];
  className?: string;
};

const radioSizeClasses: Record<RadioSize, { root: string; dot: string }> = {
  regular: { root: "h-5 w-5", dot: "h-2.5 w-2.5" },
  large: { root: "h-6 w-6", dot: "h-3 w-3" },
};

/**
 * Grouped radios built on Radix.
 * Installing this component also installs the standalone radio button file.
 */
export function RadioGroup({
  size = "regular",
  value,
  onValueChange,
  options,
  className,
}: RadioGroupProps) {
  const { root, dot } = radioSizeClasses[size];
  const labelClassName = size === "large" ? "type-b1-regular text-gray-900" : "type-b2-regular text-gray-900";

  return (
    <RadioGroupPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      className={cn("flex flex-col gap-3", className)}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "inline-flex items-start gap-2",
            option.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
          )}
        >
          <RadioGroupPrimitive.Item
            value={option.value}
            disabled={option.disabled}
            className={cn(
              "rounded-full border border-[#6962AC] bg-white outline-none focus-visible:ring-2 focus-visible:ring-primary-400",
              root,
            )}
          >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
              <span className={cn("rounded-full bg-[#6962AC]", dot)} />
            </RadioGroupPrimitive.Indicator>
          </RadioGroupPrimitive.Item>
          {option.label || option.description ? (
            <span className="flex flex-col">
              {option.label ? <span className={labelClassName}>{option.label}</span> : null}
              {option.description ? <span className="type-caption text-gray-700">{option.description}</span> : null}
            </span>
          ) : null}
        </label>
      ))}
    </RadioGroupPrimitive.Root>
  );
}

