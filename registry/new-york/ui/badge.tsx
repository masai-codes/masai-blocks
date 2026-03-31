"use client"

import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

type BadgeProps = {
  name: string
  description: string
  badgeUrl: string
  isLocked: boolean
  openIn: "bottom-drawer" | "modal"
  bgColor: string
  topographicStrokeColor?: string
  firstUnlockedDate: string | Date
}

function formatUnlockedDate(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return String(value)
  }

  const day = date.getDate()
  const mod100 = day % 100
  const suffix =
    mod100 >= 11 && mod100 <= 13
      ? "th"
      : day % 10 === 1
        ? "st"
        : day % 10 === 2
          ? "nd"
          : day % 10 === 3
            ? "rd"
            : "th"
  const month = new Intl.DateTimeFormat("en-GB", { month: "short" }).format(date)
  const year = date.getFullYear()

  return `${day}${suffix} ${month} ${year}`
}

function Badge({
  name,
  description,
  badgeUrl,
  isLocked,
  openIn,
  bgColor,
  topographicStrokeColor = "#FAF4E7",
  firstUnlockedDate,
}: BadgeProps) {
  const unlockedText = formatUnlockedDate(firstUnlockedDate)
  const drawer = openIn === "bottom-drawer"

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`Open ${name} badge`}
          className="inline-flex items-center justify-center rounded-xl outline-none ring-offset-background transition-transform hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-ring"
        >
          <img
            src={badgeUrl}
            alt={name}
            className={cn("h-24 w-24 object-contain transition-opacity", isLocked && "opacity-50")}
          />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content
          className={cn(
            "fixed z-50 border shadow-xl outline-none",
            drawer
              ? "inset-x-0 bottom-0 w-full max-h-[90vh] rounded-t-2xl bg-white data-[state=open]:animate-in data-[state=closed]:animate-out"
              : "left-1/2 top-1/2 w-[min(92vw,375px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white data-[state=open]:animate-in data-[state=closed]:animate-out"
          )}
        >
          <div
            className="relative overflow-hidden rounded-xl p-4 sm:p-5"
            style={{
              backgroundColor: bgColor,
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-0 h-full"
              style={{
                backgroundColor: topographicStrokeColor,
                maskImage: "url('/topographic-3.svg')",
                maskPosition: "top center",
                maskRepeat: "no-repeat",
                WebkitMaskImage: "url('/topographic-3.svg')",
                WebkitMaskPosition: "top center",
                WebkitMaskRepeat: "no-repeat",
              }}
            />
            <Dialog.Close className="absolute right-3 top-3 z-10 inline-flex size-8 items-center justify-center rounded-md border bg-white/90 text-foreground transition-colors hover:bg-white">
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </Dialog.Close>

            <div className="relative z-10 mx-auto mb-4 flex w-full max-w-[340px] justify-center">
              <img
                src={badgeUrl}
                alt={name}
                className={cn("h-48 w-full object-contain transition-opacity", isLocked && "opacity-50")}
              />
            </div>

            <div className="relative z-10 space-y-2 text-center">
              <Dialog.Title className="text-3xl font-extrabold tracking-tight text-slate-900">
                {name}
              </Dialog.Title>
              <Dialog.Description className="mx-auto max-w-[460px] text-lg leading-relaxed text-slate-600">
                {description}
              </Dialog.Description>
            </div>

            {!isLocked ? (
              <div className="relative z-10 mt-5 flex justify-center">
                <p className="rounded-full border border-blue-300 bg-white/80 px-4 py-2 text-base font-medium text-blue-600">
                  {`Unlocked on ${unlockedText}`}
                </p>
              </div>
            ) : null}

            <button
              type="button"
              className="relative z-10 mt-8 h-14 w-full rounded-2xl bg-[#6f67c7] px-4 text-xl font-semibold text-white transition-colors hover:bg-[#625ab9]"
            >
              Share With Your Network
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { Badge }
export type { BadgeProps }
