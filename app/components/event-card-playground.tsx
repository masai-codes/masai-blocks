"use client"

import * as React from "react"

import { demoInputClass, demoTextareaClass } from "@/app/components/demo-field-classes"
import { EventCard } from "@/registry/components/event-card"

export function EventCardPlayground() {
  const [title, setTitle] = React.useState("Build Better Product Communities")
  const [miniDescription, setMiniDescription] = React.useState(
    "A practical event to learn growth, community building, and product thinking."
  )
  const [ctaText, setCtaText] = React.useState("View Event")
  const [isActive, setIsActive] = React.useState(true)
  const [category, setCategory] = React.useState("Workshop")
  const [image, setImage] = React.useState(
    "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=80"
  )
  const [date, setDate] = React.useState("15 May 2026")
  const [time, setTime] = React.useState("6:00 PM - 8:00 PM")
  const [isOnline, setIsOnline] = React.useState(true)
  const [eventLocationLink, setEventLocationLink] = React.useState(
    "https://maps.google.com/?q=Masai+School"
  )
  const [eventMode, setEventMode] = React.useState("Online - Zoom")
  const [eventDetailDescription, setEventDetailDescription] = React.useState(
    "Join product leaders and operators for a deep dive into community-led growth playbooks."
  )
  const [timelineText, setTimelineText] = React.useState(
    "6:00 PM|Welcome and introductions\n6:20 PM|Talk: Building active communities\n7:00 PM|Q&A with speakers\n7:30 PM|Networking and closing"
  )

  const eventTimeline = React.useMemo(
    () =>
      timelineText
        .split("\n")
        .map((row) => row.trim())
        .filter(Boolean)
        .map((row) => {
          const [timePart, ...textParts] = row.split("|")
          return {
            time: timePart?.trim() || "",
            text: textParts.join("|").trim() || "Timeline item",
          }
        })
        .filter((item) => item.time || item.text),
    [timelineText]
  )

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4">
      <h2 className="text-sm text-muted-foreground sm:pl-3">
        Event card with detail drawer and timeline line UI.
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={demoInputClass} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Category
          <input value={category} onChange={(e) => setCategory(e.target.value)} className={demoInputClass} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground sm:col-span-2">
          Mini description
          <input
            value={miniDescription}
            onChange={(e) => setMiniDescription(e.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground sm:col-span-2">
          Image URL
          <input value={image} onChange={(e) => setImage(e.target.value)} className={demoInputClass} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Date
          <input value={date} onChange={(e) => setDate(e.target.value)} className={demoInputClass} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Time
          <input value={time} onChange={(e) => setTime(e.target.value)} className={demoInputClass} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          CTA text
          <input value={ctaText} onChange={(e) => setCtaText(e.target.value)} className={demoInputClass} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Event mode
          <input value={eventMode} onChange={(e) => setEventMode(e.target.value)} className={demoInputClass} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground sm:col-span-2">
          Event location link (used for offline maps tag)
          <input
            value={eventLocationLink}
            onChange={(e) => setEventLocationLink(e.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Active status
          <select
            value={isActive ? "active" : "inactive"}
            onChange={(e) => setIsActive(e.target.value === "active")}
            className={demoInputClass}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Location type
          <select
            value={isOnline ? "online" : "offline"}
            onChange={(e) => setIsOnline(e.target.value === "online")}
            className={demoInputClass}
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground sm:col-span-2">
          Event detail description
          <textarea
            value={eventDetailDescription}
            onChange={(e) => setEventDetailDescription(e.target.value)}
            className={demoTextareaClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground sm:col-span-2">
          Event timeline (one row per line, format: time|text)
          <textarea
            value={timelineText}
            onChange={(e) => setTimelineText(e.target.value)}
            className={`${demoTextareaClass} min-h-24`}
          />
        </label>
      </div>

      <div className="flex items-center justify-center py-4">
        <EventCard
          title={title}
          miniDescription={miniDescription}
          ctaText={ctaText}
          isActive={isActive}
          category={category}
          image={image}
          date={date}
          time={time}
          isOnline={isOnline}
          eventLocationLink={eventLocationLink}
          eventMode={eventMode}
          eventDetailDescription={eventDetailDescription}
          eventTimeline={eventTimeline}
          onCtaClick={() => console.log("Event card CTA clicked")}
        />
      </div>
    </div>
  )
}
