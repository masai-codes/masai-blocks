export type EvaluationStatus =
  | "upcoming"
  | "not_attempted"
  | "score_pending"
  | "completed"

export type EvaluationItem = {
  id: string | number
  title: string
  schedule: string
  evaluationStartDate?: string
  concludes?: string
  weightage: number
  evaluationStatus: EvaluationStatus
  score: number | null
}

export type EvaluationDetail = {
  id: string
  rules: string
  title: string
  evaluations: EvaluationItem[]
  finalScore: number
  finalWeightage: number
  finalStatus: EvaluationStatus
}

export type EvaluationCardData = {
  evaluationRules: string
  evaluationDetails: EvaluationDetail[]
  averageScore: number
  totalEvaluations: number
  attemptedEvaluations: number
  upcomingEvaluations: number
}

export type EvaluationCardProps = {
  data: EvaluationCardData
  ctaText: string
  drawerHeading: string
  isMobile?: boolean
  className?: string
}
