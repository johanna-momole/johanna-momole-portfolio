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
    status: "Ongoing",
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
    repositoryUrl: "",
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
    status: "In development",
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
    repositoryUrl: "",
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
    role: "Network & Relation Executive",
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
      "A biomedical visualization project mapping polygenic risk scores and variant-level associations across disease categories. Designed to communicate complex genomic relationships through an intuitive visual interface for research and clinical support contexts.",
    shortDescription:
      "Polygenic risk scoring and visualization pipeline mapping variant-level data to population-level disease risk patterns.",
    category: "Biomedical Visualization · Genomics",
    filterCategory: "Biomedical Data Science",
    status: "Conceptual",
    date: "",
    role: "Developer",
    methods: [
      "Polygenic risk scoring",
      "GWAS interpretation",
      "Geospatial visualization",
      "Bioinformatics pipeline",
    ],
    technologies: ["Python", "R", "Bioinformatics pipelines"],
    metrics: [],
    image: "",
    repositoryUrl: "",
    demoUrl: "",
    featured: false,
    hasCaseStudy: false,
    visual: "genomics",
  },
  {
    slug: "hpv-vaccination-analytics",
    title: "HPV Vaccination Analytics",
    shortTitle: "HPV Analytics",
    description:
      "A public-health data science project examining HPV vaccination uptake and the demographic, socioeconomic, and access-related factors associated with it. Uses random forest classification with five-fold cross-validation on NHANES survey data to identify population-level patterns.",
    shortDescription:
      "Machine learning analysis of HPV vaccination uptake across demographic and access-related factors using NHANES population survey data.",
    category: "Public Health · Machine Learning",
    filterCategory: "Public Health",
    status: "Completed",
    date: "",
    role: "Analyst",
    methods: [
      "Random forest classification",
      "Five-fold cross-validation",
      "Feature importance analysis",
      "Epidemiological analysis",
    ],
    technologies: ["Python", "R", "NHANES", "scikit-learn"],
    metrics: [],
    image: "",
    repositoryUrl: "",
    demoUrl: "",
    featured: false,
    hasCaseStudy: false,
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
