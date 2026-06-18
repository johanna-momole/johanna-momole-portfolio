export const siteConfig = {
  name: "Johanna Momole",
  initials: "JM",
  title: "Biomedical Informatics and Healthcare Analytics",
  eyebrow: "Biomedical Informatics · Healthcare Analytics",
  headline: "I turn healthcare data into evidence people can act on.",
  bio: "I combine clinical context, analytical methods, and product thinking to build tools for real-world evidence, patient access, and healthcare operations.",

  nav: [
    { label: "Work",       href: "/#work" },
    { label: "About",      href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Resume",     href: "/resume" },
    { label: "Notes",      href: "/notes" },
  ],

  social: {
    linkedin: "",
    github:   "",
    email:    "johanna.momole@gmail.com",
  },

  resume: "#resume",

  metrics: [
    {
      value: "18.5M+",
      label: "FAERS records harmonized",
      category: "Pharmacovigilance",
    },
    {
      value: "216%",
      label: "Referral revenue growth",
      category: "Healthcare Operations",
    },
    {
      value: "45.5%",
      label: "Reduction in EMR-related processing time",
      category: "Workflow Efficiency",
    },
    {
      value: "70%",
      label: "Reduction in laboratory analysis time",
      category: "Laboratory Analytics",
    },
  ],

  metricsContext:
    "Selected impact across research, healthcare operations, and analytical systems",

  evidenceCards: [
    {
      id: "pharma",
      category: "Pharmacovigilance",
      value: "18.5M+",
      label: "records harmonized",
      detail: "FAERS signal detection",
    },
    {
      id: "referral",
      category: "Referral Analytics",
      value: "216%",
      label: "referral revenue growth",
      detail: "Hospital operations",
    },
    {
      id: "workflow",
      category: "Workflow Efficiency",
      value: "45.5%",
      label: "reduction in EMR-related processing time",
      detail: "EMR process optimization",
    },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
export type Metric = (typeof siteConfig.metrics)[number];
export type EvidenceCard = (typeof siteConfig.evidenceCards)[number];
