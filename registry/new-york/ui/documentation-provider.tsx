"use client"

import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Info, X } from "lucide-react"

import { useDocumentation } from "./documentation-provider/use-documentation"

type DocumentationProviderProps = {
  productKey: string
  placementKey: string
  endpoint: string
}

function getRenderableHtml(content: string): string {
  if (!content) return ""

  // Some APIs return escaped HTML (&lt;p&gt;...&lt;/p&gt;). Decode it first.
  if (content.includes("&lt;") || content.includes("&gt;")) {
    const parser = new DOMParser()
    const decoded = parser.parseFromString(content, "text/html").documentElement.textContent
    return decoded ?? content
  }

  return content
}

function DocumentationProvider({
  productKey,
  placementKey,
  endpoint,
}: DocumentationProviderProps) {
  const [open, setOpen] = React.useState(false)
  const { data, isLoading, error } = useDocumentation({
    productKey,
    placementKey,
    endpoint,
    enabled: open,
  })
  const heading = data?.heading ?? "Documentation"
  const contentHtml = React.useMemo(
    () => getRenderableHtml(data?.content ?? ""),
    [data?.content]
  )

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
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
            <Dialog.Title className="text-lg font-semibold">{heading}</Dialog.Title>
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

          {isLoading ? (
            <Dialog.Description asChild>
              <p className="text-sm leading-6 text-muted-foreground">Loading documentation...</p>
            </Dialog.Description>
          ) : error ? (
            <Dialog.Description asChild>
              <p className="text-sm leading-6 text-red-600">{error}</p>
            </Dialog.Description>
          ) : contentHtml ? (
            <div
              className="prose prose-sm max-w-none text-foreground"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : (
            <Dialog.Description asChild>
              <p className="text-sm leading-6 text-muted-foreground">
                No documentation content available.
              </p>
            </Dialog.Description>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { DocumentationProvider }
