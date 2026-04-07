import { DocumentationApiResponse } from "./types"

type FetchDocumentationInput = {
  productKey: string
  placementKey: string
  endpoint: string
  signal?: AbortSignal
}

async function fetchDocumentation({
  productKey,
  placementKey,
  endpoint,
  signal,
}: FetchDocumentationInput): Promise<DocumentationApiResponse> {
  const url = new URL(endpoint, window.location.origin)
  url.searchParams.set("productKey", productKey)
  url.searchParams.set("placementKey", placementKey)

  const response = await fetch(url.toString(), {
    method: "GET",
    signal,
  })

  if (!response.ok) {
    throw new Error("Unable to fetch documentation content.")
  }

  return (await response.json()) as DocumentationApiResponse
}

export { fetchDocumentation }
