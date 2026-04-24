import { CardCtaButton } from "../shared/card-cta-button"
import type { EvaluationCardProps, EvaluationStatus } from "./types"
import { EvaluationSummaryRow } from "./evaluation-summary-row"

import { cn } from "@/lib/utils"

type EvaluationCardPreviewProps = Pick<EvaluationCardProps, "data" | "ctaText" | "className"> & {
  onCtaClick: () => void
}

type StatusPillProps = {
  status: EvaluationStatus
  score?: number | null
  className?: string
  completedTemplate?: "score-only" | "cgpa" | "cgpa-out-of-10"
}

const STATUS_STYLES: Record<EvaluationStatus, string> = {
  upcoming: "bg-[#EBF5FF] text-[#3F83F8]",
  not_attempted: "bg-[#FDF2F2] text-[#F05252]",
  score_pending: "bg-[#FDFDEA] text-[#C27803]",
  completed: "bg-[#F3FAF7] text-[#0E9F6E]",
}

function toLabel(value: EvaluationStatus) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function formatDecimal(value: number) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(2).replace(/\.?0+$/, "")
}

function StatusPill({
  status,
  score,
  className,
  completedTemplate = "score-only",
}: StatusPillProps) {
  const text =
    status === "completed" && typeof score === "number"
      ? completedTemplate === "cgpa-out-of-10"
        ? `${formatDecimal(score)} / 10 (CGPA)`
        : completedTemplate === "cgpa"
          ? `${formatDecimal(score)} CGPA`
          : formatDecimal(score)
      : toLabel(status)

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-[999px] px-2 py-1 text-[11px] font-[500] capitalize",
        STATUS_STYLES[status],
        className,
      )}
    >
      {text}
    </span>
  )
}

export function EvaluationCardPreview({ data, ctaText, className, onCtaClick }: EvaluationCardPreviewProps) {
  return (
    <div
      className={cn(
        "font-poppins w-full max-w-[760px] rounded-[12px] border border-[#E5E7EB] bg-white p-4",
        className,
      )}
    >
      <div className="space-y-2">
        {data.evaluationDetails.map((detail) => (
          <div
            key={detail.id}
            className="overflow-hidden rounded-[8px] border border-[#E5E7EB]"
          >
            <EvaluationSummaryRow
              title={detail.title}
              finalWeightage={detail.finalWeightage}
              finalStatus={detail.finalStatus}
              finalScore={detail.finalScore}
              showChevron={false}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <CardCtaButton text={ctaText} onClick={onCtaClick} theme="purple" />
      </div>
    </div>
  )
}

export { StatusPill, formatDecimal }
