"use client"

import { BadgeShowcase } from "@/app/components/badge-showcase"
import { ClubCardPlayground } from "@/app/components/club-card-playground"
import { DiscussionPostCardPlayground } from "@/app/components/discussion-post-card-playground"
import { DocumentationPlayground } from "@/app/components/documentation-playground"
import { EventCardPlayground } from "@/app/components/event-card-playground"
import { HomePageHeader } from "@/app/components/home-page-header"

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <HomePageHeader />
      <main className="flex flex-col flex-1 gap-8">
        <section className="space-y-3" aria-labelledby="club-card-heading">
          <div className="space-y-1">
            <h2 id="club-card-heading" className="text-lg font-semibold">
              Club Card
            </h2>
            <p className="text-sm text-muted-foreground">
              Showing 43 club cards in a single horizontal row.
            </p>
          </div>
          <ClubCardPlayground cardCount={43} />
        </section>

        <section className="space-y-3" aria-labelledby="badge-heading">
          <div className="space-y-1">
            <h2 id="badge-heading" className="text-lg font-semibold">
              Badges
            </h2>
            <p className="text-sm text-muted-foreground">
              Variant and style combinations for badge components.
            </p>
          </div>
          <BadgeShowcase />
        </section>

        <section className="space-y-3" aria-labelledby="event-card-heading">
          <div className="space-y-1">
            <h2 id="event-card-heading" className="text-lg font-semibold">
              Event Card
            </h2>
            <p className="text-sm text-muted-foreground">
              Preview event card states and drawer timeline details.
            </p>
          </div>
          <EventCardPlayground />
        </section>

        <section className="space-y-3" aria-labelledby="documentation-provider-heading">
          <div className="space-y-1">
            <h2 id="documentation-provider-heading" className="text-lg font-semibold">
              Documentation Provider
            </h2>
            <p className="text-sm text-muted-foreground">
              Preview how markdown documentation is rendered and consumed.
            </p>
          </div>
          <DocumentationPlayground />
        </section>

        <section className="space-y-3" aria-labelledby="discussion-post-card-heading">
          <div className="space-y-1">
            <h2 id="discussion-post-card-heading" className="text-lg font-semibold">
              Discussion Post Card
            </h2>
            <p className="text-sm text-muted-foreground">
              Interactive post card with voting and responsive reply drawer.
            </p>
          </div>
          <DiscussionPostCardPlayground />
        </section>
      </main>
    </div>
  )
}
