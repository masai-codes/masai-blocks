"use client"

import * as React from "react"

import { fetchDocumentation } from "./api"
import { DocumentationApiResponse } from "./types"

type UseDocumentationInput = {
  productKey: string
  placementKey: string
  endpoint: string
  enabled: boolean
}

function useDocumentation({
  productKey,
  placementKey,
  endpoint,
  enabled,
}: UseDocumentationInput) {
  const [data, setData] = React.useState<DocumentationApiResponse | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!enabled) return
    if (data) return

    const controller = new AbortController()

    async function run() {
      setIsLoading(true)
      setError(null)

      try {
        const result = await fetchDocumentation({
          productKey,
          placementKey,
          endpoint,
          signal: controller.signal,
        })
        setData(result)
      } catch (err) {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : "Failed to load documentation.")
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    run()

    return () => {
      controller.abort()
    }
  }, [enabled, productKey, placementKey, endpoint, data])

  return { data, isLoading, error }
}

export { useDocumentation }
