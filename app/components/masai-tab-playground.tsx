"use client";

import * as React from "react";
import { Bookmark, Star } from "lucide-react";

import { MasaiTab } from "@/registry/components/masai-tab";

const SIZES = ["regular", "large"] as const;

export function MasaiTabPlayground() {
  const [selected, setSelected] = React.useState<string>("regular-default");

  return (
    <div className="space-y-6 rounded-lg border p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Default vs Selected</h3>
        <p className="text-xs text-muted-foreground">
          Single-tab primitive. Pass <code>selected</code> to toggle the active state.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <MasaiTab label="Label" selected={false} />
          <MasaiTab label="Label" selected={true} />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">With left / right icon</h3>
        <p className="text-xs text-muted-foreground">
          Pass <code>iconLeft</code> or <code>iconRight</code> to render an icon. Both can be set.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <MasaiTab label="Label" iconLeft={<Star />} />
          <MasaiTab label="Label" iconRight={<Bookmark />} />
          <MasaiTab label="Label" selected iconLeft={<Star />} />
          <MasaiTab label="Label" selected iconRight={<Bookmark />} />
          <MasaiTab label="Label" iconLeft={<Star />} iconRight={<Bookmark />} />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Sizes</h3>
        <p className="text-xs text-muted-foreground">
          <code>regular</code> (40px) and <code>large</code> (48px).
        </p>
        <div className="flex flex-wrap items-end gap-3">
          {SIZES.map((size) => (
            <MasaiTab key={size} size={size} label="Label" />
          ))}
          {SIZES.map((size) => (
            <MasaiTab key={`${size}-selected`} size={size} selected label="Label" />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Disabled</h3>
        <div className="flex flex-wrap items-center gap-3">
          <MasaiTab label="Label" disabled />
          <MasaiTab label="Label" selected disabled />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Composed as a tab row</h3>
        <p className="text-xs text-muted-foreground">
          Click any tab — parent owns the selected state.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {[
            { id: "regular-default", label: "Overview" },
            { id: "lectures", label: "Lectures", iconLeft: <Star /> },
            { id: "assignments", label: "Assignments", iconRight: <Bookmark /> },
            { id: "resources", label: "Resources" },
          ].map((tab) => (
            <MasaiTab
              key={tab.id}
              label={tab.label}
              iconLeft={tab.iconLeft}
              iconRight={tab.iconRight}
              selected={selected === tab.id}
              onClick={() => setSelected(tab.id)}
            />
          ))}
        </div>
        <span className="inline-block rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
          Selected: {selected}
        </span>
      </div>
    </div>
  );
}
