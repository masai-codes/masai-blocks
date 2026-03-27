"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { Info, X } from "lucide-react"

type DocumentationField = {
  label: string
  value: string
}

type DocumentationProviderProps = {
  content?: string
  title?: string
  fields?: DocumentationField[]
}

function DocumentationProvider({
  content,
  title = "Documentation",
  fields = [],
}: DocumentationProviderProps) {
  const hasFields = fields.length > 0
  const fallbackContent = content ?? ""

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open documentation"
          className="inline-flex size-9 items-center justify-center rounded-md border bg-background text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Info className="size-4" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[9998] bg-black/30 data-[state=closed]:animate-out data-[state=open]:animate-in" />
        <Dialog.Content className="fixed top-0 right-0 z-[9999] h-full w-full max-w-md border-l bg-white p-6 shadow-xl duration-200 data-[state=closed]:translate-x-full data-[state=open]:translate-x-0">
          <div className="mb-4 flex items-center justify-between gap-2">
            <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close documentation"
                className="inline-flex size-8 items-center justify-center rounded-md border transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <X className="size-4" />
              </button>
            </Dialog.Close>
          </div>

          {hasFields ? (
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.label} className="space-y-1">
                  <p className="text-sm font-medium">{field.label}</p>
                  <p className="text-sm leading-6 text-muted-foreground">{field.value}</p>
                </div>
              ))}
            </div>
          ) : (
            <Dialog.Description asChild>
              <p className="text-sm leading-6 text-muted-foreground">{fallbackContent}</p>
            </Dialog.Description>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { DocumentationProvider }
