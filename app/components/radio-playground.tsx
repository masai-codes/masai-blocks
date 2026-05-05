"use client";

import * as React from "react";
import { RadioButton } from "@/registry/components/radio-button";
import { RadioGroup } from "@/registry/components/radio-group";

export function RadioPlayground() {
  const [selected, setSelected] = React.useState("option-1");

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Radio Button</h3>
        <div className="flex flex-wrap gap-4">
          <RadioButton size="regular" isSelected />
          <RadioButton size="large" isSelected={false} />
          <RadioButton size="regular" isSelected label="Regular label" description="Helper text" />
          <RadioButton size="large" isSelected={false} label="Large label" description="Helper text" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Radio Group</h3>
        <RadioGroup
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
    </div>
  );
}

