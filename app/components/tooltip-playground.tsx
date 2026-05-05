"use client";

import * as React from "react";
import { Tooltip } from "@/registry/components/tooltip";

const DIRECTIONS = ["top", "bottom", "left", "right"] as const;

export function TooltipPlayground() {
  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex flex-wrap items-center gap-4">
        {DIRECTIONS.map((direction) => (
          <Tooltip
            key={direction}
            direction={direction}
            content={`Tooltip ${direction}`}
            trigger={
              <button type="button" className="rounded-md border border-gray-300 px-3 py-2 type-b3-md">
                {direction}
              </button>
            }
          />
        ))}
      </div>

      <Tooltip
        direction="top"
        withCta
        content="This tooltip includes CTA."
        ctaText="Open"
        onCtaClick={() => {
          // eslint-disable-next-line no-console
          console.log("Tooltip CTA clicked");
        }}
        trigger={
          <button type="button" className="rounded-md border border-gray-300 px-3 py-2 type-b3-md">
            Tooltip with CTA
          </button>
        }
      />
    </div>
  );
}

