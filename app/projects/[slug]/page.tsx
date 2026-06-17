import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { projects } from "@/content/projects"
import { glp1CaseStudy } from "@/content/case-studies/glp1-pharmacovigilance"
import type { CaseStudy } from "@/content/case-studies/glp1-pharmacovigilance"
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero"
import { CaseStudyTemplate } from "@/components/case-study/CaseStudyTemplate"

// ── Static params: derived from caseStudyMap to stay in sync ─────────────────
export async function generateStaticParams() {
  return Object.keys(caseStudyMap).map((slug) => ({ slug }))
}

// Unknown slugs return 404 at build time
export const dynamicParams = false

// ── Case study content registry ────────────────────────────────────────────────
const caseStudyMap: Record<string, CaseStudy> = {
  "glp1-pharmacovigilance": glp1CaseStudy,
}

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
  const caseStudy = caseStudyMap[slug]

  if (!project || !project.hasCaseStudy || !caseStudy) {
    notFound()
  }

  return (
    <>
      <CaseStudyHero project={project} caseStudy={caseStudy} />
      <CaseStudyTemplate project={project} caseStudy={caseStudy} />
    </>
  )
}
