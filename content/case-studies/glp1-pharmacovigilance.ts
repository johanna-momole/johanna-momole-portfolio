// ── Types re-exported from shared module for backward compatibility ────────────
import type { CaseStudy } from "./types"

export type {
  DataSource,
  WorkflowStep,
  Method,
  Limitation,
  TechCategory,
  DataScaleItem,
  OutputPreview,
  CaseStudy,
} from "./types"

// ── GLP-1 Pharmacovigilance Case Study ────────────────────────────────────────

export const glp1CaseStudy: CaseStudy = {
  slug: "glp1-pharmacovigilance",
  title: "Sex-Stratified Pharmacovigilance Signal Detection for GLP-1 Therapies Using FAERS",
  subtitle: "Disproportionality analysis across 18.5M+ harmonized FDA adverse event records",
  positioning:
    "Methods-forward, hypothesis-generating signal detection. Results describe patterns in adverse event reporting. They do not establish causality, incidence, or prevalence.",

  summary: [
    "Harmonized and analyzed more than 18.5 million FAERS records to detect pharmacovigilance signals for GLP-1 receptor agonists and tirzepatide across a four-year window (Q1 2021 through Q4 2024).",
    "Applied sex-stratified disproportionality analysis using Reporting Odds Ratio with 95% confidence intervals and Proportional Reporting Ratio as a sensitivity analysis, with formal comparison of female and male signal profiles.",
    "All results are hypothesis-generating signals from a spontaneous reporting system. They reflect patterns in adverse event reporting, not causal relationships or population-level incidence.",
  ],

  researchQuestion:
    "Do GLP-1 receptor agonists and tirzepatide exhibit differential adverse event signal profiles by sex, and do these patterns vary across drug class, adverse event category, and analysis quarter?",

  context: {
    motivation:
      "GLP-1 receptor agonists have experienced unprecedented prescribing growth since the approval of semaglutide for weight management. With millions of patients initiating treatment across diverse demographic groups, post-market pharmacovigilance has become essential for characterizing real-world safety profiles that clinical trial populations may not fully represent. Sex-stratified analysis is particularly important given documented differences in pharmacokinetics, body composition, and treatment indication between female and male populations.",
    background:
      "The FDA Adverse Event Reporting System (FAERS) is the largest spontaneous adverse event database for marketed drugs in the United States. While FAERS cannot establish causality or calculate incidence rates, disproportionality analysis methods identify patterns in reporting that warrant further investigation. Reporting Odds Ratio and Proportional Reporting Ratio are established methods in regulatory pharmacovigilance, used by agencies including the FDA and EMA for signal detection and hypothesis generation.",
  },

  role: {
    title: "Analyst",
    summary:
      "End-to-end responsibility for database architecture, data harmonization pipeline, methodology design, and analysis execution.",
    responsibilities: [
      "Designed and built the PostgreSQL schema for FAERS quarterly file ingestion across all core tables",
      "Developed the data harmonization pipeline for drug name standardization and MedDRA term validation",
      "Implemented FDA CASEID-based deduplication within and across quarterly files",
      "Mapped brand and generic name variants to five target compounds including the GLP-1/GIP dual agonist",
      "Constructed sex-stratified 2x2 contingency tables for each drug-adverse event pair",
      "Computed Reporting Odds Ratio with 95% confidence intervals and PRR as a sensitivity analysis",
      "Applied multiple-testing adjustment to control false discovery rate across the full signal matrix",
      "Conducted stimulated-reporting checks using quarterly temporal trend analysis",
      "Applied Standardised MedDRA Queries for validated adverse event groupings",
    ],
  },

  dataSources: [
    {
      name: "FDA Adverse Event Reporting System",
      acronym: "FAERS",
      type: "Spontaneous adverse event reporting system",
      period: "Q1 2021 through Q4 2024",
      scale: "18.5M+ records harmonized",
      tables: ["DEMO", "DRUG", "REAC", "OUTC", "RPSR", "THER", "INDI"],
      notes:
        "Primary data source. Spontaneous reporting system. Results represent reporting signals, not population incidence.",
    },
    {
      name: "Medical Dictionary for Regulatory Activities",
      acronym: "MedDRA",
      type: "Medical terminology dictionary",
      period: "Current version at time of analysis",
      scale: "Standardised MedDRA Queries applied for validated AE groupings",
      notes:
        "Used for preferred-term validation and SMQ-level adverse event groupings where appropriate.",
    },
  ],

  dataScale: {
    items: [
      { label: "Records Harmonized", value: "18.5M+" },
      { label: "Analysis Window",    value: "Q1 2021 – Q4 2024" },
      { label: "GLP-1 Cases",        value: "158K+" },
      { label: "Signals Detected",   value: "665" },
    ],
  },

  exposures: [
    "Semaglutide",
    "Liraglutide",
    "Dulaglutide",
    "Exenatide",
    "Tirzepatide",
  ],

  workflowSteps: [
    {
      step: 1,
      label: "Ingest",
      description:
        "Load FAERS quarterly ASCII files into PostgreSQL across DEMO, DRUG, REAC, OUTC, RPSR, THER, and INDI tables.",
      output: "Raw FAERS database",
      tech: ["PostgreSQL", "SQL"],
    },
    {
      step: 2,
      label: "Harmonize",
      description:
        "Standardize drug names to generic terms, normalize date formats, and validate MedDRA preferred terms against the current dictionary.",
      output: "Harmonized records",
      tech: ["SQL", "Python"],
    },
    {
      step: 3,
      label: "Deduplicate",
      description:
        "Apply FDA CASEID-based deduplication within and across quarterly files. Retain the most recent follow-up report for each case.",
      output: "Deduplicated case base",
      tech: ["SQL"],
    },
    {
      step: 4,
      label: "Define Exposures",
      description:
        "Identify cases with primary or secondary suspect GLP-1 RA or tirzepatide. Map all brand and generic name variants to the five target compounds.",
      output: "158K+ GLP-1 exposure cases",
      tech: ["SQL", "R"],
    },
    {
      step: 5,
      label: "Sex-Stratify",
      description:
        "Partition exposure cases into female and male subcohorts. Construct separate 2x2 contingency tables for each drug-adverse event pair within each sex stratum.",
      output: "Stratified contingency tables",
      tech: ["R", "SQL"],
    },
    {
      step: 6,
      label: "Compute Signals",
      description:
        "Calculate Reporting Odds Ratio with 95% confidence intervals as the primary measure, and Proportional Reporting Ratio as a sensitivity analysis. Apply multiple-testing adjustment.",
      output: "Signal estimates with confidence intervals",
      tech: ["R"],
    },
    {
      step: 7,
      label: "Quality Checks",
      description:
        "Conduct stimulated-reporting checks via quarterly trend analysis, reporter-type comparisons, and SMQ-level validation. Flag signals coinciding with known external events.",
      output: "Quality-validated signal set",
      tech: ["R", "Python"],
    },
  ],

  methods: [
    {
      name: "Reporting Odds Ratio",
      type: "primary",
      description:
        "Measures the odds of a specific adverse event being reported for a drug of interest relative to all other drugs in the FAERS database. Computed with 95% confidence intervals from a 2x2 contingency table.",
      purpose:
        "Primary disproportionality measure. A signal is flagged when the lower bound of the 95% CI exceeds 1 and the minimum case count threshold is met.",
    },
    {
      name: "Proportional Reporting Ratio",
      type: "sensitivity",
      description:
        "Calculates the proportion of a specific adverse event among all adverse events for a drug, compared to the same proportion for all other drugs in the database.",
      purpose:
        "Sensitivity analysis to cross-validate ROR-based signals and provide an additional disproportionality perspective.",
    },
    {
      name: "Sex-Stratified Analysis",
      type: "primary",
      description:
        "Separate 2x2 contingency tables are constructed for female and male cases independently, enabling formal comparison of signal magnitude and direction across sex strata.",
      purpose:
        "Primary stratification dimension. Detects differential reporting patterns that aggregate analyses may obscure, particularly for drugs with sex-differential prescribing or pharmacokinetics.",
    },
    {
      name: "CASEID Deduplication",
      type: "quality",
      description:
        "FDA-recommended deduplication using the CASEID field to identify and remove duplicate reports that arise from follow-up submissions and cross-quarter resubmissions.",
      purpose:
        "Critical data quality step. Prevents inflated case counts and biased signal estimates from follow-up reports that update earlier submissions.",
    },
    {
      name: "Multiple-Testing Adjustment",
      type: "quality",
      description:
        "Formal adjustment for multiple comparisons when testing many drug-adverse event pairs simultaneously across the full signal matrix.",
      purpose:
        "Controls false discovery rate. Reduces the proportion of spurious signals reported as significant when testing large numbers of drug-AE combinations.",
    },
    {
      name: "Stimulated Reporting Checks",
      type: "validation",
      description:
        "Quarterly trend analysis of reporting volumes for each exposure drug to identify periods of media-driven or label-change-driven reporting surges.",
      purpose:
        "Detects and flags signals that may reflect notoriety bias rather than a true pharmacovigilance concern. Particularly relevant for high-profile drugs like semaglutide.",
    },
    {
      name: "Standardised MedDRA Queries",
      type: "validation",
      description:
        "Pre-validated adverse event groupings from the MedDRA hierarchy used to supplement preferred-term-level analysis where appropriate.",
      purpose:
        "Increases signal stability for low-frequency events and aligns results with regulatory terminology standards.",
    },
    {
      name: "Empirical Bayes Shrinkage",
      type: "sensitivity",
      description:
        "Optional Bayesian shrinkage applied to ROR estimates for drug-adverse event combinations with low case counts, improving estimate stability.",
      purpose:
        "Sensitivity analysis for low-frequency signals. Reduces the influence of extreme estimates driven by small cell counts in the contingency table.",
    },
  ],

  outputDisclosure:
    "Charts below are rendered from actual analysis outputs. Axes, scales, and data values reflect results from the full Q1 2021 through Q4 2024 FAERS run. Results are disproportionality signals only and do not establish causality or population-level incidence.",

  outputPreviews: [
    {
      id: "sex-ror-scatter",
      title: "Female vs Male ROR Comparison",
      description:
        "Each point represents one MedDRA Preferred Term jointly evaluable in both sexes. Points above the dashed diagonal are disproportionately reported more in males; below in females. Color indicates signal classification after Benjamini-Hochberg adjustment.",
      visualType: "forest-plot",
      isPlaceholder: false,
    },
    {
      id: "quarterly-trend",
      title: "Quarterly Reporting Volume",
      description:
        "Deduplicated GLP-1 case counts per quarter with reporter-type composition (health professional vs consumer vs other). The right axis shows consumer reporter percentage. Dashed vertical lines mark key FDA approval dates.",
      visualType: "trend-chart",
      isPlaceholder: false,
    },
    {
      id: "clinical-groups-forest",
      title: "Pre-Specified Clinical Group Signals",
      description:
        "Group-level ROR with 95% CI for seven pre-specified adverse event domains, stratified by sex. Each case counts once per group regardless of number of preferred terms. Comparator = all non-GLP-1 cases in the same sex stratum.",
      visualType: "forest-plot",
      isPlaceholder: false,
    },
  ],

  dataQualityMeasures: [
    "FDA CASEID-based deduplication removes within-quarter and cross-quarter duplicate reports, retaining the most recent follow-up for each case",
    "Drug name harmonization validates brand and generic name variants against a curated reference list covering all five target compounds",
    "MedDRA preferred term validation against the current MedDRA hierarchy ensures consistent adverse event classification",
    "Primary suspect and secondary suspect drug roles are analyzed separately to assess role-sensitivity of signals",
    "Reporter source comparisons assess whether consumer-reported and healthcare-provider-reported signals are directionally consistent",
    "Quarterly trend analysis flags reporting periods that coincide with label updates, regulatory communications, or high media coverage events",
    "Minimum case count threshold applied before computing disproportionality measures to exclude unstable low-frequency estimates",
  ],

  limitations: [
    {
      id: "spontaneous-reporting",
      title: "Spontaneous reporting system",
      description:
        "FAERS captures adverse events reported voluntarily by patients, healthcare providers, and manufacturers. Cases are not systematically ascertained. The database represents reporting patterns, not true adverse event incidence in treated populations.",
      mitigation:
        "Results are framed and interpreted as disproportionality signals only. No claims about incidence, prevalence, or absolute risk are made.",
    },
    {
      id: "notoriety-bias",
      title: "Notoriety and stimulated reporting bias",
      description:
        "High-profile drugs attract disproportionate reporting independent of true pharmacological effects. GLP-1 receptor agonists received extensive media attention during the analysis window, which may artificially inflate reporting volumes and signal counts.",
      mitigation:
        "Stimulated-reporting checks using quarterly trend analysis identify and flag periods of elevated notoriety-driven reporting. Signals coinciding with known external events are interpreted with additional caution.",
    },
    {
      id: "no-denominator",
      title: "Absence of denominator data",
      description:
        "FAERS does not include prescription volume, patient-years of exposure, or treated population size. Incidence rates and absolute risk estimates cannot be calculated from this data source alone.",
      mitigation:
        "Analysis is explicitly framed as disproportionality analysis. No incidence figures are presented or implied.",
    },
    {
      id: "missingness",
      title: "Variable missingness",
      description:
        "Sex, age, weight, and other demographic variables are not uniformly reported across FAERS submissions. Substantial missingness in sex data requires careful handling in stratified analyses.",
      mitigation:
        "Missingness rates are reported per variable. Sex-stratified analyses exclude cases with missing sex or apply sensitivity analyses to assess the impact of exclusions.",
    },
    {
      id: "confounding",
      title: "Confounding by indication",
      description:
        "GLP-1 receptor agonists are approved for both type 2 diabetes and obesity. These populations have different baseline comorbidity profiles, which can confound adverse event comparisons across drugs within the class.",
      mitigation:
        "INDI table analysis provides indication-level context where available. Drug-specific results are interpreted in light of each compound's primary approved indication.",
    },
    {
      id: "drug-classification",
      title: "Drug name harmonization complexity",
      description:
        "Mapping brand name variants, biosimilar entries, and misspellings to the correct generic compound requires a curated reference list. Misclassification could lead to case misattribution.",
      mitigation:
        "A manually curated brand-to-generic mapping is maintained and versioned. Ambiguous entries are reviewed individually before inclusion.",
    },
  ],

  technologies: [
    {
      category: "Database",
      items: ["PostgreSQL"],
    },
    {
      category: "Query language",
      items: ["SQL"],
    },
    {
      category: "Statistical analysis",
      items: ["R"],
    },
    {
      category: "Data pipeline",
      items: ["Python"],
    },
    {
      category: "Infrastructure",
      items: ["Docker"],
    },
    {
      category: "Version control",
      items: ["Git", "GitHub"],
    },
  ],

  lessonsLearned: [
    "FAERS deduplication is substantially more complex than the official documentation suggests. Cross-quarter deduplication using CASEID requires careful logic to retain the most informative follow-up report for each case while discarding redundant submissions.",
    "Sex missingness in FAERS is substantial for GLP-1 analyses. A documented sensitivity analysis protocol for missing sex data must be defined before interpreting stratified results.",
    "Stimulated reporting from media coverage creates temporal artifacts in GLP-1 signal data. GLP-1 drugs received sustained public attention during the analysis window, making notoriety checks an essential step rather than an optional validation.",
    "Drug name harmonization for GLP-1 compounds requires extensive brand-to-generic mapping. Multiple brand names, route-specific formulations, and emerging biosimilar entries all add classification complexity.",
    "Empirical Bayes shrinkage improves estimate stability for low-frequency drug-adverse event pairs but requires careful parameter selection and should be validated against the ROR-based primary analysis.",
  ],

  nextSteps: [
    "Extend the analysis window to pre-2021 data to establish historical signal baselines before the GLP-1 prescribing surge began",
    "Incorporate indication analysis using the INDI table to control for diabetes-versus-obesity confounding in drug comparisons",
    "Implement Empirical Bayes Geometric Mean as a primary analysis alternative to complement the ROR-based approach",
    "Compare detected signals against label-listed adverse events as a validation benchmark for method calibration",
    "Explore integration with WHO-UMC VigiBase for international cross-validation of key signals detected in the US FAERS dataset",
  ],
}
