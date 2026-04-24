"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {
  CalendarDots,
  ChartBar,
  CheckCircle,
  CheckSquareOffset,
  ClipboardText,
  FileText,
  X,
} from "@phosphor-icons/react";
import * as React from "react";

import type { DrawerDirection, EvaluationCardData } from "./types";
import { RichContent } from "./rich-content";
import { formatDecimal } from "./evaluation-card-preview";
import { EvaluationSummaryRow } from "./evaluation-summary-row";

import { cn } from "@/lib/utils";

type EvaluationCardDrawerProps = {
  data: EvaluationCardData;
  heading: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resolvedDirection: Exclude<DrawerDirection, "auto">;
};

function formatDateTime(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function toScoreLabel(
  status: "upcoming" | "not_attempted" | "score_pending" | "completed",
  score: number | null,
) {
  if (status !== "completed" || typeof score !== "number") {
    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
  return `${formatDecimal(score)} CGPA`;
}

type StatBoxProps = {
  title: string;
  value: string | number;
  valueSuffix?: string;
  icon: React.ReactNode;
};

function StatBox({ title, value, valueSuffix, icon }: StatBoxProps) {
  return (
    <div className="flex gap-[12px] rounded-[8px] border border-[#F3F4F6] bg-[#F9FAFB] p-[12px]">
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-white text-[#0694A2]">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[12px] font-[500] leading-[16px] text-[#6B7280]">
          {title}
        </p>
        <p className="mt-[6px] text-[24px] font-[600] leading-[32px] text-[#111928]">
          {value}
          {valueSuffix ? (
            <span className="ml-1 text-[14px] font-[600] leading-[20px] text-[#111928]">
              {valueSuffix}
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}

export function EvaluationCardDrawer({
  data,
  heading,
  open,
  onOpenChange,
  resolvedDirection,
}: EvaluationCardDrawerProps) {
  const [openAccordions, setOpenAccordions] = React.useState<
    Record<string, boolean>
  >(() =>
    data.evaluationDetails.length > 0
      ? { [data.evaluationDetails[0].id]: true }
      : {},
  );

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ease-out data-[state=closed]:opacity-0 data-[state=open]:opacity-100" />
        <Dialog.Content
          className={cn(
            "fixed z-50 border bg-white font-poppins shadow-xl outline-none",
            resolvedDirection === "right"
              ? "right-0 top-0 flex h-svh w-full max-w-[1080px] flex-col border-l transition-transform duration-300 ease-out will-change-transform data-[state=closed]:translate-x-full data-[state=open]:translate-x-0"
              : "bottom-0 left-0 flex max-h-[88svh] w-full flex-col rounded-t-2xl border-t transition-transform duration-300 ease-out will-change-transform data-[state=closed]:translate-y-full data-[state=open]:translate-y-0",
          )}
        >
          <div className="flex items-start justify-between p-4 pb-[0px]">
            <Dialog.Title className="text-[20px] font-[600] leading-[28px] text-[#111928]">
              {heading}
            </Dialog.Title>
            <Dialog.Close className="inline-flex size-8 items-center justify-center rounded-md border text-slate-500 hover:bg-slate-50 hover:text-slate-800">
              <X size={16} />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <StatBox
                title="Average Score"
                value={formatDecimal(data.averageScore)}
                valueSuffix="CGPA"
                icon={<ClipboardText size="24px" color="#6962AC" />}
              />
              <StatBox
                title="Total Evaluations"
                value={data.totalEvaluations}
                icon={<FileText size="24px" color="#0694A2" />}
              />
              <StatBox
                title="Attempted"
                value={data.attemptedEvaluations}
                icon={<CheckSquareOffset size="24px" color="#0E9F6E" />}
              />
              <StatBox
                title="Upcoming"
                value={data.upcomingEvaluations}
                icon={<CalendarDots size="24px" color="#3F83F8" />}
              />
            </div>

            <RichContent
              value={data.evaluationRules}
              className="text-[14px] leading-[20px] text-[#4B5563] [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5"
            />

            <div className="space-y-[20px]">
              {data.evaluationDetails.map((detail) => {
                const isOpen = openAccordions[detail.id] ?? false;
                return (
                  <div
                    key={detail.id}
                    className="overflow-hidden rounded-[8px] border border-[#E5E7EB] bg-white"
                  >
                    <EvaluationSummaryRow
                      title={detail.title}
                      finalWeightage={detail.finalWeightage}
                      finalStatus={detail.finalStatus}
                      finalScore={detail.finalScore}
                      onClick={() =>
                        setOpenAccordions((prev) => ({
                          ...prev,
                          [detail.id]: !isOpen,
                        }))
                      }
                      isExpanded={isOpen}
                    />

                    {isOpen ? (
                      <div className="border-t border-[#E5E7EB] bg-[#F9FAFB] p-4">
                        <div className="mb-3 text-[14px] font-[400] leading-[20px] text-[#4B5563]">
                          {detail.rules}
                        </div>
                        <div className="overflow-hidden rounded-[8px] border border-[#E5E7EB] bg-white">
                          <div className="grid grid-cols-[minmax(0,1fr)_300px_170px] gap-2 bg-[#F9FAFB] px-7 py-2 text-[12px] font-[500] uppercase tracking-[0.24px] text-[#4B5563]">
                            <p>Attempts</p>
                            <p className="text-center">Date</p>
                            <p className="text-center">Score</p>
                          </div>
                          {detail.evaluations.map((evaluation) => (
                            <div
                              key={evaluation.id}
                              className="grid grid-cols-[minmax(0,1fr)_300px_170px] items-center gap-2 border-t border-[#E5E7EB] px-7 py-[18px]"
                            >
                              <p className="truncate text-[14px] font-[500] leading-[20px] text-[#6962AC]">
                                {evaluation.title}
                              </p>
                              <p className="text-center text-[14px] font-[500] leading-[20px] text-[#4B5563]">
                                {formatDateTime(evaluation.schedule)}
                              </p>
                              <p className="text-center text-[28px] text-[0px] font-[500] leading-none text-[#4B5563]">
                                <span className="text-[14px] leading-[20px]">
                                  {toScoreLabel(
                                    evaluation.evaluationStatus,
                                    evaluation.score,
                                  )}
                                </span>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
