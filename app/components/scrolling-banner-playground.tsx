"use client";

import * as React from "react";

import {
  demoInputClass,
  demoTextareaClass,
} from "@/app/components/demo-field-classes";
import { ScrollingBanner } from "@/registry/components/scrolling-banner";
import type { ScrollingBannerItem } from "@/registry/components/scrolling-banner";

const DEFAULT_ITEMS_TEXT = [
  "Admission Open 2026|Join our new full-stack cohort for April intake.|Apply now|https://www.masaischool.com",
  "Community AMA Tonight|Product leaders are hosting a live AMA at 8 PM.|Set reminder|https://www.masaischool.com/events",
  "Placement Milestone|500+ learners placed in top startups this quarter.|View stories|https://www.masaischool.com/success-stories",
].join("\n");

export function ScrollingBannerPlayground() {
  const [itemsText, setItemsText] = React.useState(DEFAULT_ITEMS_TEXT);
  const [bannerHeading, setBannerHeading] = React.useState(
    "Last week on Masaiverse",
  );
  const [maxHeight, setMaxHeight] = React.useState("520px");
  const [maxWidth, setMaxWidth] = React.useState("100%");
  const [itemDurationSeconds, setItemDurationSeconds] = React.useState(4);
  const [pauseOnHover, setPauseOnHover] = React.useState(true);
  const [allowManualScroll, setAllowManualScroll] = React.useState(true);

  const items = React.useMemo<Array<ScrollingBannerItem>>(
    () =>
      itemsText
        .split("\n")
        .map((row) => row.trim())
        .filter(Boolean)
        .map((row, index) => {
          const [heading, content, ctaText, ctaLink] = row
            .split("|")
            .map((item) => item?.trim() || "");
          return {
            id: `notice-${index}`,
            heading: heading || "Latest update",
            content: content || "No content provided.",
            ctaText: ctaText || "Know more",
            ctaLink: ctaLink || "#",
            openInNewTab: true,
          };
        }),
    [itemsText],
  );

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4">
      <h2 className="text-sm text-muted-foreground sm:pl-3">
        Auto-scrolling latest updates notice board with heading, content, and
        CTA link.
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Banner heading
          <input
            value={bannerHeading}
            onChange={(event) => setBannerHeading(event.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Max height (e.g. 220px, 70vh)
          <input
            value={maxHeight}
            onChange={(event) => setMaxHeight(event.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Max width (e.g. 100%, 560px)
          <input
            value={maxWidth}
            onChange={(event) => setMaxWidth(event.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Seconds per item
          <input
            type="number"
            min={1}
            max={20}
            value={itemDurationSeconds}
            onChange={(event) =>
              setItemDurationSeconds(Number(event.target.value) || 1)
            }
            className={demoInputClass}
          />
        </label>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={pauseOnHover}
            onChange={(event) => setPauseOnHover(event.target.checked)}
          />
          Pause on hover
        </label>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={allowManualScroll}
            onChange={(event) => setAllowManualScroll(event.target.checked)}
          />
          Allow manual scroll
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground sm:col-span-2">
          Banner items (one per line: heading|content|ctaText|ctaLink)
          <textarea
            value={itemsText}
            onChange={(event) => setItemsText(event.target.value)}
            className={`${demoTextareaClass} min-h-28`}
          />
        </label>
      </div>

      <div className="flex h-[280px] max-w-[500px] w-full items-center justify-center rounded-md bg-[#F9FAFB] p-3">
        <ScrollingBanner
          items={items}
          bannerHeading={bannerHeading}
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          itemDurationSeconds={itemDurationSeconds}
          pauseOnHover={pauseOnHover}
          allowManualScroll={allowManualScroll}
        />
      </div>
    </div>
  );
}
