"use client";

import Link from "next/link";

import type { MasaiBreadcrumbRenderLinkProps } from "@/registry/components/masai-breadcrumb";
import { MasaiBreadcrumb } from "@/registry/components/masai-breadcrumb";

function spaLink(props: MasaiBreadcrumbRenderLinkProps) {
  const { href, className, children } = props;
  return (
    <Link
      href={href}
      className={className}
      prefetch={false}
      // Browser extensions (Grammarly, etc.) mutate <a> before hydration; avoid attribute mismatch noise in dev.
      suppressHydrationWarning
      data-grammarly-ignore="true"
    >
      {children}
    </Link>
  );
}

export function MasaiBreadcrumbPlayground() {
  return (
    <div className="space-y-6 rounded-lg border p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">SPA links (next/link)</h3>
        <p className="text-xs text-muted-foreground">
          Pass <code className="rounded bg-muted px-1 py-0.5">renderLink</code> so ancestor crumbs stay
          client-side; the last crumb is always bold plain text (<code className="rounded bg-muted px-1 py-0.5">aria-current=&quot;page&quot;</code>).
        </p>
        <MasaiBreadcrumb
          renderLink={spaLink}
          items={[
            { label: "Home", href: "/" },
            { label: "Learn", href: "/?component=club-card" },
            { label: "Lecture · Advanced React patterns" },
          ]}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Short path</h3>
        <MasaiBreadcrumb
          renderLink={spaLink}
          items={[{ label: "Assignments", href: "/" }, { label: "Homework #4" }]}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Custom spacing</h3>
        <MasaiBreadcrumb
          renderLink={spaLink}
          className="rounded-md bg-muted/50 px-3 py-2"
          items={[
            { label: "Courses", href: "/" },
            { label: "Web 101", href: "/?component=colors" },
            { label: "Resources" },
          ]}
        />
      </div>
    </div>
  );
}
