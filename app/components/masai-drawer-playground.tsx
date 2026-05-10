"use client";

import * as React from "react";

import { Button } from "@/registry/components/masai-button";
import {
  MasaiDrawer,
  type DrawerDirection,
} from "@/registry/components/masai-drawer";

const directions: DrawerDirection[] = ["bottom", "right", "left"];

function DemoContent() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        This drawer is controlled by parent state with `isOpen` + `onOpenChange`.
      </p>
      <div className="rounded-md border bg-muted/30 p-3 text-sm">
        Swipe down (on touch devices) to close this drawer when direction is `bottom`.
      </div>
      <div className="rounded-md border p-3 text-sm">
        You can pass any custom React component as drawer content.
      </div>
    </div>
  );
}

export function MasaiDrawerPlayground() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [direction, setDirection] = React.useState<DrawerDirection>("bottom");
  const [sideMarginInPx, setSideMarginInPx] = React.useState(0);

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <p className="text-sm text-muted-foreground">
        Controlled drawer with support for `bottom`, `right`, and `left` directions.
      </p>

      <div className="flex flex-wrap gap-2">
        {directions.map((item) => (
          <Button
            key={item}
            type={direction === item ? "secondary" : "tertiary"}
            size="sm"
            ctaText={item}
            onClick={() => setDirection(item)}
          />
        ))}
        <Button
          type="primary"
          size="sm"
          ctaText="Open drawer"
          onClick={() => setIsOpen(true)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type={sideMarginInPx === 0 ? "secondary" : "tertiary"}
          size="sm"
          ctaText="No floating margin"
          onClick={() => setSideMarginInPx(0)}
        />
        <Button
          type={sideMarginInPx === 16 ? "secondary" : "tertiary"}
          size="sm"
          ctaText="16px floating margin"
          onClick={() => setSideMarginInPx(16)}
        />
        <Button
          type={sideMarginInPx === 24 ? "secondary" : "tertiary"}
          size="sm"
          ctaText="24px floating margin"
          onClick={() => setSideMarginInPx(24)}
        />
      </div>

      <MasaiDrawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        direction={direction}
        sideMarginInPx={sideMarginInPx || undefined}
        title="Masai Drawer"
        content={DemoContent}
      />
    </div>
  );
}
