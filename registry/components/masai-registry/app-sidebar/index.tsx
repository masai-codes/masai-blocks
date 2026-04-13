"use client"

import * as React from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip.tsx"

type SidebarIconProps = {
  className?: string
}

type SidebarIcon = React.ComponentType<SidebarIconProps>

export type AppSidebarItem<TIconKey extends string = string> = {
  icon: TIconKey
  label: string
  url?: string
  submenu?: AppSidebarItem<TIconKey>[]
}

export type AppSidebarProps<TIconKey extends string = string> = {
  items: AppSidebarItem<TIconKey>[]
  iconMap: Record<TIconKey, SidebarIcon>
  heading?: string
  expandedWidthClassName?: string
  backgroundClassName?: string
  defaultMinimized?: boolean
  className?: string
}

type SidebarNodeProps<TIconKey extends string> = {
  nodeId: string
  item: AppSidebarItem<TIconKey>
  iconMap: Record<TIconKey, SidebarIcon>
  minimized: boolean
  openNodeByDepth: Record<number, string | null>
  onToggleNode: (depth: number, nodeId: string) => void
  depth?: number
}

function SidebarNode<TIconKey extends string>({
  nodeId,
  item,
  iconMap,
  minimized,
  openNodeByDepth,
  onToggleNode,
  depth = 0,
}: SidebarNodeProps<TIconKey>) {
  const hasSubmenu = Boolean(item.submenu?.length)
  const submenuOpen = openNodeByDepth[depth] === nodeId

  const Icon = iconMap[item.icon] as SidebarIcon
  const itemPaddingLeft = minimized ? "pl-0" : depth === 0 ? "pl-3" : "pl-10"
  const baseItemClassName = `group flex h-10 w-full items-center justify-between rounded-lg pr-3 text-left text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 ${itemPaddingLeft} ${
    depth === 1 ? "text-[15px]" : "text-base"
  } ${hasSubmenu && submenuOpen ? "bg-slate-100" : ""}`

  if (minimized) {
    return (
      <div className="mb-1 flex justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label={item.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <Icon className="h-[18px] w-[18px]" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      </div>
    )
  }

  return (
    <div className="mb-1">
      {hasSubmenu ? (
        <button
          type="button"
          onClick={() => onToggleNode(depth, nodeId)}
          className={baseItemClassName}
        >
          <span className="flex items-center gap-3">
            <Icon className="h-[18px] w-[18px] shrink-0" />
            <span className="font-medium">{item.label}</span>
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-transform ${
              submenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      ) : (
        <a href={item.url ?? "#"} className={baseItemClassName}>
          <span className="flex items-center gap-3">
            <Icon className="h-[18px] w-[18px] shrink-0" />
            <span className="font-medium">{item.label}</span>
          </span>
        </a>
      )}

      {hasSubmenu && submenuOpen ? (
        <div className="mt-1">
          {item.submenu?.map((child) => (
            <SidebarNode
              key={`${nodeId}-${child.label}`}
              nodeId={`${nodeId}/${child.label}`}
              item={child}
              iconMap={iconMap}
              minimized={minimized}
              openNodeByDepth={openNodeByDepth}
              onToggleNode={onToggleNode}
              depth={depth + 1}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function AppSidebar<TIconKey extends string>({
  items,
  iconMap,
  heading,
  expandedWidthClassName = "w-[320px]",
  backgroundClassName = "bg-[#f8fafc]",
  defaultMinimized = false,
  className,
}: AppSidebarProps<TIconKey>) {
  const [minimized, setMinimized] = React.useState(defaultMinimized)
  const [openNodeByDepth, setOpenNodeByDepth] = React.useState<
    Record<number, string | null>
  >({})

  const handleToggleNode = React.useCallback((depth: number, nodeId: string) => {
    setOpenNodeByDepth((prev) => {
      const next: Record<number, string | null> = {}

      for (const [key, value] of Object.entries(prev)) {
        const numericDepth = Number(key)
        if (numericDepth < depth) {
          next[numericDepth] = value
        }
      }

      next[depth] = prev[depth] === nodeId ? null : nodeId
      return next
    })
  }, [])

  return (
    <TooltipProvider delayDuration={150}>
      <aside
        className={`h-full border-r border-slate-200 py-4 transition-all duration-200 ${
          minimized ? "w-[76px]" : expandedWidthClassName
        } ${backgroundClassName} ${className ?? ""}`}
      >
        <div
          className={`mb-3 flex items-center ${
            minimized ? "justify-center px-2" : "justify-between px-3"
          }`}
        >
          {!minimized && heading ? (
            <h3 className="text-base font-semibold text-slate-900">{heading}</h3>
          ) : null}
          <button
            type="button"
            onClick={() => setMinimized((prev) => !prev)}
            aria-label={minimized ? "Expand sidebar" : "Minimize sidebar"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            {minimized ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        <nav
          className={`space-y-1 ${minimized ? "px-2" : "px-3"}`}
          aria-label="Application sidebar"
        >
          {items.map((item) => (
            <SidebarNode
              key={item.label}
              nodeId={item.label}
              item={item}
              iconMap={iconMap}
              minimized={minimized}
              openNodeByDepth={openNodeByDepth}
              onToggleNode={handleToggleNode}
            />
          ))}
        </nav>
      </aside>
    </TooltipProvider>
  )
}
