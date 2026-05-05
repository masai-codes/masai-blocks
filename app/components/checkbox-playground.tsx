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
          <Checkbox size="regular" isSelected />
          <Checkbox size="large" isSelected={false} />
          <Checkbox size="regular" isSelected label="Regular label" description="Helper text" />
          <Checkbox size="large" isSelected={false} label="Large label" description="Helper text" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Checkbox Group</h3>
        <CheckboxGroup
          size="regular"
          values={selectedValues}
          onValueChange={setSelectedValues}
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

