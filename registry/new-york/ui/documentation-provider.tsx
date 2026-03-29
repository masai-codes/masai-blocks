"use client"

import * as React from "react"
import { Info, X } from "lucide-react"

import { DocumentationMarkdown } from "./documentation-provider/markdown"
import { useDocumentation } from "./documentation-provider/use-documentation"

type DocumentationProviderProps = {
  productKey?: string
  placementKey?: string
  endpoint?: string
}

function DocumentationProvider({
  productKey = "lms",
  placementKey = "test-media",
  endpoint = "https://drive.masaischool.com/api/document",
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
  const markdown = data?.content ?? ""

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
        ) : markdown ? (
          <DocumentationMarkdown
            markdown={markdown}
            className="max-w-none text-sm leading-6 text-foreground [&_h1]:mt-6 [&_h1]:mb-3 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:my-2 [&_strong]:font-semibold [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_a]:text-blue-600 [&_a]:underline [&_img]:my-3 [&_img]:max-w-full [&_img]:rounded-md [&_img]:border [&_video]:my-3 [&_video]:max-w-full [&_video]:rounded-md [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:border [&_pre]:bg-muted/40 [&_pre]:p-3 [&_code]:rounded [&_code]:bg-muted/60 [&_code]:px-1 [&_code]:py-0.5 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_table]:my-3 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:bg-muted/50 [&_th]:px-2 [&_th]:py-1.5 [&_th]:text-left [&_td]:border [&_td]:px-2 [&_td]:py-1.5"
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
