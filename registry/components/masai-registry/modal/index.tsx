"use client"

import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"

type ModalSize = "sm" | "md" | "lg" | "xl" | "full"

const MODAL_SIZE_CLASSNAME: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[96vw]",
}

function cn(...inputs: Array<string | undefined | false | null>) {
  return inputs.filter(Boolean).join(" ")
}

export type ModalProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  size?: ModalSize
  showCloseButton?: boolean
  closeButtonLabel?: string
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  className?: string
  overlayClassName?: string
  contentClassName?: string
  modal?: boolean
}

export function Modal({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  size = "md",
  showCloseButton = true,
  closeButtonLabel = "Close modal",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  overlayClassName,
  contentClassName,
  modal = true,
}: ModalProps) {
  return (
    <Dialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out",
            overlayClassName
          )}
        />
        <Dialog.Content
          onPointerDownOutside={(event) => {
            if (!closeOnOverlayClick) {
              event.preventDefault()
            }
          }}
          onEscapeKeyDown={(event) => {
            if (!closeOnEscape) {
              event.preventDefault()
            }
          }}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[92vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl outline-none",
            MODAL_SIZE_CLASSNAME[size],
            className
          )}
        >
          <div className={cn("flex max-h-[90vh] flex-col", contentClassName)}>
            {(title || description || showCloseButton) && (
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
                <div className="min-w-0">
                  {title ? (
                    <Dialog.Title className="text-lg font-semibold text-slate-900">
                      {title}
                    </Dialog.Title>
                  ) : null}
                  {description ? (
                    <Dialog.Description className="mt-1 text-sm text-slate-600">
                      {description}
                    </Dialog.Description>
                  ) : null}
                </div>
                {showCloseButton ? (
                  <Dialog.Close
                    aria-label={closeButtonLabel}
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                  >
                    <X className="size-4" />
                  </Dialog.Close>
                ) : null}
              </div>
            )}

            <div className="overflow-y-auto px-5 py-4">{children}</div>

            {footer ? (
              <div className="border-t border-slate-100 px-5 py-4">{footer}</div>
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export type { ModalSize }
