"use client";

import * as React from "react";
import { ClubCard } from "@/registry/components/club-card";
import {
  demoInputClass,
  demoTextareaClass,
} from "@/app/components/demo-field-classes";

type ClubCardPlaygroundProps = {
  cardCount?: number;
};

export function ClubCardPlayground({ cardCount = 1 }: ClubCardPlaygroundProps) {
  const [domain, setDomain] = React.useState("Product Management");
  const [name, setName] = React.useState("Product Circle");
  const [imageUrl, setImageUrl] = React.useState(
    "https://masai-drive-uploads-prod.s3.ap-south-1.amazonaws.com/drive/69c5405a1048890fc9f0c63c/1775559488567-081c444cda66b811.png",
  );
  const [miniDescription, setMiniDescription] = React.useState(
    "A space to learn how great products are built and scaled",
  );
  const [ctaText, setCtaText] = React.useState("View Details");
  const [cardCtaText, setCardCtaText] = React.useState("Open Club");
  const [drawerCtaText, setDrawerCtaText] = React.useState("Join Club");
  const [totalMembers, setTotalMembers] = React.useState("1240");
  const [detailDescription, setDetailDescription] = React.useState(
    "Frontend Club helps members improve React, JavaScript, and UI engineering with guided sessions and hands-on practice.",
  );
  const [detailPointsText, setDetailPointsText] = React.useState(
    "Live sessions every Wednesday\nPeer-led project reviews\nMonthly frontend challenge",
  );
  const [ctaTheme, setCtaTheme] = React.useState<"yellow" | "red">("yellow");
  const [shouldCompress, setShouldCompress] = React.useState(false);
  const [showSuccessIcon, setShowSuccessIcon] = React.useState(false);
  const [drawerDirection, setDrawerDirection] = React.useState<
    "auto" | "right" | "bottom"
  >("auto");

  const detailPoints = React.useMemo(
    () =>
      detailPointsText
        .split("\n")
        .map((point) => point.trim())
        .filter(Boolean),
    [detailPointsText],
  );

  return (
    <div className="flex flex-col gap-4 border rounded-lg p-4">
      <h2 className="text-sm text-muted-foreground sm:pl-3">
        Club card: CTA opens a right drawer on desktop and bottom drawer on
        mobile.
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Domain
          <input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground sm:col-span-2">
          Image URL
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground sm:col-span-2">
          Mini description
          <input
            value={miniDescription}
            onChange={(e) => setMiniDescription(e.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          CTA text
          <input
            value={ctaText}
            onChange={(e) => setCtaText(e.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Card CTA text
          <input
            value={cardCtaText}
            onChange={(e) => setCardCtaText(e.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Drawer CTA text
          <input
            value={drawerCtaText}
            onChange={(e) => setDrawerCtaText(e.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Total members
          <input
            value={totalMembers}
            onChange={(e) => setTotalMembers(e.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          CTA theme
          <select
            value={ctaTheme}
            onChange={(e) => setCtaTheme(e.target.value as "yellow" | "red")}
            className={demoInputClass}
          >
            <option value="yellow">yellow</option>
            <option value="red">red</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Drawer direction
          <select
            value={drawerDirection}
            onChange={(e) =>
              setDrawerDirection(e.target.value as "auto" | "right" | "bottom")
            }
            className={demoInputClass}
          >
            <option value="auto">auto</option>
            <option value="right">right</option>
            <option value="bottom">bottom</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={shouldCompress}
            onChange={(e) => setShouldCompress(e.target.checked)}
          />
          shouldCompress
        </label>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={showSuccessIcon}
            onChange={(e) => setShowSuccessIcon(e.target.checked)}
          />
          showSuccessIcon
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground sm:col-span-2">
          Detail description
          <textarea
            value={detailDescription}
            onChange={(e) => setDetailDescription(e.target.value)}
            className={demoTextareaClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground sm:col-span-2">
          Detail points (one per line)
          <textarea
            value={detailPointsText}
            onChange={(e) => setDetailPointsText(e.target.value)}
            className={`${demoTextareaClass} min-h-24`}
          />
        </label>
      </div>
      <div className="w-full overflow-x-auto py-4">
        <div className="flex w-max gap-4">
          {Array.from({ length: cardCount }).map((_, index) => (
            <ClubCard
              key={`club-card-preview-${index}`}
              domain={domain}
              name={cardCount > 1 ? `${name} ${index + 1}` : name}
              imageUrl={imageUrl}
              miniDescription={miniDescription}
              ctaText={ctaText}
              cardCtaText={cardCtaText}
              drawerCtaText={drawerCtaText}
              onCtaClick={() =>
                console.log(`Club card ${index + 1} CTA clicked`)
              }
              totalMembers={totalMembers}
              detailPoints={detailPoints}
              detailDescription={detailDescription}
              drawerDirection={drawerDirection}
              ctaTheme={ctaTheme}
              shouldCompress={shouldCompress}
              showSuccessIcon={showSuccessIcon}
            />
          ))}
        </div>
      </div>
      <div className="w-full overflow-x-auto py-2">
        <p className="text-xs text-muted-foreground sm:pl-1">Preset examples</p>
        <div className="mt-3 flex w-max gap-4">
          <ClubCard
            domain={domain}
            name="Compressed Drawer CTA Hidden"
            imageUrl={imageUrl}
            miniDescription={miniDescription}
            ctaText={ctaText}
            cardCtaText={cardCtaText}
            drawerCtaText={drawerCtaText}
            onCtaClick={() => console.log("Compressed hidden CTA card clicked")}
            totalMembers={totalMembers}
            detailPoints={detailPoints}
            detailDescription={detailDescription}
            drawerDirection={drawerDirection}
            ctaTheme={ctaTheme}
            shouldCompress
          />
          <ClubCard
            domain={domain}
            name="Compressed Club Card"
            imageUrl={imageUrl}
            miniDescription={miniDescription}
            ctaText={ctaText}
            cardCtaText={cardCtaText}
            drawerCtaText={drawerCtaText}
            onCtaClick={() => console.log("Compressed card CTA clicked")}
            totalMembers={totalMembers}
            detailPoints={detailPoints}
            detailDescription={detailDescription}
            drawerDirection={drawerDirection}
            ctaTheme={ctaTheme}
            shouldCompress
            showSuccessIcon
          />
          <ClubCard
            domain={domain}
            name="Success Icon Club Card"
            imageUrl={imageUrl}
            miniDescription={miniDescription}
            ctaText={ctaText}
            cardCtaText={cardCtaText}
            drawerCtaText={drawerCtaText}
            onCtaClick={() => console.log("Success icon card CTA clicked")}
            totalMembers={totalMembers}
            detailPoints={detailPoints}
            detailDescription={detailDescription}
            drawerDirection={drawerDirection}
            ctaTheme={ctaTheme}
            shouldCompress
          />
        </div>
      </div>
    </div>
  );
}
