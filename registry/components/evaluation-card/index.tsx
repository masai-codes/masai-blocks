"use client"

import * as React from "react"

import { EvaluationCardDrawer } from "./evaluation-card-drawer"
import { EvaluationCardPreview } from "./evaluation-card-preview"
import type { DrawerDirection, EvaluationCardProps } from "./types"

function useResolvedDirection(direction: DrawerDirection) {
  const [isDesktop, setIsDesktop] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")
    const sync = () => setIsDesktop(mediaQuery.matches)
    sync()
    mediaQuery.addEventListener("change", sync)
    return () => mediaQuery.removeEventListener("change", sync)
  }, [])

  return direction === "auto" ? (isDesktop ? "right" : "bottom") : direction
}

export function EvaluationCard({
  data,
  ctaText,
  drawerHeading,
  drawerDirection = "auto",
  className,
}: EvaluationCardProps) {
  const [open, setOpen] = React.useState(false)
  const resolvedDirection = useResolvedDirection(drawerDirection)

  return (
    <>
      <EvaluationCardPreview data={data} ctaText={ctaText} className={className} onCtaClick={() => setOpen(true)} />
      <EvaluationCardDrawer
        data={data}
        heading={drawerHeading}
        open={open}
        onOpenChange={setOpen}
        resolvedDirection={resolvedDirection}
      />
    </>
  )
}

export type {
  EvaluationCardProps,
  EvaluationCardData,
  EvaluationDetail,
  EvaluationItem,
  EvaluationStatus,
  DrawerDirection,
} from "./types"
