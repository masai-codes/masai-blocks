"use client"

import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Lock, X } from "lucide-react"

type BadgeProps = {
  name: string
  description: string
  lockedBadgeText?: string
  badgeUrl: string
  countLabel?: string
  isLocked: boolean
  openIn: "bottom-drawer" | "modal"
  bgColor: string
  topographicStrokeColor?: string
  firstUnlockedDate: string | Date
}

const TOPOGRAPHIC_MASK_DATA_URI =
  "data:image/svg+xml,%3Csvg width='530' height='259' viewBox='0 0 530 259' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M123.584 -11.1513L138.355 1.7294L168.022 -4.30203L203.145 11.3834L237.944 0.359901L281.492 14.6114L329.578 11.691L368.263 26.7294L412.797 23.809L441.491 40.0149L484.066 37.0945L503.135 57.3171L548.963 52.4406' stroke='black' stroke-width='0.8'/%3E%3Cpath d='M104.565 16.4385L120.895 30.2147L156.782 24.6126L194.198 40.7197L233.929 29.713L275.144 44.2043L322.157 41.1482L359.926 56.4385L404.111 53.3824L432.152 69.8253L477.208 66.7692L496.658 86.809L540.051 81.2069' stroke='black' stroke-width='0.8'/%3E%3Cpath d='M89.4702 40.398L107.992 54.2861L143.317 48.3673L179.103 64.3578L218.307 53.4476L261.994 67.9764L310.274 64.7119L349.211 79.398L393.956 76.1336L422.803 92.0262L465.574 88.7617L484.31 108.646L529.152 103.349' stroke='black' stroke-width='0.8'/%3E%3Cpath d='M70.0382 66.2591L89.4199 79.8815L127.887 74.446L164.638 90.6462L204.051 79.8815L247.344 94.446L295.422 90.6462L333.366 106.259L378.687 102.459L407.624 118.66L450.115 114.86L469.296 135.214L513.605 129.778' stroke='black' stroke-width='0.8'/%3E%3Cpath d='M53.5736 91.0066L72.8314 104.545L111.049 99.1455L147.575 115.236L186.728 104.545L229.7 119.006L277.428 115.236L314.926 131.007L359.935 127.236L388.678 143.327L431.34 139.557L450.435 159.782L495.267 154.382' stroke='black' stroke-width='0.8'/%3E%3Cpath d='M37.109 115.754L56.3668 129.293L94.584 123.893L131.111 139.984L170.263 129.293L213.235 143.754L260.963 139.984L298.462 155.754L343.47 151.984L372.214 168.074L414.875 164.304L433.97 184.529L478.803 179.129' stroke='black' stroke-width='0.8'/%3E%3Cpath d='M20.6444 140.501L39.9022 154.039L78.1194 148.64L114.646 164.731L153.798 154.039L196.77 168.501L244.498 164.731L281.997 180.501L327.005 176.731L355.749 192.821L398.41 189.051L417.505 209.276L462.338 203.876' stroke='black' stroke-width='0.8'/%3E%3C/svg%3E"

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M6.94 8.5H3.56V20h3.38zM5.25 3A2.03 2.03 0 0 0 3.2 5.03c0 1.1.9 2 2.02 2.02 1.1 0 2.03-.92 2.03-2.02A2.03 2.03 0 0 0 5.25 3M20.8 12.27c0-2.63-1.4-3.85-3.28-3.85-1.5 0-2.16.82-2.54 1.4V8.5h-3.38c.05.88 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.93.28-.68.92-1.38 1.99-1.38 1.4 0 1.96 1.04 1.96 2.56V20h3.38z" />
    </svg>
  )
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
  bgColor,
  topographicStrokeColor = "#FAF4E7",
  firstUnlockedDate,
}: BadgeProps) {
  const unlockedText = formatUnlockedDate(firstUnlockedDate)
  const drawer = openIn === "bottom-drawer"
  const detailText = isLocked ? lockedBadgeText || description : description
  const displayCountLabel = React.useMemo(() => {
    if (!countLabel) return undefined
    const trimmed = countLabel.trim()
    if (!trimmed) return undefined
    return trimmed.toLowerCase().startsWith("x") ? `x${trimmed.slice(1)}` : `x${trimmed}`
  }, [countLabel])
  const linkedinShareHref = React.useMemo(() => {
    const encoded = encodeURIComponent(badgeUrl)
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`
  }, [badgeUrl])

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
            <span className="absolute bottom-[16px] right-[12px] inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#C3DDFD] bg-[#3F83F8] text-white shadow-md">
              <Lock className="size-3.5" />
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
            : "left-1/2 top-1/2 w-[min(92vw,375px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white data-[state=open]:animate-in data-[state=closed]:animate-out"
            }`}
        >

          <div
            className="relative overflow-hidden pb-10 pt-4 sm:pt-5"
            style={{
              backgroundColor: bgColor,
              borderBottomLeftRadius: "50% 12%",
              borderBottomRightRadius: "50% 12%",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-0 h-full"
              style={{
                backgroundColor: topographicStrokeColor,
                maskImage: `url("${TOPOGRAPHIC_MASK_DATA_URI}")`,
                maskPosition: "top center",
                maskRepeat: "no-repeat",
                WebkitMaskImage: `url("${TOPOGRAPHIC_MASK_DATA_URI}")`,
                WebkitMaskPosition: "top center",
                WebkitMaskRepeat: "no-repeat",
              }}
            />
            <div className="relative z-10 px-4 sm:px-5">
              <Dialog.Close className="absolute right-3 top-3 z-20 inline-flex size-9 cursor-pointer items-center justify-center rounded-md border bg-white/95 text-foreground pointer-events-auto transition-colors hover:bg-white">
                <X className="size-4" />
                <span className="sr-only">Close</span>
              </Dialog.Close>

              <div className="relative mx-auto mb-4 flex w-full max-w-[340px] justify-center">
                <img
                  src={badgeUrl}
                  alt={name}
                  className={`h-48 w-full object-contain transition-opacity ${isLocked ? "" : ""}`}
                />
                {isLocked ? (
                  <span className="absolute bottom-[12px] left-1/2 z-10 inline-flex h-[48px] w-[48px] -translate-x-1/2 items-center justify-center rounded-full border border-[#C3DDFD] bg-[#3F83F8] text-white shadow-md">
                    <Lock className="size-[32px]" />
                    <span className="sr-only">Locked</span>
                  </span>
                ) : null}
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
                    {`Unlocked on ${unlockedText}`}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="px-[16px] pb-[24px] mt-[32px]">
            <a
              href={linkedinShareHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full"
            >
              <span className="cursor-pointer inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#6f67c7] px-4 py-3 text-[14px] font-[500] leading-[24px] text-white transition-colors hover:bg-[#625ab9]">
                <LinkedinIcon className="h-6 w-6" />
                Share With Your Network
              </span>
            </a>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { Badge }
export type { BadgeProps }
