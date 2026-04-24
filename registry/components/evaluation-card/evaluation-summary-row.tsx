import { CaretDown } from "@phosphor-icons/react";

import type { EvaluationStatus } from "./types";
import { StatusPill, formatDecimal } from "./evaluation-card-preview";

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

type EvaluationSummaryRowProps = {
  title: string;
  finalWeightage: number;
  finalStatus: EvaluationStatus;
  finalScore: number | null;
  onClick?: () => void;
  isExpanded?: boolean;
  showChevron?: boolean;
  className?: string;
};

export function EvaluationSummaryRow({
  title,
  finalWeightage,
  finalStatus,
  finalScore,
  onClick,
  isExpanded = false,
  showChevron = true,
  className,
}: EvaluationSummaryRowProps) {
  const Container = onClick ? "button" : "div";

  return (
    <Container
      type={onClick ? "button" : undefined}
      className={cn(
        "relative grid w-full grid-cols-3 items-center gap-2 bg-white px-4 py-4 text-left",
        showChevron && "pr-10",
        onClick && "hover:bg-[#FAFAFA]",
        className,
      )}
      onClick={onClick}
    >
      <p className="truncate text-[16px] font-[600] leading-[24px] text-[#000000]">
        {title}
      </p>
      <p className="text-center text-[14px] font-[500] leading-[20px] text-[#374151]">
        {formatDecimal(finalWeightage)}% weightage
      </p>
      <div className="flex justify-end">
        <StatusPill
          status={finalStatus}
          score={finalScore}
          completedTemplate="cgpa-out-of-10"
          className="px-4 py-1 text-[14px] font-[600] normal-case"
        />
      </div>
      {showChevron ? (
        <CaretDown
          size={16}
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] transition-transform",
            isExpanded && "rotate-180",
          )}
        />
      ) : null}
    </Container>
  );
}
