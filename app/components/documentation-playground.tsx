"use client"

import * as React from "react"
import { DocumentationProvider } from "@/registry/components/documentation-provider"
import { demoInputClass } from "@/app/components/demo-field-classes"

export function DocumentationPlayground() {
  const [productKey, setProductKey] = React.useState("lms")
  const [placementKey, setPlacementKey] = React.useState("assignments-guide")
  const [documentationEndpoint, setDocumentationEndpoint] = React.useState(
    "https://drive.masaischool.com/api/document"
  )

  return (
    <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[260px] relative">
      <h2 className="text-sm text-muted-foreground sm:pl-3">
        Documentation provider: API content rendered as GitHub-flavored markdown.
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Product key
          <input
            value={productKey}
            onChange={(e) => setProductKey(e.target.value)}
            placeholder="lms"
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Placement key
          <input
            value={placementKey}
            onChange={(e) => setPlacementKey(e.target.value)}
            placeholder="test-media"
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground sm:col-span-3">
          Endpoint
          <input
            value={documentationEndpoint}
            onChange={(e) => setDocumentationEndpoint(e.target.value)}
            placeholder="https://drive.masaischool.com/api/document"
            className={demoInputClass}
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
  )
}
