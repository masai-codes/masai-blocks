"use client";

import * as React from "react";

import { MasaiDateSelection } from "@/registry/components/masai-date-selection";

export function MasaiDateSelectionPlayground() {
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");

  return (
    <div className="space-y-6 rounded-lg border p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">With label (reference)</h3>
        <p className="text-xs text-muted-foreground">
          Optional <code>label</code>, <code>type=&quot;date&quot;</code> value is ISO <code>yyyy-mm-dd</code> in state.
        </p>
        <div className="max-w-xs space-y-4">
          <MasaiDateSelection
            label="Start Date"
            value={start}
            onChange={(event) => setStart(event.target.value)}
          />
          <MasaiDateSelection
            label="End Date"
            value={end}
            onChange={(event) => setEnd(event.target.value)}
          />
        </div>
        <output className="block rounded-md bg-muted px-2 py-1.5 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">values:</span> start={start || "—"} · end=
          {end || "—"}
        </output>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">No label</h3>
        <div className="max-w-xs">
          <MasaiDateSelection aria-label="Pick a date" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Disabled</h3>
        <div className="max-w-xs">
          <MasaiDateSelection label="Locked" value="2026-05-10" disabled />
        </div>
      </div>
    </div>
  );
}
