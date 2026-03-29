import { DocumentationProvider } from "@/registry/new-york/ui/documentation-provider"

export default function Home() {
  const documentationEndpoint =
    "https://drive.masaischool.com/api/document"

  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
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
            <DocumentationProvider
              productKey="lms"
              placementKey="attendance-configuration-guide"
              endpoint={documentationEndpoint}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
