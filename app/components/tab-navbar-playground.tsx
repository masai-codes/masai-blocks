"use client"

import * as React from "react"
import {
  Headphones,
  Home,
  LayoutGrid,
  MonitorPlay,
  MessagesSquare,
} from "lucide-react"

import { TabNavbar } from "@/registry/components/tab-navbar"

type TabId = "home" | "learn" | "support" | "chat" | "more"

export function TabNavbarPlayground() {
  const [activeId, setActiveId] = React.useState<TabId>("home")

  const items = React.useMemo(
    () => [
      {
        id: "home",
        label: "Home",
        icon: <Home strokeWidth={1.75} className="text-current" />,
        isActive: activeId === "home",
        onClick: () => setActiveId("home"),
      },
      {
        id: "learn",
        label: "Learn",
        icon: <MonitorPlay strokeWidth={1.75} className="text-current" />,
        isActive: activeId === "learn",
        onClick: () => setActiveId("learn"),
      },
      {
        id: "support",
        label: "Support",
        icon: <Headphones strokeWidth={1.75} className="text-current" />,
        isActive: activeId === "support",
        onClick: () => setActiveId("support"),
      },
      {
        id: "chat",
        label: "Chat",
        icon: <MessagesSquare strokeWidth={1.75} className="text-current" />,
        isActive: activeId === "chat",
        onClick: () => setActiveId("chat"),
      },
      {
        id: "more",
        label: "More",
        icon: <LayoutGrid strokeWidth={1.75} className="text-current" />,
        isActive: activeId === "more",
        onClick: () => setActiveId("more"),
      },
    ],
    [activeId],
  )

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4">
      <p className="text-sm text-muted-foreground sm:pl-3">
        Bottom-style tab bar: parent owns <code className="text-xs">activeId</code> and passes{" "}
        <code className="text-xs">isActive</code> + <code className="text-xs">onClick</code> per item.
      </p>

      <TabNavbar
        items={items}
        ariaLabel="Playground tab navigation"
        className="shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
      />

      <p className="rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
        Active tab: <span className="font-medium text-foreground">{activeId}</span>
      </p>
    </div>
  )
}
