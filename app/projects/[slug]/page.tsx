import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { projects } from "@/content/projects"
import { glp1CaseStudy } from "@/content/case-studies/glp1-pharmacovigilance"
import { rweStudioCaseStudy } from "@/content/case-studies/real-world-evidence-studio"
import { healthcareReferralCaseStudy } from "@/content/case-studies/healthcare-referral-analytics"
import type { CaseStudy } from "@/content/case-studies/types"
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero"
import { CaseStudyTemplate } from "@/components/case-study/CaseStudyTemplate"
import { DataPipelineDiagram } from "@/components/case-study/DataPipelineDiagram"
import { StudyDesignDiagram } from "@/components/case-study/StudyDesignDiagram"
import { RwePipelineDiagram } from "@/components/case-study/RwePipelineDiagram"
import { RweCohortDesignDiagram } from "@/components/case-study/RweCohortDesignDiagram"
import { ReferralWorkflowDiagram } from "@/components/case-study/ReferralWorkflowDiagram"
import { ReferralNetworkDiagram } from "@/components/case-study/ReferralNetworkDiagram"

// ── Case study registry ───────────────────────────────────────────────────────

interface CaseStudyEntry {
  data: CaseStudy
  workflowDiagram?: ReactNode
  methodologyDiagram?: ReactNode
}

const caseStudyMap: Record<string, CaseStudyEntry> = {
  "glp1-pharmacovigilance": {
    data: glp1CaseStudy,
    workflowDiagram: <DataPipelineDiagram />,
    methodologyDiagram: <StudyDesignDiagram className="mb-6" />,
  },
  "real-world-evidence-studio": {
    data: rweStudioCaseStudy,
    workflowDiagram: <RwePipelineDiagram />,
    methodologyDiagram: <RweCohortDesignDiagram className="mb-6" />,
  },
  "healthcare-referral-analytics": {
    data: healthcareReferralCaseStudy,
    workflowDiagram: <ReferralWorkflowDiagram />,
    methodologyDiagram: <ReferralNetworkDiagram className="mb-6" />,
  },
}

// ── Static params: derived from registry to stay in sync ─────────────────────
export async function generateStaticParams() {
  return Object.keys(caseStudyMap).map((slug) => ({ slug }))
}

// Unknown slugs return 404 at build time
export const dynamicParams = false

// ── Page metadata ─────────────────────────────────────────────────────────────
interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return { title: "Not Found" }

  return {
    title: project.title,
    description: project.shortDescription,
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params

  const project = projects.find((p) => p.slug === slug)
  const entry = caseStudyMap[slug]

  if (!project || !project.hasCaseStudy || !entry) {
    notFound()
  }

  return (
    <>
      <CaseStudyHero project={project} caseStudy={entry.data} />
      <CaseStudyTemplate
        project={project}
        caseStudy={entry.data}
        workflowDiagram={entry.workflowDiagram}
        methodologyDiagram={entry.methodologyDiagram}
      />
    </>
  )
}
