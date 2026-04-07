"use client"

import { BadgeShowcase } from "@/app/components/badge-showcase"
import { DocumentationPlayground } from "@/app/components/documentation-playground"
import { HomePageHeader } from "@/app/components/home-page-header"
import { ClubCard } from "@/registry/components/club-card"

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
          <div className="w-full overflow-x-auto">
            <div className="flex w-max gap-4 pb-2">
              {Array.from({ length: 43 }).map((_, index) => (
                <ClubCard
                  key={`club-card-${index}`}
                  domain="Tech Community"
                  name={`Frontend Club ${index + 1}`}
                  imageUrl="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=400&q=80"
                  miniDescription="Weekly frontend meetups, code reviews, and interview prep sessions."
                  ctaText="View Details"
                  onCtaClick={() => console.log(`Club card ${index + 1} CTA clicked`)}
                  totalMembers="1240"
                  detailDescription="Frontend Club helps members improve React, JavaScript, and UI engineering with guided sessions and hands-on practice."
                  detailPoints={[
                    "Live sessions every Wednesday",
                    "Peer-led project reviews",
                    "Monthly frontend challenge",
                  ]}
                  drawerDirection="auto"
                  ctaTheme="yellow"
                />
              ))}
            </div>
          </div>
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
      </main>
    </div>
  )
}
