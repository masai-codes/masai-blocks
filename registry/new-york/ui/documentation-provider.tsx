"use client"

import * as React from "react"
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
  const panelWidthPx = 420
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

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches
    if (!isDesktop) return

    const body = document.body
    const previousMarginRight = body.style.marginRight
    const previousTransition = body.style.transition

    body.style.transition = previousTransition
      ? `${previousTransition}, margin-right 220ms ease`
      : "margin-right 220ms ease"
    body.style.marginRight = open ? `${panelWidthPx}px` : "0px"

    return () => {
      body.style.marginRight = previousMarginRight
      body.style.transition = previousTransition
    }
  }, [open])

  React.useEffect(() => {
    if (!open) return

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        aria-label="Open documentation"
        onClick={() => setOpen(true)}
        className="inline-flex size-9 items-center justify-center rounded-md border bg-background text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <Info className="size-4" />
      </button>

      <aside
        aria-hidden={!open}
        className={`fixed top-0 right-0 z-[9999] h-full w-full max-w-[420px] border-l bg-white p-6 shadow-xl transition-transform duration-200 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">{heading}</h2>
          <button
            type="button"
            aria-label="Close documentation"
            onClick={() => setOpen(false)}
            className="inline-flex size-8 items-center justify-center rounded-md border transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {isLoading ? (
          <p className="text-sm leading-6 text-muted-foreground">Loading documentation...</p>
        ) : error ? (
          <p className="text-sm leading-6 text-red-600">{error}</p>
        ) : contentHtml ? (
          <div
            className="max-w-none text-sm leading-6 text-foreground [&_h1]:mt-6 [&_h1]:mb-3 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:my-2 [&_strong]:font-semibold [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_a]:text-blue-600 [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        ) : (
          <p className="text-sm leading-6 text-muted-foreground">
            No documentation content available.
          </p>
        )}
      </aside>
    </>
  )
}

export { DocumentationProvider }
