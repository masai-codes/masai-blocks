"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import type { ClubCardProps, DrawerDirection } from "./types"

type ClubCardDrawerProps = Pick<
  ClubCardProps,
  "domain" | "name" | "imageUrl" | "totalMembers" | "detailPoints" | "detailDescription"
> & {
  open: boolean
  onOpenChange: (open: boolean) => void
  resolvedDirection: Exclude<DrawerDirection, "auto">
}

export function ClubCardDrawer({
  domain,
  name,
  imageUrl,
  totalMembers,
  detailPoints,
  detailDescription,
  open,
  onOpenChange,
  resolvedDirection,
}: ClubCardDrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ease-out data-[state=closed]:opacity-0 data-[state=open]:opacity-100" />
        <Dialog.Content
          className={`fixed z-50 border bg-white shadow-xl outline-none ${
            resolvedDirection === "right"
              ? "right-0 top-0 h-svh w-full max-w-[420px] border-l transition-transform duration-300 ease-out will-change-transform data-[state=closed]:translate-x-full data-[state=open]:translate-x-0"
              : "bottom-0 left-0 w-full max-h-[88svh] rounded-t-2xl border-t transition-transform duration-300 ease-out will-change-transform data-[state=closed]:translate-y-full data-[state=open]:translate-y-0"
          }`}
        >
          <div className="flex items-start justify-between border-b p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{domain}</p>
              <Dialog.Title className="mt-1 text-lg font-semibold text-slate-900">{name}</Dialog.Title>
            </div>
            <Dialog.Close className="inline-flex size-8 items-center justify-center rounded-md border text-slate-500 hover:bg-slate-50 hover:text-slate-800">
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <div className="space-y-5 overflow-y-auto p-4">
            <img
              src={imageUrl}
              alt={name}
              className="h-40 w-full rounded-xl border border-slate-200 object-cover"
            />
            <p className="text-sm leading-relaxed text-slate-700">{detailDescription}</p>
            <p className="text-sm font-medium text-slate-800">Total members: {totalMembers}</p>

            <div>
              <h4 className="text-sm font-semibold text-slate-900">Details</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-700">
                {detailPoints.map((point, index) => (
                  <li key={`${point}-${index}`}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
