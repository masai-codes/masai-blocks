"use client"

import * as React from "react"
import { ClubCard } from "@/registry/components/club-card"
import { demoInputClass, demoTextareaClass } from "@/app/components/demo-field-classes"

export function ClubCardPlayground() {
  const [domain, setDomain] = React.useState("Tech Community")
  const [name, setName] = React.useState("Frontend Club")
  const [imageUrl, setImageUrl] = React.useState(
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=400&q=80"
  )
  const [miniDescription, setMiniDescription] = React.useState(
    "Weekly frontend meetups, code reviews, and interview prep sessions."
  )
  const [ctaText, setCtaText] = React.useState("View Details")
  const [totalMembers, setTotalMembers] = React.useState("1240")
  const [detailDescription, setDetailDescription] = React.useState(
    "Frontend Club helps members improve React, JavaScript, and UI engineering with guided sessions and hands-on practice."
  )
  const [detailPointsText, setDetailPointsText] = React.useState(
    "Live sessions every Wednesday\nPeer-led project reviews\nMonthly frontend challenge"
  )
  const [ctaTheme, setCtaTheme] = React.useState<"yellow" | "red">("yellow")
  const [drawerDirection, setDrawerDirection] = React.useState<"auto" | "right" | "bottom">(
    "auto"
  )

  const detailPoints = React.useMemo(
    () =>
      detailPointsText
        .split("\n")
        .map((point) => point.trim())
        .filter(Boolean),
    [detailPointsText]
  )

  return (
    <div className="flex flex-col gap-4 border rounded-lg p-4">
      <h2 className="text-sm text-muted-foreground sm:pl-3">
        Club card: CTA opens a right drawer on desktop and bottom drawer on mobile.
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Domain
          <input value={domain} onChange={(e) => setDomain(e.target.value)} className={demoInputClass} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} className={demoInputClass} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground sm:col-span-2">
          Image URL
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={demoInputClass} />
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
          <input value={ctaText} onChange={(e) => setCtaText(e.target.value)} className={demoInputClass} />
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
      <div className="flex items-center justify-center py-4">
        <ClubCard
          domain={domain}
          name={name}
          imageUrl={imageUrl}
          miniDescription={miniDescription}
          ctaText={ctaText}
          onCtaClick={() => console.log("Club card CTA clicked")}
          totalMembers={totalMembers}
          detailPoints={detailPoints}
          detailDescription={detailDescription}
          drawerDirection={drawerDirection}
          ctaTheme={ctaTheme}
        />
      </div>
    </div>
  )
}
