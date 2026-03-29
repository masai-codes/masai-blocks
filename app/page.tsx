import { DocumentationProvider } from "@/registry/new-york/ui/documentation-provider"

export default function Home() {
  const documentationEndpoint =
    "https://drive.masaischool.com/api/document"

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
        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[260px] relative">
          <h2 className="text-sm text-muted-foreground sm:pl-3">
            Documentation provider: API content rendered as GitHub-flavored markdown.
          </h2>
          <div className="flex items-center justify-center gap-6 min-h-[180px] relative">
            <DocumentationProvider
              productKey="lms"
              placementKey="test-media"
              endpoint={documentationEndpoint}
            />

          </div>
        </div>
      </main>
    </div>
  )
}
