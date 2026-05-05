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
          <RadioButton type="default" size="regular" isSelected />
          <RadioButton type="default" size="large" isSelected={false} />
          <RadioButton type="default-with-label" size="regular" isSelected label="Regular label" />
          <RadioButton type="default-with-label" size="large" isSelected={false} label="Large label" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Radio Group</h3>
        <RadioGroup
          type="default-with-label"
          size="regular"
          value={selected}
          onValueChange={setSelected}
          options={[
            { value: "option-1", label: "Option 1" },
            { value: "option-2", label: "Option 2" },
            { value: "option-3", label: "Option 3" },
          ]}
        />
      </div>
    </div>
  );
}

