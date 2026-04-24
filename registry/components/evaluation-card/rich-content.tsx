import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import type { Options as SanitizeOptions } from "rehype-sanitize";

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

type RichContentProps = {
  value: string;
  className?: string;
};

const sanitizeSchema: SanitizeOptions = {
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
};

function decodeMarkdownPayload(content: string): string {
  if (!content) return "";

  const normalizedContent = content
    .replace(/\\r\\n/g, "")
    .replace(/\\n/g, "")
    .replace(/\\t/g, "");

  if (
    normalizedContent.includes("&lt;") ||
    normalizedContent.includes("&gt;")
  ) {
    const parser = new DOMParser();
    const decoded = parser.parseFromString(normalizedContent, "text/html")
      .documentElement.textContent;
    return decoded ?? normalizedContent;
  }

  return normalizedContent;
}

export function RichContent({ value, className }: RichContentProps) {
  if (!value.trim()) return null;

  return (
    <div
      className={cn(
        "min-w-0 max-w-full break-words [&_a]:break-all [&_code]:break-all [&_li]:min-w-0 [&_li]:whitespace-pre-wrap [&_ol]:min-w-0 [&_p]:min-w-0 [&_p]:whitespace-pre-wrap [&_ul]:min-w-0",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
      >
        {decodeMarkdownPayload(value)}
      </ReactMarkdown>
    </div>
  );
}
