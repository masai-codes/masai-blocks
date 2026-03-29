export type DocumentationApiResponse = {
  id: string
  productKey: string
  heading: string
  /** GitHub-flavored markdown; may include inline HTML (e.g. `<video>`). */
  content: string
  placementKey: string
  version: number
  updatedAt: string
}
