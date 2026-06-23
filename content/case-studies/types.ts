// ── Shared case-study types ──────────────────────────────────────────────────
// All case study content files import from here.
// glp1-pharmacovigilance.ts re-exports these for backward compatibility.

export type DataSource = {
  name: string
  acronym: string
  type: string
  period: string
  scale: string
  tables?: string[]
  notes: string
}

export type WorkflowStep = {
  step: number
  label: string
  description: string
  output: string
  tech: string[]
}

export type Method = {
  name: string
  type: "primary" | "sensitivity" | "quality" | "validation"
  description: string
  purpose: string
}

export type Limitation = {
  id: string
  title: string
  description: string
  mitigation: string
}

export type TechCategory = {
  category: string
  items: string[]
}

export type DataScaleItem = {
  label: string
  value: string
}

export type OutputPreview = {
  id: string
  title: string
  description: string
  visualType:
    | "forest-plot"
    | "trend-chart"
    | "table"
    | "bar-chart"
    | "picot-interface"
    | "sql-preview"
    | "network"
    | "matrix"
    | "rwe-attrition-funnel"
    | "rwe-sql-workspace"
    | "rwe-baseline-balance"
    | "rwe-evidence-brief"
    | "genomics-score-distribution"
    | "genomics-score-map"
    | "genomics-scored-table"
    | "strategy-care-pathway"
    | "strategy-payer-landscape"
    | "strategy-sensitivity-matrix"
  isPlaceholder: boolean
  imageSrc?: string
  imageAlt?: string
}

export type CaseStudy = {
  slug: string
  title: string
  subtitle: string
  positioning: string
  summary: string[]
  researchQuestion: string
  context: {
    motivation: string
    background: string
  }
  role: {
    title: string
    summary: string
    responsibilities: string[]
  }
  dataSources: DataSource[]
  dataScale: {
    items: DataScaleItem[]
  }
  exposures?: string[]
  workflowSteps: WorkflowStep[]
  methods: Method[]
  outputPreviews: OutputPreview[]
  dataQualityMeasures: string[]
  limitations: Limitation[]
  technologies: TechCategory[]
  lessonsLearned: string[]
  nextSteps: string[]
  results?: string[]
  resultsTitle?: string
  resultsTocLabel?: string
  resultsProvenance?: string
  dataSourcesTitle?: string
  outputDisclosure?: string
  outputLayout?: "grid" | "stacked"
}
