export type ProjectMetric = {
  value: string
  label: string
}

export type ProjectVisualVariant =
  | "signal"
  | "cohort"
  | "referral"
  | "genomics"
  | "vaccination"

export type FilterCategory =
  | "All"
  | "Real-World Evidence"
  | "Healthcare Analytics"
  | "Biomedical Data Science"
  | "Public Health"

export type ProjectStatus =
  | "Ongoing"
  | "In development"
  | "Completed"
  | "Conceptual"

export type Project = {
  slug: string
  title: string
  shortTitle: string
  description: string
  shortDescription: string
  category: string
  filterCategory: FilterCategory
  status: ProjectStatus
  date: string
  role: string
  methods: string[]
  technologies: string[]
  metrics: ProjectMetric[]
  image: string
  repositoryUrl: string
  demoUrl: string
  featured: boolean
  hasCaseStudy: boolean
  visual: ProjectVisualVariant
}

export const projects: Project[] = [
  {
    slug: "glp1-pharmacovigilance",
    title: "GLP-1 Pharmacovigilance",
    shortTitle: "GLP-1 Safety",
    description:
      "Sex-stratified pharmacovigilance signal detection for GLP-1 receptor agonists using 18.5M+ harmonized FDA Adverse Event Reporting System records. Applies disproportionality analysis methods to identify hypothesis-generating signals across demographic and temporal dimensions. Results are exploratory and do not support causal inference.",
    shortDescription:
      "Sex-stratified signal detection across 18.5M+ FDA adverse event records using disproportionality analysis for GLP-1 receptor agonists.",
    category: "Real-World Evidence · Pharmacovigilance",
    filterCategory: "Real-World Evidence",
    status: "Completed",
    date: "",
    role: "Analyst",
    methods: [
      "Disproportionality analysis",
      "Reporting Odds Ratio",
      "Proportional Reporting Ratio",
      "Sex-stratified analysis",
      "Data deduplication",
      "Signal detection",
    ],
    technologies: ["Python", "PostgreSQL", "R", "FDA FAERS"],
    metrics: [
      { value: "18.5M+", label: "FAERS records harmonized" },
    ],
    image: "",
    repositoryUrl: "https://github.com/johanna-momole/glp1-faers-capstone",
    demoUrl: "",
    featured: true,
    hasCaseStudy: true,
    visual: "signal",
  },
  {
    slug: "real-world-evidence-studio",
    title: "Real-World Evidence Studio",
    shortTitle: "RWE Studio",
    description:
      "An analytical product concept that guides researchers from a structured clinical question through cohort definition, SQL generation, diagnostics, and interpretable evidence outputs. Designed to make real-world evidence generation more transparent and reproducible. Currently in active development.",
    shortDescription:
      "An analytical product translating clinical questions into cohort definitions, generated queries, and interpretable evidence outputs.",
    category: "Analytical Product · Real-World Evidence",
    filterCategory: "Real-World Evidence",
    status: "Completed",
    date: "",
    role: "Analyst and Developer",
    methods: [
      "Cohort design",
      "Propensity score methods",
      "Causal inference",
      "OMOP Common Data Model",
      "Cohort diagnostics",
    ],
    technologies: ["Python", "SQL", "R", "OMOP CDM"],
    metrics: [],
    image: "",
    repositoryUrl: "https://github.com/johanna-momole/real-world-evidence-studio",
    demoUrl: "",
    featured: true,
    hasCaseStudy: true,
    visual: "cohort",
  },
  {
    slug: "healthcare-referral-analytics",
    title: "Healthcare Referral Analytics",
    shortTitle: "Referral Analytics",
    description:
      "Healthcare operations analytics connecting patient access, provider networks, referral performance, and geographic reach. Analysis informed hospital referral strategy and supported partnership agreements across a regional health system.",
    shortDescription:
      "Provider network and referral performance analytics supporting hospital operations, access strategy, and revenue growth.",
    category: "Healthcare Operations · Analytics",
    filterCategory: "Healthcare Analytics",
    status: "Completed",
    date: "",
    role: "Network & Relation Executive (Healthcare Analytics & Strategy)",
    methods: [
      "Network analysis",
      "Revenue attribution",
      "Operational analytics",
      "Geographic analysis",
    ],
    technologies: ["SQL", "Python", "Tableau"],
    metrics: [
      { value: "216%", label: "Referral revenue growth" },
      { value: "45.5%", label: "Reduction in EMR-related processing time" },
    ],
    image: "",
    repositoryUrl: "",
    demoUrl: "",
    featured: true,
    hasCaseStudy: true,
    visual: "referral",
  },
  {
    slug: "genetic-risk-map",
    title: "Genetic Risk Map",
    shortTitle: "Genetic Risk Map",
    description:
      "A reproducible Python pipeline for computing gene-level association scores and relative score tiers from MAGMA or GWAS gene-level summary statistics. Built as a portfolio rebuild of BMIN 5100 coursework, with modular source modules, an input validation layer, configurable thresholds, and a 31-test pytest suite. Research and educational use only. Outputs are relative rankings within the submitted gene set, not validated clinical risk estimates.",
    shortDescription:
      "Reproducible Python pipeline for gene-level association scoring, normalization, and relative tier assignment from MAGMA or GWAS summary statistics.",
    category: "Biomedical Data Science · Pipeline Engineering",
    filterCategory: "Biomedical Data Science",
    status: "Completed",
    date: "",
    role: "Developer",
    methods: [
      "Gene-level association scoring",
      "Z-score normalization",
      "Percentile-based stratification",
      "Input validation",
      "Pipeline engineering",
    ],
    technologies: ["Python", "pandas", "NumPy", "SciPy", "Matplotlib", "pytest", "Docker"],
    metrics: [
      { value: "50", label: "Example genes in sample dataset" },
      { value: "31", label: "Unit tests" },
    ],
    image: "",
    repositoryUrl: "https://github.com/johanna-momole/riskmap-genomics",
    demoUrl: "",
    featured: false,
    hasCaseStudy: true,
    visual: "genomics",
  },
  {
    slug: "hpv-vaccination-analytics",
    title: "HPV Vaccination Analytics",
    shortTitle: "HPV Analytics",
    description:
      "This BMIN 5030: Data Science for Biomedical Informatics course project examined whether selected access and socioeconomic variables were associated with reported HPV vaccine receipt in NHANES 2021-2023 data. Implements logistic regression and XGBoost with SMOTE class balancing in R. Includes a detailed methodological reflection on the original workflow's limitations and what a more rigorous rebuild would require.",
    shortDescription:
      "BMIN 5030: Data Science for Biomedical Informatics course project examining selected access and socioeconomic variables associated with reported HPV vaccine receipt in NHANES 2021-2023 data.",
    category: "Public Health · Machine Learning",
    filterCategory: "Public Health",
    status: "Completed",
    date: "",
    role: "Analyst",
    methods: [
      "Logistic regression",
      "XGBoost classification",
      "SMOTE",
      "Binary outcome modeling",
      "Descriptive analysis",
    ],
    technologies: ["R", "tidyverse", "nhanesA", "caret", "xgboost", "smotefamily", "Matrix", "MLmetrics", "ggplot2"],
    metrics: [
      { value: "2", label: "Outcome classes" },
      { value: "3", label: "Predictors used" },
      { value: "2", label: "Models evaluated" },
    ],
    image: "",
    repositoryUrl: "https://github.com/johanna-momole/BMIN503_Final_Project",
    demoUrl: "",
    featured: false,
    hasCaseStudy: true,
    visual: "vaccination",
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export const filterCategories: FilterCategory[] = [
  "All",
  "Real-World Evidence",
  "Healthcare Analytics",
  "Biomedical Data Science",
  "Public Health",
]
