"use client"

import * as React from "react"

import { MasaiTabs } from "@/registry/components/masai-tabs"

const tabOptions = [
  { value: "all", label: "All" },
  { value: "hackathons", label: "Hackathons" },
  { value: "meetups", label: "Meetups" },
  { value: "webinars", label: "Webinars" },
]

export function MasaiTabsPlayground() {
  const [selectedTab, setSelectedTab] = React.useState(tabOptions[0].value)

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4">
      <h2 className="text-sm text-muted-foreground sm:pl-3">
        Controlled tabs component. Parent state always tracks the selected tab.
      </h2>

      <div className="flex flex-wrap items-center gap-3">
        <MasaiTabs
          items={tabOptions}
          value={selectedTab}
          onValueChange={setSelectedTab}
          ariaLabel="Masai tabs playground"
        />
        <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
          Selected: {selectedTab}
        </span>
      </div>
    </div>
  )
}
