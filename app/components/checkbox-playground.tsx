"use client";

import * as React from "react";
import { Checkbox } from "@/registry/components/checkbox";
import { CheckboxGroup } from "@/registry/components/checkbox-group";

export function CheckboxPlayground() {
  const [selectedValues, setSelectedValues] = React.useState<string[]>(["option-1"]);

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Checkbox</h3>
        <div className="flex flex-wrap gap-4">
          <Checkbox type="default" size="regular" isSelected />
          <Checkbox type="default" size="large" isSelected={false} />
          <Checkbox type="default-with-label" size="regular" isSelected label="Regular label" />
          <Checkbox type="default-with-label" size="large" isSelected={false} label="Large label" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Checkbox Group</h3>
        <CheckboxGroup
          type="default-with-label"
          size="regular"
          values={selectedValues}
          onValueChange={setSelectedValues}
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

