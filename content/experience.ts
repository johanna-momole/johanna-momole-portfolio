// Single source of truth for professional history.
// Used by the /experience page and related components.
// period: null means the date range is not publicly confirmed.

export type ExperienceMetric = {
  value: string
  label: string
  context: string
}

export type ExperienceRole = {
  id: string
  title: string
  subtitle?: string
  organization: string
  location: string
  period: string | null
  type: "employment" | "research" | "education" | "consulting"
  domain: string
  chapterNumber: string
  chapterEra: string
  summary: string
  highlights: string[]
  metrics: ExperienceMetric[] | null
  technologies: string[]
  linkedProjectSlugs: string[]
}

export type EducationEntry = {
  id: string
  degree: string
  institution: string
  location: string
  year: string
  gpa: string
  award: string
  awardDetail: string
  highlights: string[]
}

export type SkillGroup = {
  heading: string
  items: string[]
}

export type Publication = {
  id: string
  authors: string
  title: string
  journal: string
  volume: string
  pages: string
  publishedOnline: string
  doi: string
  url: string
  type: "peer-reviewed" | "preprint" | "book-chapter"
}

// ── Roles (forward chronological for the Experience page narrative) ───────────

export const experienceRoles: ExperienceRole[] = [
  {
    id: "itb",
    title: "Bioinformatics Research Analyst",
    organization: "School of Life Sciences & Technology, Institut Teknologi Bandung",
    location: "Bandung, Indonesia",
    period: "2020 - 2023",
    type: "research",
    domain: "Bioinformatics Research",
    chapterNumber: "01",
    chapterEra: "Research",
    summary:
      "Conducted bioinformatics research at the School of Life Sciences and Technology, Institut Teknologi Bandung, working on metagenomics and metatranscriptomics projects that characterized microbial communities from environmental and clinical samples. Applied computational tools to process, align, and annotate sequencing data, building the technical foundation for later applied analytical work in healthcare settings.",
    highlights: [
      "Conducted metagenomics and metatranscriptomics analysis characterizing microbial communities from environmental and clinical samples",
      "Applied Mothur for amplicon-based microbiome analysis and community profiling",
      "Used TopHat and Cufflinks for RNA-seq alignment and differential transcript assembly",
      "Developed bioinformatics analysis scripts using Biopython and R",
      "Contributed analytical support across multiple concurrent study workflows",
      "Co-authored a peer-reviewed publication in Agricultural Research on microbial-community changes during banana ripening and chitosan treatment",
    ],
    metrics: null,
    technologies: ["Mothur", "TopHat", "Cufflinks", "Biopython", "R"],
    linkedProjectSlugs: [],
  },
  {
    id: "siloam-lab",
    title: "Biotechnology Analyst",
    organization: "Siloam Hospitals",
    location: "Jakarta, Indonesia",
    period: "2021 - 2022",
    type: "employment",
    domain: "Diagnostic Laboratory",
    chapterNumber: "02",
    chapterEra: "Laboratory",
    summary:
      "Supported molecular and diagnostic laboratory operations at a major Jakarta oncology and cancer care center. Managed COVID-19, HBV, and HCV testing workflows during a period of high demand, and initiated an automation improvement to an extraction and analytical workflow that substantially reduced processing time.",
    highlights: [
      "Managed COVID-19, HBV, and HCV diagnostic laboratory workflows",
      "Supported molecular laboratory operations at a high-volume oncology center",
      "Automated an extraction and analytical workflow, reducing laboratory analysis time by 70%",
    ],
    metrics: [
      {
        value: "70%",
        label: "Reduction in laboratory analysis time",
        context: "Automated extraction and analytical workflow",
      },
    ],
    technologies: [],
    linkedProjectSlugs: [],
  },
  {
    id: "siloam-network",
    title: "Network & Relation Executive (Healthcare Analytics & Strategy)",
    organization: "Siloam Hospitals",
    location: "Jakarta, Indonesia",
    period: "2022 - 2024",
    type: "employment",
    domain: "Healthcare Operations",
    chapterNumber: "03",
    chapterEra: "Operations",
    summary:
      "Led referral network development and provider partnership strategy at Siloam Hospitals, one of Indonesia's largest hospital networks. Focused on expanding partner agreements, developing specialized referral pathways including heart-surgery referrals, and improving internal workflow efficiency. Analytical work on referral patterns and provider performance directly informed network strategy and supported measurable growth outcomes.",
    highlights: [
      "Developed referral growth strategy and managed provider and partner relationships across the network",
      "Added more than 200 partner agreements in 2024, expanding the hospital's regional referral reach",
      "Referral revenue grew 216% in 2024, supported by network expansion and pathway development",
      "Initiated an EMR-related workflow project that reduced processing time by 45.5%",
      "Developed specialized referral pathways, including heart-surgery referral coordination",
    ],
    metrics: [
      {
        value: "216%",
        label: "Referral revenue growth",
        context: "2024, Siloam Hospitals",
      },
      {
        value: "200+",
        label: "Partner agreements added",
        context: "2024, network expansion",
      },
      {
        value: "45.5%",
        label: "Reduction in EMR-related processing time",
        context: "Workflow improvement initiative",
      },
    ],
    technologies: ["SQL", "Python", "Tableau"],
    linkedProjectSlugs: ["healthcare-referral-analytics"],
  },
  {
    id: "penn-mbi",
    title: "Master of Biomedical Informatics",
    organization: "University of Pennsylvania",
    location: "Philadelphia, PA",
    period: "2026",
    type: "education",
    domain: "Biomedical Informatics",
    chapterNumber: "04",
    chapterEra: "Informatics",
    summary:
      "As an LPDP Scholar, supported by the Ministry of Finance of the Republic of Indonesia, I pursued the Master of Biomedical Informatics at Penn to build the technical depth needed to translate clinical context and operational experience into rigorous analytical work. Graduate study brought together epidemiology, clinical data science, health data standards, and machine learning alongside the analytical frameworks used in real-world evidence generation.",
    highlights: [
      "LPDP Scholar, Ministry of Finance, Republic of Indonesia",
      "GPA 3.81 / 4.00",
      "Coursework in real-world evidence, pharmacovigilance, clinical data science, and AI in healthcare",
      "Applied machine learning to public health surveillance data (NHANES, FAERS)",
      "Studied OMOP Common Data Model for standardized cohort design",
      "Developed an analytical product concept for real-world evidence generation (RWE Studio)",
    ],
    metrics: null,
    technologies: ["Python", "R", "SQL", "PostgreSQL", "SAS"],
    linkedProjectSlugs: [
      "glp1-pharmacovigilance",
      "real-world-evidence-studio",
      "hpv-vaccination-analytics",
      "genetic-risk-map",
    ],
  },
  {
    id: "circa",
    title: "Business Analyst - CIRCA",
    subtitle: "Conversational AI for early pregnancy care",
    organization: "Penn Graduate Consulting Club",
    location: "Philadelphia, PA",
    period: "2026 - Present",
    type: "consulting",
    domain: "Healthcare Consulting",
    chapterNumber: "05",
    chapterEra: "Consulting",
    summary:
      "Contributed analytical work to the Penn Graduate Consulting Club's engagement with CIRCA, an early-stage conversational AI platform focused on early pregnancy care. Applied economic modeling and scenario analysis to evaluate healthcare delivery pathways, assess payer and enterprise customer segments, and communicate business case findings to stakeholders at varying technical levels.",
    highlights: [
      "Built an economic model comparing emergency-department and ambulatory-care pathways and documented assumptions for decision-makers",
      "Evaluated payer and enterprise customer segments, translated value drivers into prioritized recommendations, and produced client-ready decks and written reports",
      "Ran sensitivity analyses across unit costs, utilization, adoption, and diversion rates to communicate findings to technical and nontechnical stakeholders",
    ],
    metrics: null,
    technologies: [],
    linkedProjectSlugs: [],
  },
]

// Resume order: reverse chronological, with overlapping roles (ITB/Biotech)
// listed in start-date order per the approved PDF.
// PennMBI (education) is filtered out by the resume page.
const _byId = (id: string) =>
  experienceRoles.find((r) => r.id === id) as ExperienceRole

export const resumeRoles: ExperienceRole[] = [
  _byId("circa"),
  _byId("siloam-network"),
  _byId("itb"),
  _byId("siloam-lab"),
  _byId("penn-mbi"),
]

// ── Education ─────────────────────────────────────────────────────────────────

export const education: EducationEntry[] = [
  {
    id: "penn-mbi",
    degree: "Master of Biomedical Informatics",
    institution: "University of Pennsylvania",
    location: "Philadelphia, PA",
    year: "May 2026",
    gpa: "GPA 3.81 / 4.00",
    award: "LPDP Scholar",
    awardDetail: "Ministry of Finance, Republic of Indonesia",
    highlights: [
      "Real-world evidence and cohort design",
      "Pharmacovigilance and signal detection",
      "Clinical data science and machine learning",
      "Health data standards (OMOP CDM, FHIR)",
      "AI in healthcare",
    ],
  },
]

// ── Skills (verified against project and content layer) ───────────────────────

export const skillGroups: SkillGroup[] = [
  {
    heading: "Programming and Data",
    items: ["Python", "R", "SQL", "SAS", "Excel"],
  },
  {
    heading: "Visualization and Applications",
    items: ["Tableau", "Streamlit", "Shiny", "ggplot2"],
  },
  {
    heading: "Analytical Methods",
    items: [
      "Real-world evidence study design",
      "Pharmacovigilance signal detection",
      "Disproportionality analysis (ROR, PRR)",
      "Cohort design (OMOP CDM)",
      "Propensity score methods",
      "Economic modeling and scenario analysis",
      "Statistical analysis",
      "Machine learning (classification, XGBoost, logistic regression)",
      "Descriptive and exploratory analysis",
    ],
  },
  {
    heading: "Infrastructure and Workflow",
    items: ["PostgreSQL", "Git", "GitHub", "Docker"],
  },
  {
    heading: "Domain Knowledge",
    items: [
      "Healthcare operations",
      "Hospital referral analytics",
      "Public health surveillance",
      "Clinical informatics",
      "Molecular and diagnostic laboratory",
      "Bioinformatics",
    ],
  },
]

// ── Professional summary (used on Resume page) ────────────────────────────────

export const professionalSummary =
  "Biomedical informatics professional with a background spanning bioinformatics research, diagnostic laboratory operations, hospital network strategy, and healthcare consulting. Graduate training at the University of Pennsylvania (MBI, GPA 3.81) provided rigorous methods in real-world evidence, pharmacovigilance, and clinical data science. Current consulting engagement through the Penn Graduate Consulting Club applies economic modeling and sensitivity analysis to healthcare technology decisions. Graduate projects span FDA FAERS signal detection, OMOP CDM cohort design, and public health machine learning. Focused on producing evidence that is rigorous, interpretable, and actionable."

// ── Cross-functional capabilities (for Experience page capabilities strip) ────

export const capabilities = [
  {
    area: "Real-World Evidence",
    description:
      "Cohort design on OMOP CDM, propensity score methods, and pharmacovigilance signal detection using FDA FAERS data.",
  },
  {
    area: "Healthcare Operations",
    description:
      "Referral network strategy, provider relationship management, and workflow analytics in a hospital system context.",
  },
  {
    area: "Clinical Data Science",
    description:
      "Applied machine learning to public health and clinical datasets including NHANES survey data and FDA adverse event records.",
  },
  {
    area: "Healthcare Consulting",
    description:
      "Economic modeling, payer and customer segment analysis, and sensitivity analysis for healthcare technology decisions. Consulting through the Penn Graduate Consulting Club.",
  },
  {
    area: "Analytical Product Thinking",
    description:
      "Designed analytical tools that translate clinical questions into structured cohort definitions, generated queries, and interpretable evidence outputs.",
  },
  {
    area: "Laboratory and Bioinformatics",
    description:
      "Molecular laboratory operations, metagenomics and metatranscriptomics analysis, and bioinformatics pipeline development.",
  },
]

// ── Publications ──────────────────────────────────────────────────────────────

export const publications: Publication[] = [
  {
    id: "banana-chitosan-2024",
    authors: "Nugrahapraja H, Syam F, Momole J, et al.",
    title: "Response of the Microbial Community in Unripe and Ripe Bananas with Chitosan Treatment to Delay Fruit Ripening",
    journal: "Agricultural Research",
    volume: "15",
    pages: "267–279",
    publishedOnline: "December 18, 2024",
    doi: "10.1007/s40003-024-00817-4",
    url: "https://doi.org/10.1007/s40003-024-00817-4",
    type: "peer-reviewed",
  },
]

// ── Selected projects for Resume (ordered by analytical depth) ────────────────

export const resumeProjects = [
  {
    slug: "glp1-pharmacovigilance",
    title: "GLP-1 Pharmacovigilance",
    description:
      "Sex-stratified disproportionality analysis across 18.5M+ harmonized FDA FAERS records.",
  },
  {
    slug: "real-world-evidence-studio",
    title: "Real-World Evidence Studio",
    description:
      "Analytical product concept guiding researchers from structured clinical questions through OMOP CDM cohort definition and evidence outputs.",
  },
  {
    slug: "healthcare-referral-analytics",
    title: "Healthcare Referral Analytics",
    description:
      "Provider network and referral performance analytics supporting hospital operations and 216% referral revenue growth.",
  },
  {
    slug: "genetic-risk-map",
    title: "Genetic Risk Map",
    description:
      "Reproducible Python pipeline for gene-level association scoring from MAGMA or GWAS summary statistics with a 31-test pytest suite.",
  },
  {
    slug: "hpv-vaccination-analytics",
    title: "HPV Vaccination Analytics",
    description:
      "Logistic regression and XGBoost analysis of HPV vaccine receipt predictors using NHANES 2021-2023 data.",
  },
]
