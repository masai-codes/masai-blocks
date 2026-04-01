"use client"

import * as React from "react"
import { Badge } from "@/registry/new-york/ui/badge"
import { DocumentationProvider } from "@/registry/new-york/ui/documentation-provider"

export default function Home() {
  const [productKey, setProductKey] = React.useState("lms")
  const [placementKey, setPlacementKey] = React.useState("assignments-guide")
  const [documentationEndpoint, setDocumentationEndpoint] = React.useState(
    "https://drive.masaischool.com/api/document"
  )

  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Masai shadcn registry
        </p>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Masai Blocks</h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            This registry exists so we can share UI and components consistently
            across Masai projects. Install pieces with the shadcn CLI against
            this registry instead of copying files by hand.
          </p>
        </div>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col gap-4 border rounded-lg p-4">
          <h2 className="text-sm text-muted-foreground sm:pl-3">
            Badge: click image to open card in modal or bottom drawer.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 py-4">
            <Badge
              name="Practice Leader"
              description="Earned for showing up and staying committed, every session"
              badgeUrl="https://coding-platform.s3.amazonaws.com/dev/lms/tickets/2c174f69-adcf-47e8-b69c-a5c70fd698b6/UBx1eiynLZdmuhyi.png"
              isLocked={false}
              openIn="modal"
              bgColor="#FFE8B526"
              firstUnlockedDate="2026-03-12"
              countLabel="10"
            />
            <Badge
              name="Consistent Contributor"
              description="Earned for showing up and staying committed, every session"
              badgeUrl="https://coding-platform.s3.amazonaws.com/dev/lms/tickets/17df44a8-d6a3-499e-ac53-7c07909c1197/2tPtQYmGeGm2aEHh.png"
              isLocked
              openIn="bottom-drawer"
              bgColor="#FFE8B526"
              firstUnlockedDate="2026-05-13"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[260px] relative">
          <h2 className="text-sm text-muted-foreground sm:pl-3">
            Documentation provider: API content rendered as GitHub-flavored markdown.
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="flex flex-col gap-1 text-xs text-muted-foreground">
              Product key
              <input
                value={productKey}
                onChange={(event) => setProductKey(event.target.value)}
                placeholder="lms"
                className="h-9 rounded-md border bg-background px-3 text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs text-muted-foreground">
              Placement key
              <input
                value={placementKey}
                onChange={(event) => setPlacementKey(event.target.value)}
                placeholder="test-media"
                className="h-9 rounded-md border bg-background px-3 text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs text-muted-foreground sm:col-span-3">
              Endpoint
              <input
                value={documentationEndpoint}
                onChange={(event) => setDocumentationEndpoint(event.target.value)}
                placeholder="https://drive.masaischool.com/api/document"
                className="h-9 rounded-md border bg-background px-3 text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
          </div>
          <div className="flex items-center justify-center gap-6 min-h-[180px] relative">
            <DocumentationProvider
              productKey={productKey}
              placementKey={placementKey}
              endpoint={documentationEndpoint}
              hoverText="Open documentation"
            />

          </div>
        </div>
      </main>
    </div>
  )
}
