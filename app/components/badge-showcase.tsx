import { Badge } from "@/registry/components/badge"

export function BadgeShowcase() {
  return (
    <div className="flex flex-col gap-4 border rounded-lg p-4">
      <h2 className="text-sm text-muted-foreground sm:pl-3">
        Badge: click image to open card in modal or bottom drawer.
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-8 py-4">
        <Badge
          name="Practice Leader"
          description="Earned for showing up and staying committed, every session"
          badgeUrl="https://coding-platform.s3.amazonaws.com/dev/lms/tickets/2c174f69-adcf-47e8-b69c-a5c70fd698b6/UBx1eiynLZdmuhyi.png"
          isLocked={false}
          openIn="modal"
          theme="theme1"
          firstUnlockedDate="2026-03-12"
          countLabel="2"
        />
        <Badge
          name="Consistent Contributor"
          description="Earned for showing up and staying committed, every session"
          badgeUrl="https://coding-platform.s3.amazonaws.com/dev/lms/tickets/2c174f69-adcf-47e8-b69c-a5c70fd698b6/UBx1eiynLZdmuhyi.png"
          isLocked={true}
          openIn="bottom-drawer"
          theme="theme1"
          firstUnlockedDate="2026-05-13"
          lockedBadgeText="Practice Leader Locked"
        />
      </div>
    </div>
  )
}
