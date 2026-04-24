"use client"

import * as React from "react"

import { EvaluationCardDrawer } from "./evaluation-card-drawer"
import { EvaluationCardPreview } from "./evaluation-card-preview"
import type { EvaluationCardProps } from "./types"

export function EvaluationCard({
  data,
  ctaText,
  drawerHeading,
  isMobile = false,
  className,
}: EvaluationCardProps) {
  const [open, setOpen] = React.useState(false)
  const resolvedDirection = isMobile ? "bottom" : "right"

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
} from "./types"
