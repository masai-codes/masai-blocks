"use client"

import * as React from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"
import remarkGfm from "remark-gfm"
import type { Options as SanitizeOptions } from "rehype-sanitize"

/** Extends GitHub-style defaults with `<video>` and `<source>` for embedded media. */
const documentationSanitizeSchema: SanitizeOptions = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), "video"],
  attributes: {
    ...(defaultSchema.attributes ?? {}),
    video: [
      "src",
      "controls",
      "poster",
      "preload",
      "playsInline",
      "muted",
      "loop",
      "width",
      "height",
    ],
    source: [...(defaultSchema.attributes?.source ?? []), "src", "type"],
  },
}

function decodeMarkdownPayload(content: string): string {
  if (!content) return ""

  // Some APIs return escaped markup (&lt;video ...&gt;). Decode so markdown/HTML parses.
  if (content.includes("&lt;") || content.includes("&gt;")) {
    const parser = new DOMParser()
    const decoded = parser.parseFromString(content, "text/html").documentElement.textContent
    return decoded ?? content
  }

  return content
}

type DocumentationMarkdownProps = {
  markdown: string
  className?: string
}

function DocumentationMarkdown({ markdown, className }: DocumentationMarkdownProps) {
  const decoded = React.useMemo(() => decodeMarkdownPayload(markdown), [markdown])

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, documentationSanitizeSchema]]}
      >
        {decoded}
      </ReactMarkdown>
    </div>
  )
}

export { DocumentationMarkdown, decodeMarkdownPayload }
