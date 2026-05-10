"use client";

import * as React from "react";

import { MasaiDropdownCheckboxFilter } from "@/registry/components/masai-dropdown-checkbox-filter";

const MODULE_OPTIONS = [
  { value: "js", label: "JavaScript" },
  { value: "ts", label: "TypeScript" },
  { value: "react", label: "React" },
  { value: "node", label: "Node.js" },
] as const;

export function MasaiDropdownCheckboxFilterPlayground() {
  const [selected, setSelected] = React.useState<string[]>(["react"]);

  return (
    <div className="space-y-6 rounded-lg border p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Controlled selection</h3>
        <p className="text-xs text-muted-foreground">
          Parent owns <code>value</code>; updates arrive through <code>onValueChange</code>. Menu stays
          open while toggling (multi-select pattern).
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <MasaiDropdownCheckboxFilter
            triggerLabel="Module"
            options={[...MODULE_OPTIONS]}
            value={selected}
            onValueChange={setSelected}
          />
        </div>
        <output className="block rounded-md bg-muted px-2 py-1.5 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">selected:</span>{" "}
          {selected.length ? selected.join(", ") : "(none)"}
        </output>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Custom trigger</h3>
        <p className="text-xs text-muted-foreground">
          Pass any single element via <code>children</code> (Radix <code>asChild</code>).
        </p>
        <MasaiDropdownCheckboxFilter options={[...MODULE_OPTIONS]} value={selected} onValueChange={setSelected}>
          <button
            type="button"
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 type-b2-md text-gray-900 outline-none transition-colors hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
          >
            Custom trigger
          </button>
        </MasaiDropdownCheckboxFilter>
      </div>
    </div>
  );
}
