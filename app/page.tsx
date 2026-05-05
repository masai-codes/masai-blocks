"use client"

import { Suspense, useEffect, useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { BadgeShowcase } from "@/app/components/badge-showcase"
import { ButtonPlayground } from "@/app/components/button-playground"
import { CheckboxPlayground } from "@/app/components/checkbox-playground"
import { ChipsPlayground } from "@/app/components/chips-playground"
import { ClubCardPlayground } from "@/app/components/club-card-playground"
import { ColorsPlayground } from "@/app/components/colors-playground"
import { DiscussionPostCardPlayground } from "@/app/components/discussion-post-card-playground"
import { DocumentationPlayground } from "@/app/components/documentation-playground"
import { EventCardPlayground } from "@/app/components/event-card-playground"
import { HomePageHeader } from "@/app/components/home-page-header"
import { MasaiTabsPlayground } from "@/app/components/masai-tabs-playground"
import { RadioPlayground } from "@/app/components/radio-playground"
import { ScrollingBannerPlayground } from "@/app/components/scrolling-banner-playground"
import { TabNavbarPlayground } from "@/app/components/tab-navbar-playground"
import { TooltipPlayground } from "@/app/components/tooltip-playground"
import { TypographyPlayground } from "@/app/components/typography-playground"

function HomeContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeSection = searchParams.get("component") ?? "club-card"

  const playgroundSections = useMemo(
    () => [
      {
        id: "colors",
        label: "Colors",
        headingId: "colors-heading",
        description: "Core color scales used across Masai blocks.",
        content: <ColorsPlayground />,
      },
      {
        id: "typography",
        label: "Typography",
        headingId: "typography-heading",
        description: "All supported typography tokens and their rendered preview.",
        content: <TypographyPlayground />,
      },
      {
        id: "button",
        label: "Button",
        headingId: "button-heading",
        description: "All button types, sizes, icon directions, icon-only and disabled variants.",
        content: <ButtonPlayground />,
      },
      {
        id: "radio",
        label: "Radio",
        headingId: "radio-heading",
        description: "Radio button and radio group variants with regular/large sizing and label modes.",
        content: <RadioPlayground />,
      },
      {
        id: "checkbox",
        label: "Checkbox",
        headingId: "checkbox-heading",
        description: "Checkbox and checkbox-group variants with regular/large sizes and label modes.",
        content: <CheckboxPlayground />,
      },
      {
        id: "chips",
        label: "Chips",
        headingId: "chips-heading",
        description: "Chips in regular/large sizes with default, left/right icon and icon-only variants.",
        content: <ChipsPlayground />,
      },
      {
        id: "tooltip",
        label: "Tooltip",
        headingId: "tooltip-heading",
        description: "Tooltip directions (top/bottom/left/right) and CTA variant.",
        content: <TooltipPlayground />,
      },
      {
        id: "club-card",
        label: "Club Card",
        headingId: "club-card-heading",
        description: "Showing 43 club cards in a single horizontal row.",
        content: <ClubCardPlayground cardCount={43} />,
      },
      {
        id: "badge",
        label: "Badges",
        headingId: "badge-heading",
        description: "Variant and style combinations for badge components.",
        content: <BadgeShowcase />,
      },
      {
        id: "event-card",
        label: "Event Card",
        headingId: "event-card-heading",
        description: "Preview event card states and drawer timeline details.",
        content: <EventCardPlayground />,
      },
      {
        id: "documentation-provider",
        label: "Documentation Provider",
        headingId: "documentation-provider-heading",
        description: "Preview how markdown documentation is rendered and consumed.",
        content: <DocumentationPlayground />,
      },
      {
        id: "discussion-post-card",
        label: "Discussion Post Card",
        headingId: "discussion-post-card-heading",
        description: "Interactive post card with voting and responsive reply drawer.",
        content: <DiscussionPostCardPlayground />,
      },
      {
        id: "masai-tabs",
        label: "Masai Tabs",
        headingId: "masai-tabs-heading",
        description: "Pill tabs with parent-controlled selected state.",
        content: <MasaiTabsPlayground />,
      },
      {
        id: "scrolling-banner",
        label: "Scrolling Banner",
        headingId: "scrolling-banner-heading",
        description: "Auto-scrolling latest updates notice board with CTA links.",
        content: <ScrollingBannerPlayground />,
      },
      {
        id: "tab-navbar",
        label: "Tab Navbar",
        headingId: "tab-navbar-heading",
        description: "Icon + label row for mobile-style navigation with parent-controlled selection.",
        content: <TabNavbarPlayground />,
      },
    ],
    []
  )

  useEffect(() => {
    const sectionExists = playgroundSections.some((section) => section.id === activeSection)

    if (!sectionExists && playgroundSections.length > 0) {
      const params = new URLSearchParams(searchParams.toString())
      params.set("component", playgroundSections[0].id)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      return
    }

    const sectionEl = document.getElementById(activeSection)
    if (!sectionEl) return

    sectionEl.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [activeSection, pathname, playgroundSections, router, searchParams])

  const handleNavItemClick = (sectionId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("component", sectionId)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="max-w-7xl mx-auto min-h-svh px-4 py-8">
      <HomePageHeader />
      <main className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="md:sticky md:top-24 md:self-start">
          <nav aria-label="Component playground navigation" className="space-y-1">
            {playgroundSections.map((section) => {
              const isActive = section.id === activeSection

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleNavItemClick(section.id)}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {section.label}
                </button>
              )
            })}
          </nav>
        </aside>

        <div className="flex flex-col flex-1 gap-8">
          {playgroundSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 space-y-3"
              aria-labelledby={section.headingId}
            >
              <div className="space-y-1">
                <h2 id={section.headingId} className="text-lg font-semibold">
                  {section.label}
                </h2>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
              {section.content}
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto min-h-svh max-w-7xl px-4 py-8 text-sm text-muted-foreground">
          Loading playground…
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  )
}
