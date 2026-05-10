"use client";

import * as React from "react";
import { MasaiCheckbox } from "@/registry/components/masai-checkbox";
import { MasaiCheckboxGroup } from "@/registry/components/masai-checkbox-group";

export function CheckboxPlayground() {
  const [selectedValues, setSelectedValues] = React.useState<string[]>(["option-1"]);

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Masai Checkbox</h3>
        <div className="flex flex-wrap gap-4">
          <MasaiCheckbox size="regular" isSelected />
          <MasaiCheckbox size="large" isSelected={false} />
          <MasaiCheckbox size="regular" isSelected label="Regular label" description="Helper text" />
          <MasaiCheckbox size="large" isSelected={false} label="Large label" description="Helper text" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Masai Checkbox Group</h3>
        <MasaiCheckboxGroup
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

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Layout: horizontal + grid (`className`)</h3>
        <p className="text-xs text-muted-foreground">
          Pass <code className="rounded bg-muted px-1 py-px">orientation=&quot;horizontal&quot;</code> or set display
          on <code className="rounded bg-muted px-1 py-px">className</code> (
          <code className="rounded bg-muted px-1 py-px">tailwind-merge</code> drops the default flex stack when you
          use <code className="rounded bg-muted px-1 py-px">grid</code>
          ).
        </p>
        <MasaiCheckboxGroup
          aria-label="Grid example"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          size="regular"
          values={selectedValues}
          onValueChange={setSelectedValues}
          options={[
            { value: "grid-a", label: "Grid A" },
            { value: "grid-b", label: "Grid B" },
            { value: "grid-c", label: "Grid C" },
            { value: "grid-d", label: "Grid D" },
          ]}
        />
      </div>
    </div>
  );
}
