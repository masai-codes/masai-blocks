"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/registry/components/checkbox";

type CheckboxSize = "regular" | "large";

export type CheckboxOption = {
  value: string;
  label?: string;
  description?: string;
  disabled?: boolean;
};

export type CheckboxGroupProps = {
  size?: CheckboxSize;
  values: string[];
  onValueChange: (values: string[]) => void;
  options: CheckboxOption[];
  className?: string;
};

export function CheckboxGroup({
  size = "regular",
  values,
  onValueChange,
  options,
  className,
}: CheckboxGroupProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {options.map((option) => {
        const checked = values.includes(option.value);
        return (
          <Checkbox
            key={option.value}
            size={size}
            isSelected={checked}
            disabled={option.disabled}
            label={option.label ?? option.value}
            description={option.description}
            onSelect={(shouldCheck) => {
              if (shouldCheck) {
                onValueChange(Array.from(new Set([...values, option.value])));
              } else {
                onValueChange(values.filter((v) => v !== option.value));
              }
            }}
          />
        );
      })}
    </div>
  );
}

