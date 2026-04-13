"use client"

import * as React from "react"

export type ToasterPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

const POSITION_CLASSNAME: Record<ToasterPosition, string> = {
  "top-left": "left-4 top-4",
  "top-center": "left-1/2 top-4 -translate-x-1/2",
  "top-right": "right-4 top-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
}

function cn(...inputs: Array<string | undefined | false | null>) {
  return inputs.filter(Boolean).join(" ")
}

export type ToasterProps = {
  text: React.ReactNode
  position: ToasterPosition
  icon?: React.ReactNode
  duration?: number
  backgroundColor?: string
  textColor?: string
  className?: string
}

export function Toaster({
  text,
  position,
  icon,
  duration = 3000,
  backgroundColor,
  textColor,
  className,
}: ToasterProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  React.useEffect(() => {
    setIsVisible(true)

    if (duration <= 0) {
      return
    }

    const timer = window.setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => {
      window.clearTimeout(timer)
    }
  }, [duration, text, position, icon, backgroundColor, textColor])

  if (!isVisible) {
    return null
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed z-50 flex min-w-[220px] max-w-sm items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm shadow-lg",
        POSITION_CLASSNAME[position],
        className
      )}
      style={{
        backgroundColor: backgroundColor ?? "#ffffff",
        color: textColor ?? "#0f172a",
      }}
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span className="min-w-0 break-words">{text}</span>
    </div>
  )
}
