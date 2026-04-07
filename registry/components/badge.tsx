"use client"

import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"

const STATIC_BASE = "https://s3.ap-south-1.amazonaws.com/static.masaischool.com"

const LOCK_ICON_URL = `${STATIC_BASE}/lock.svg`
const LINKEDIN_ICON_URL = `${STATIC_BASE}/linkedin.svg.svg`

const THEME_BACKGROUND_URL: Record<"theme1" | "theme2" | "theme3", string> = {
  theme1: `${STATIC_BASE}/theme1-yellow.svg`,
  theme2: `${STATIC_BASE}/theme2-blue.svg`,
  theme3: `${STATIC_BASE}/theme3-red.svg`,
}

/** Header tint behind the decorative SVG; paired with `THEME_BACKGROUND_URL`. */
const THEME_BACKGROUND_COLOR: Record<"theme1" | "theme2" | "theme3", string> = {
  theme1: "#FFE8B526",
  theme2: "#EDFAFA80",
  theme3: "#F4AF7E1A",
}

type BadgeProps = {
  name: string
  description: string
  lockedBadgeText?: string
  badgeUrl: string
  countLabel?: string
  isLocked: boolean
  openIn: "bottom-drawer" | "modal"
  /** Decorative header background (SVG + tint); pick theme1, theme2, or theme3. */
  theme: "theme1" | "theme2" | "theme3"
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
  lockedBadgeText,
  badgeUrl,
  countLabel,
  isLocked,
  openIn,
  theme,
  firstUnlockedDate,
}: BadgeProps) {
  const unlockedText = formatUnlockedDate(firstUnlockedDate)
  const drawer = openIn === "bottom-drawer"
  const detailText = isLocked ? lockedBadgeText || description : description
  const themeBackgroundUrl = THEME_BACKGROUND_URL[theme]
  const themeBackgroundColor = THEME_BACKGROUND_COLOR[theme]

  const displayCountLabel = React.useMemo(() => {
    if (!countLabel) return undefined
    const trimmed = countLabel.trim()
    if (!trimmed) return undefined
    const numericPart = trimmed.toLowerCase().startsWith("x") ? trimmed.slice(1) : trimmed
    const count = Number.parseInt(numericPart, 10)
    if (!Number.isFinite(count) || count <= 1) return undefined
    return `x${count}`
  }, [countLabel])
  const linkedinShareHref = React.useMemo(() => {
    const encoded = encodeURIComponent(badgeUrl)
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`
  }, [badgeUrl])
  const isRepeatedUnlock = React.useMemo(() => {
    if (!displayCountLabel) return false
    const count = Number.parseInt(displayCountLabel.replace(/^x/i, ""), 10)
    return Number.isFinite(count) && count > 2
  }, [displayCountLabel])

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`Open ${name} badge`}
          className="relative inline-flex items-center justify-center rounded-xl outline-none ring-offset-background transition-transform hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-ring"
        >
          <img
            src={badgeUrl}
            alt={name}
            className={`h-24 w-24 object-contain transition-opacity ${isLocked ? "opacity-40" : ""}`}
          />
          {isLocked ? (
            <span className="absolute bottom-[16px] right-[12px] inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#C3DDFD] bg-[#3F83F8] shadow-md">
              <img src={LOCK_ICON_URL} alt="" className="size-3.5 object-contain" />
              <span className="sr-only">Locked</span>
            </span>
          ) : displayCountLabel ? (
            <span
              className="absolute bottom-[16px] right-[4px]  inline-flex items-center justify-center gap-2 rounded-[56px] border border-[#C3DDFD] bg-[#EBF5FF] px-[10px] py-1 text-[12px] font-semibold leading-4 text-[#3F83F8]"
              style={{ fontFamily: "Poppins, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}
            >
              {displayCountLabel}
            </span>
          ) : null}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content
          className={`fixed z-50 border shadow-xl outline-none ${drawer
            ? "inset-x-0 bottom-0 w-full max-h-[90vh] rounded-t-2xl bg-white data-[state=open]:animate-in data-[state=closed]:animate-out"
            : "left-1/2 top-1/2 w-[min(92vw,524px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white data-[state=open]:animate-in data-[state=closed]:animate-out"
            }`}
        >

          <div
            className="relative overflow-hidden rounded-t-2xl pb-10 pt-4 sm:pt-5"
            style={{
              backgroundColor: themeBackgroundColor,
              borderBottomLeftRadius: "50% 12%",
              borderBottomRightRadius: "50% 12%",
            }}
          >
            <img
              src={themeBackgroundUrl}
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-0 h-full w-full select-none object-cover object-top"
            />
            <div className="relative z-10 px-4 sm:px-5">
              <Dialog.Close className="absolute right-3 top-3 z-20 inline-flex size-9 cursor-pointer items-center justify-center rounded-md border bg-white/95 text-foreground pointer-events-auto transition-colors hover:bg-white">
                <X className="size-4" />
                <span className="sr-only">Close</span>
              </Dialog.Close>

              <div className="mx-auto mb-4 flex w-full max-w-[340px] justify-center">
                <div className="relative inline-flex">
                  <img
                    src={badgeUrl}
                    alt={name}
                    className={`h-48 w-auto max-w-full object-contain transition-opacity`}
                  />
                  {isLocked ? (
                    <span className="absolute bottom-3 left-1/2 z-10 inline-flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-[#C3DDFD] bg-[#3F83F8] shadow-md">
                      <img
                        src={LOCK_ICON_URL}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 shrink-0 object-contain"
                      />
                      <span className="sr-only">Locked</span>
                    </span>
                  ) : displayCountLabel ? (
                    <span
                      className="absolute bottom-5 right-10 z-10 inline-flex items-center justify-center gap-2 rounded-[56px] border border-[#C3DDFD] bg-[#EBF5FF] px-4 py-2 text-sm font-semibold leading-5 text-[#3F83F8]"
                      style={{ fontFamily: "Poppins, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}
                    >
                      {displayCountLabel}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2 text-center">
                <Dialog.Title className="text-3xl font-extrabold tracking-tight text-slate-900">
                  {name}
                </Dialog.Title>
                <Dialog.Description className="mx-auto max-w-[460px] text-lg leading-relaxed text-slate-600">
                  {detailText}
                </Dialog.Description>
              </div>

              {!isLocked ? (
                <div className="mt-5 flex justify-center">
                  <p className="rounded-full border border-blue-300 bg-white/80 px-4 py-2 text-base font-medium text-blue-600">
                    {`${isRepeatedUnlock ? "First unlocked on" : "Unlocked on"} ${unlockedText}`}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
          {!isLocked ? (
            <div
              className={`${drawer ? "px-[16px]" : "px-[16px] sm:px-[72px]"} pb-[24px] mt-[32px] flex justify-center`}
            >
              <a
                href={linkedinShareHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <span
                  className={`cursor-pointer inline-flex items-center justify-center gap-3 rounded-2xl bg-[#6f67c7] py-3 text-[14px] font-[500] leading-[24px] text-white transition-colors hover:bg-[#625ab9] ${drawer ? "px-4" : "px-4 sm:px-[72px]"}`}
                >
                  <img src={LINKEDIN_ICON_URL} alt="" className="h-6 w-6 object-contain" />
                  Share With Your Network
                </span>
              </a>
            </div>
          ) : null}

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { Badge }
export type { BadgeProps }
