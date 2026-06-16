export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  date: string;
  role: string;
  methods: string[];
  technologies: string[];
  metrics: ProjectMetric[];
  image: string;
  repositoryUrl: string;
  demoUrl: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "glp1-pharmacovigilance",
    title: "GLP-1 Pharmacovigilance",
    shortTitle: "GLP-1 Safety",
    description:
      "Signal detection and safety profiling for GLP-1 receptor agonists using 18.5M+ FAERS adverse event records. Identifies disproportionate reporting signals with FDA-standard methods.",
    category: "Pharmacovigilance",
    date: "",
    role: "Analyst",
    methods: ["Disproportionality analysis", "Signal detection", "FAERS data harmonization"],
    technologies: ["Python", "pandas", "R", "FDA FAERS"],
    metrics: [
      { value: "18.5M+", label: "FAERS records harmonized" },
    ],
    image: "",
    repositoryUrl: "",
    demoUrl: "",
    featured: true,
  },
  {
    slug: "real-world-evidence-studio",
    title: "Real-World Evidence Studio",
    shortTitle: "RWE Studio",
    description:
      "Analytical platform for generating real-world evidence from electronic health record data and claims, supporting comparative effectiveness and patient access research.",
    category: "Real-World Evidence",
    date: "",
    role: "Analyst and Developer",
    methods: ["Propensity score matching", "Cohort design", "Causal inference"],
    technologies: ["Python", "SQL", "R", "OMOP CDM"],
    metrics: [],
    image: "",
    repositoryUrl: "",
    demoUrl: "",
    featured: true,
  },
  {
    slug: "healthcare-referral-analytics",
    title: "Healthcare Referral Analytics",
    shortTitle: "Referral Analytics",
    description:
      "Data-driven referral strategy and revenue growth analytics for hospital operations. Identified high-value referral patterns and optimized network performance.",
    category: "Healthcare Operations",
    date: "",
    role: "Analyst",
    methods: ["Network analysis", "Revenue attribution", "Operational analytics"],
    technologies: ["SQL", "Tableau", "Python"],
    metrics: [
      { value: "216%", label: "Referral revenue growth" },
    ],
    image: "",
    repositoryUrl: "",
    demoUrl: "",
    featured: true,
  },
  {
    slug: "genetic-risk-map",
    title: "Genetic Risk Map",
    shortTitle: "Genetic Risk Map",
    description:
      "Polygenic risk scoring and visualization pipeline mapping variant-level data to population-level disease risk. Connects genomic findings to clinical decision support.",
    category: "Genomics",
    date: "",
    role: "Developer",
    methods: ["Polygenic risk scoring", "GWAS interpretation", "Geospatial visualization"],
    technologies: ["Python", "R", "bioinformatics pipelines"],
    metrics: [],
    image: "",
    repositoryUrl: "",
    demoUrl: "",
    featured: false,
  },
  {
    slug: "hpv-vaccination-analytics",
    title: "HPV Vaccination Analytics",
    shortTitle: "HPV Analytics",
    description:
      "Population-level analysis of HPV vaccination uptake, coverage gaps, and equity indicators across demographic segments. Supports public health intervention targeting.",
    category: "Public Health Analytics",
    date: "",
    role: "Analyst",
    methods: ["Epidemiological analysis", "Coverage gap analysis", "Health equity metrics"],
    technologies: ["Python", "R", "SQL"],
    metrics: [],
    image: "",
    repositoryUrl: "",
    demoUrl: "",
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
