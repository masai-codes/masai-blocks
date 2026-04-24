"use client";

import * as React from "react";

import { demoInputClass } from "@/app/components/demo-field-classes";
import { EvaluationCard } from "@/registry/components/evaluation-card";
import type { EvaluationCardData } from "@/registry/components/evaluation-card";

const demoData: EvaluationCardData = {
  evaluationRules: "Global Evaluation Rules",
  evaluationDetails: [
    {
      id: "4294967295-eval-1",
      rules: "Evaluation Module 1 Rules",
      title: "Evaluation Module 1",
      evaluations: [
        {
          id: 15,
          title: "Evaluation 2",
          schedule: "2026-04-16T00:00:00.000Z",
          evaluationStartDate: "2026-04-16T00:00:00.000Z",
          concludes: "2026-04-16T18:52:00.000Z",
          weightage: 20,
          evaluationStatus: "completed",
          score: 7,
        },
        {
          id: 14,
          title: "Evaluation 1",
          schedule: "2026-04-16T00:00:00.000Z",
          evaluationStartDate: "2026-04-16T00:00:00.000Z",
          concludes: "2026-04-16T18:52:00.000Z",
          weightage: 10,
          evaluationStatus: "completed",
          score: 5,
        },
        {
          id: 16,
          title: "Evaluation 3",
          schedule: "2026-04-23T00:00:00.000Z",
          evaluationStartDate: "2026-04-23T00:00:00.000Z",
          concludes: "2026-04-26T00:00:00.000Z",
          weightage: 10,
          evaluationStatus: "completed",
          score: 8.5,
        },
      ],
      finalScore: 8.5,
      finalWeightage: 13.33,
      finalStatus: "completed",
    },
    {
      id: "4294967295-eval-2",
      rules: "Evaluation Module 2 Rules",
      title: "Evaluation Module 2",
      evaluations: [
        {
          id: 18,
          title: "Evaluation 5",
          schedule: "2026-04-23T00:00:00.000Z",
          evaluationStartDate: "2026-04-23T00:00:00.000Z",
          concludes: "2026-04-26T00:00:00.000Z",
          weightage: 10,
          evaluationStatus: "score_pending",
          score: 0,
        },
        {
          id: 17,
          title: "Evaluation 4",
          schedule: "2026-04-20T00:00:00.000Z",
          evaluationStartDate: "2026-04-20T00:00:00.000Z",
          concludes: "2026-04-21T00:00:00.000Z",
          weightage: 20,
          evaluationStatus: "not_attempted",
          score: 0,
        },
        {
          id: 19,
          title: "Evaluation 6",
          schedule: "2026-04-23T00:00:00.000Z",
          evaluationStartDate: "2026-04-23T00:00:00.000Z",
          concludes: "2026-04-26T00:00:00.000Z",
          weightage: 20,
          evaluationStatus: "completed",
          score: 9,
        },
      ],
      finalScore: 9,
      finalWeightage: 16.67,
      finalStatus: "score_pending",
    },
    {
      id: "4294967295-eval-3",
      rules: "Evaluation Module 3 Rules",
      title: "Evaluation Module 3",
      evaluations: [
        {
          id: 21,
          title: "Evaluation 8",
          schedule: "2026-04-23T00:00:00.000Z",
          evaluationStartDate: "2026-04-23T00:00:00.000Z",
          concludes: "2026-04-24T00:00:00.000Z",
          weightage: 20,
          evaluationStatus: "not_attempted",
          score: 0,
        },
        {
          id: 20,
          title: "Evaluation 7",
          schedule: "2026-04-23T00:00:00.000Z",
          evaluationStartDate: "2026-04-23T00:00:00.000Z",
          concludes: "2026-04-24T00:00:00.000Z",
          weightage: 10,
          evaluationStatus: "not_attempted",
          score: 0,
        },
        {
          id: 22,
          title: "Evaluation 9",
          schedule: "2026-04-23T00:00:00.000Z",
          evaluationStartDate: "2026-04-23T00:00:00.000Z",
          concludes: "2026-04-24T00:00:00.000Z",
          weightage: 10,
          evaluationStatus: "not_attempted",
          score: 0,
        },
      ],
      finalScore: 0,
      finalWeightage: 13.33,
      finalStatus: "not_attempted",
    },
    {
      id: "4294967295-eval-4",
      rules: "Evaluation Module 4 Rules",
      title: "Evaluation Module 4",
      evaluations: [
        {
          id: 25,
          title: "Evaluation 12",
          schedule: "2026-04-23T00:00:00.000Z",
          evaluationStartDate: "2026-04-23T00:00:00.000Z",
          concludes: "2026-04-26T00:00:00.000Z",
          weightage: 20,
          evaluationStatus: "score_pending",
          score: 0,
        },
        {
          id: 24,
          title: "Evaluation 11",
          schedule: "2026-04-23T00:00:00.000Z",
          evaluationStartDate: "2026-04-23T00:00:00.000Z",
          concludes: "2026-04-26T00:00:00.000Z",
          weightage: 10,
          evaluationStatus: "score_pending",
          score: 0,
        },
        {
          id: 23,
          title: "Evaluation 10",
          schedule: "2026-04-25T00:00:00.000Z",
          evaluationStartDate: "2026-04-25T00:00:00.000Z",
          concludes: "2026-04-26T00:00:00.000Z",
          weightage: 20,
          evaluationStatus: "upcoming",
          score: 0,
        },
        {
          id: 26,
          title: "Evaluation 13",
          schedule: "2026-04-23T00:00:00.000Z",
          evaluationStartDate: "2026-04-23T00:00:00.000Z",
          concludes: "2026-04-26T00:00:00.000Z",
          weightage: 20,
          evaluationStatus: "not_attempted",
          score: null,
        },
      ],
      finalScore: 0,
      finalWeightage: 17.5,
      finalStatus: "upcoming",
    },
  ],
  averageScore: 4.25,
  totalEvaluations: 4,
  attemptedEvaluations: 1,
  upcomingEvaluations: 1,
};

export function EvaluationCardPlayground() {
  const [ctaText, setCtaText] = React.useState("View Assignment Report");
  const [drawerHeading, setDrawerHeading] = React.useState("Assignment Report");
  const [isMobile, setIsMobile] = React.useState(false);

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4">
      <h2 className="text-sm text-muted-foreground sm:pl-3">
        Evaluation card with summary rows and assignment report drawer.
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          CTA text
          <input
            value={ctaText}
            onChange={(e) => setCtaText(e.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Drawer heading
          <input
            value={drawerHeading}
            onChange={(e) => setDrawerHeading(e.target.value)}
            className={demoInputClass}
          />
        </label>
        <label className="flex items-center gap-2 text-xs text-muted-foreground mt-5">
          <input
            type="checkbox"
            checked={isMobile}
            onChange={(e) => setIsMobile(e.target.checked)}
          />
          Open as mobile (bottom drawer)
        </label>
      </div>

      <div className="flex justify-center py-4">
        <EvaluationCard
          data={demoData}
          ctaText={ctaText}
          drawerHeading={drawerHeading}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}
