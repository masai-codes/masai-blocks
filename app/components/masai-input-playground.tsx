"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { MasaiInput } from "@/registry/components/masai-input";

export function MasaiInputPlayground() {
  const [query, setQuery] = React.useState("");

  return (
    <div className="space-y-6 rounded-lg border p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Search (reference)</h3>
        <p className="text-xs text-muted-foreground">
          White field, light border, left search icon, gray placeholder —{" "}
          <code>size=&quot;regular&quot;</code> (40px height).
        </p>
        <MasaiInput
          type="search"
          size="regular"
          iconLeft={<Search strokeWidth={2} aria-hidden />}
          placeholder="Search Assignments"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Left / right icons</h3>
        <p className="text-xs text-muted-foreground">
          Optional <code>iconLeft</code> and <code>iconRight</code> slots.
        </p>
        <div className="flex max-w-md flex-col gap-3">
          <MasaiInput iconLeft={<Search className="size-[18px]" />} placeholder="Left icon only" />
          <MasaiInput iconRight={<Search className="size-[18px]" />} placeholder="Right icon only" />
          <MasaiInput
            iconLeft={<Search className="size-[18px]" />}
            iconRight={<Search className="size-[18px]" />}
            placeholder="Both sides"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Disabled</h3>
        <MasaiInput
          disabled
          iconLeft={<Search className="size-[18px]" />}
          placeholder="Disabled"
          className="max-w-md"
        />
      </div>
    </div>
  );
}
