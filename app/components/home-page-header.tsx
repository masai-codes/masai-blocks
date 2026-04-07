export function HomePageHeader() {
  return (
    <header className="flex flex-col gap-3">
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Masai shadcn registry
      </p>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Masai Blocks</h1>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          This registry exists so we can share UI and components consistently across Masai projects.
          Install pieces with the shadcn CLI against this registry instead of copying files by hand.
        </p>
      </div>
    </header>
  )
}
