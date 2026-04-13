"use client"

import * as React from "react"
import { BadgeShowcase } from "@/app/components/badge-showcase"
import { ClubCardPlayground } from "@/app/components/club-card-playground"
import { DocumentationPlayground } from "@/app/components/documentation-playground"
import { EventCardPlayground } from "@/app/components/event-card-playground"
import { HomePageHeader } from "@/app/components/home-page-header"
import { AppSidebar, type AppSidebarItem } from "@/registry/components/masai-registry/app-sidebar"
import { Modal } from "@/registry/components/masai-registry/modal"
import { Toaster, type ToasterPosition } from "@/registry/components/masai-registry/toaster"
import { Bell, Calendar, FileText, Home as HomeIcon, Settings, Users } from "lucide-react"

type SidebarIconKey = "home" | "events" | "clubs" | "docs" | "settings"

const sidebarItems: AppSidebarItem<SidebarIconKey>[] = [
  { icon: "home", label: "Home", url: "#" },
  {
    icon: "events",
    label: "Events",
    submenu: [
      { icon: "events", label: "Upcoming", url: "#" },
      { icon: "events", label: "Past", url: "#" },
    ],
  },
  { icon: "clubs", label: "Clubs", url: "#" },
  { icon: "docs", label: "Documentation", url: "#" },
  { icon: "settings", label: "Settings", url: "#" },
]

const sidebarIconMap = {
  home: HomeIcon,
  events: Calendar,
  clubs: Users,
  docs: FileText,
  settings: Settings,
} as const

export default function Home() {
  const [showToaster, setShowToaster] = React.useState(false)
  const [toasterKey, setToasterKey] = React.useState(0)
  const [toasterText, setToasterText] = React.useState("Your changes were saved successfully.")
  const [toasterPosition, setToasterPosition] = React.useState<ToasterPosition>("bottom-right")
  const [toasterDuration, setToasterDuration] = React.useState(4000)
  const [toasterBackgroundColor, setToasterBackgroundColor] = React.useState("#0f172a")
  const [toasterTextColor, setToasterTextColor] = React.useState("#f8fafc")
  const [showIcon, setShowIcon] = React.useState(true)

  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <HomePageHeader />
      <main className="flex flex-col flex-1 gap-8">
        <section className="space-y-3" aria-labelledby="app-sidebar-heading">
          <div className="space-y-1">
            <h2 id="app-sidebar-heading" className="text-lg font-semibold">
              App Sidebar
            </h2>
            <p className="text-sm text-muted-foreground">
              Sidebar navigation with nested submenu and minimize toggle.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <AppSidebar
              items={sidebarItems}
              iconMap={sidebarIconMap}
              heading="Control Panel"
              expandedWidthClassName="w-[360px]"
              backgroundClassName="bg-slate-50"
            />
          </div>
        </section>

        <section className="space-y-3" aria-labelledby="club-card-heading">
          <div className="space-y-1">
            <h2 id="club-card-heading" className="text-lg font-semibold">
              Club Card
            </h2>
            <p className="text-sm text-muted-foreground">
              Showing 43 club cards in a single horizontal row.
            </p>
          </div>
          <ClubCardPlayground cardCount={43} />
        </section>

        <section className="space-y-3" aria-labelledby="badge-heading">
          <div className="space-y-1">
            <h2 id="badge-heading" className="text-lg font-semibold">
              Badges
            </h2>
            <p className="text-sm text-muted-foreground">
              Variant and style combinations for badge components.
            </p>
          </div>
          <BadgeShowcase />
        </section>

        <section className="space-y-3" aria-labelledby="event-card-heading">
          <div className="space-y-1">
            <h2 id="event-card-heading" className="text-lg font-semibold">
              Event Card
            </h2>
            <p className="text-sm text-muted-foreground">
              Preview event card states and drawer timeline details.
            </p>
          </div>
          <EventCardPlayground />
        </section>

        <section className="space-y-3" aria-labelledby="documentation-provider-heading">
          <div className="space-y-1">
            <h2 id="documentation-provider-heading" className="text-lg font-semibold">
              Documentation Provider
            </h2>
            <p className="text-sm text-muted-foreground">
              Preview how markdown documentation is rendered and consumed.
            </p>
          </div>
          <DocumentationPlayground />
        </section>

        <section className="space-y-3" aria-labelledby="modal-heading">
          <div className="space-y-1">
            <h2 id="modal-heading" className="text-lg font-semibold">
              Modal
            </h2>
            <p className="text-sm text-muted-foreground">
              Reusable modal with configurable size and close behavior.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <Modal
              size="md"
              title="Create New Club"
              description="Set up your club details and invite members."
              trigger={
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                >
                  Open Modal
                </button>
              }
              footer={
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
                  >
                    Save
                  </button>
                </div>
              }
            >
              <div className="space-y-2">
                <p className="text-sm text-slate-700">
                  Use this area for forms, confirmations, or any custom content.
                </p>
                <p className="text-sm text-slate-500">
                  Try changing the `size` prop to `sm`, `lg`, `xl`, or `full`.
                </p>
              </div>
            </Modal>
          </div>
        </section>

        <section className="space-y-3" aria-labelledby="toaster-heading">
          <div className="space-y-1">
            <h2 id="toaster-heading" className="text-lg font-semibold">
              Toaster
            </h2>
            <p className="text-sm text-muted-foreground">
              Configure props and click to preview the toaster.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="text-slate-700">Text</span>
                <input
                  type="text"
                  value={toasterText}
                  onChange={(event) => setToasterText(event.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-slate-700">Position</span>
                <select
                  value={toasterPosition}
                  onChange={(event) => setToasterPosition(event.target.value as ToasterPosition)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                >
                  <option value="top-left">top-left</option>
                  <option value="top-center">top-center</option>
                  <option value="top-right">top-right</option>
                  <option value="bottom-left">bottom-left</option>
                  <option value="bottom-center">bottom-center</option>
                  <option value="bottom-right">bottom-right</option>
                </select>
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-slate-700">Duration (ms)</span>
                <input
                  type="number"
                  min={0}
                  step={500}
                  value={toasterDuration}
                  onChange={(event) => setToasterDuration(Number(event.target.value) || 0)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-slate-700">Background color</span>
                <input
                  type="text"
                  value={toasterBackgroundColor}
                  onChange={(event) => setToasterBackgroundColor(event.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-slate-700">Text color</span>
                <input
                  type="text"
                  value={toasterTextColor}
                  onChange={(event) => setToasterTextColor(event.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
              <label className="flex items-center gap-2 pt-6 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={showIcon}
                  onChange={(event) => setShowIcon(event.target.checked)}
                />
                Show icon
              </label>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowToaster(true)
                setToasterKey((current) => current + 1)
              }}
              className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Show Toaster
            </button>
          </div>
        </section>
      </main>
      {showToaster ? (
        <Toaster
          key={toasterKey}
          position={toasterPosition}
          text={toasterText}
          icon={showIcon ? <Bell className="size-4" /> : undefined}
          duration={toasterDuration}
          backgroundColor={toasterBackgroundColor}
          textColor={toasterTextColor}
        />
      ) : null}
    </div>
  )
}
