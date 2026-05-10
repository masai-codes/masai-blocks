"use client";

import * as React from "react";
import { MasaiRadioButton } from "@/registry/components/masai-radio-button";
import { MasaiRadioGroup } from "@/registry/components/masai-radio-group";

export function RadioPlayground() {
  const [selected, setSelected] = React.useState("option-1");
  const [gridSelected, setGridSelected] = React.useState("g-1");

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Masai Radio Button</h3>
        <div className="flex flex-wrap gap-4">
          <MasaiRadioButton size="regular" isSelected />
          <MasaiRadioButton size="large" isSelected={false} />
          <MasaiRadioButton size="regular" isSelected label="Regular label" description="Helper text" />
          <MasaiRadioButton size="large" isSelected={false} label="Large label" description="Helper text" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Masai Radio Group</h3>
        <MasaiRadioGroup
          size="regular"
          value={selected}
          onValueChange={setSelected}
          options={[
            { value: "option-1", label: "Option 1", description: "First option description" },
            { value: "option-2", label: "Option 2", description: "Second option description" },
            { value: "option-3", label: "Option 3", description: "Third option description" },
          ]}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Radio layout: grid</h3>
        <MasaiRadioGroup
          aria-label="Choose grid demo option"
          className="grid max-w-lg grid-cols-2 gap-3"
          size="regular"
          value={gridSelected}
          onValueChange={setGridSelected}
          options={[
            { value: "g-1", label: "One" },
            { value: "g-2", label: "Two" },
            { value: "g-3", label: "Three" },
            { value: "g-4", label: "Four" },
          ]}
        />
      </div>
    </div>
  );
}
