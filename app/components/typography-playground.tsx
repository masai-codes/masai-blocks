const TYPOGRAPHY_PREVIEW = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "s1",
  "s2",
  "s3",
  "b1-md",
  "b1-regular",
  "b2-md",
  "b2-regular",
  "b3-md",
  "b3-regular",
  "caption",
  "t1",
  "t2",
] as const

export function TypographyPlayground() {
  return (
    <div className="rounded-lg border p-4">
      <div className="space-y-3">
        {TYPOGRAPHY_PREVIEW.map((token) => (
          <div key={token} className="rounded-md border border-dashed p-3">
            <p className="type-caption text-gray-500">{token}</p>
            <p className={`type-${token}`}>The quick brown fox jumps over the lazy dog.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
