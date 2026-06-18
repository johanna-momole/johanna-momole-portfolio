import type { CaseStudy } from "./types"

export const rweStudioCaseStudy: CaseStudy = {
  slug: "real-world-evidence-studio",
  title: "RWE Evidence Studio: From Clinical Question to Reproducible Evidence",
  subtitle:
    "An analytical product translating structured clinical questions into cohort definitions, generated queries, and interpretable evidence workflows",
  positioning:
    "In development. Workflow examples are illustrative and do not contain identifiable patient data.",

  summary: [
    "RWE Evidence Studio is an analytical product designed to guide researchers from a structured clinical question through cohort definition, SQL generation, cohort diagnostics, and evidence interpretation in a reproducible, auditable workflow.",
    "The product uses the PICOT framework as the structured input layer and translates the resulting cohort logic into OMOP CDM-compliant SQL, making evidence generation from observational health data more transparent and reproducible.",
    "The design prioritizes analytical transparency: each step from clinical question to final output is documented, linked to upstream design decisions, and configurable without requiring the researcher to work directly in code.",
  ],

  researchQuestion:
    "How can the process of translating a clinical question into a real-world evidence analysis be made more structured, transparent, and reproducible without sacrificing analytical rigor or researcher control?",

  context: {
    motivation:
      "Generating real-world evidence from observational health data requires a sequence of decisions that are often made implicitly and documented inconsistently: how a clinical question is operationalized, how cohort membership is defined, how confounding is handled, and how results are interpreted. These decisions have large downstream effects on study validity and are not reliably reproducible across analysts or institutions. RWE Evidence Studio is designed to make this decision chain explicit, auditable, and reusable.",
    background:
      "Real-world evidence studies using claims data, electronic health records, or other observational sources require careful cohort design to avoid biases including prevalent user bias, immortal time bias, and indication confounding. The OMOP Common Data Model provides a standardized representation of patient-level health data that, when paired with reproducible cohort logic, enables cross-institutional evidence generation. Cohort diagnostic tools characterize cohort composition before analysis, providing a critical safeguard against specification errors reaching the results stage.",
  },

  role: {
    title: "Analyst and Developer",
    summary:
      "End-to-end responsibility for product concept design, analytical workflow architecture, and implementation.",
    responsibilities: [
      "Designed the PICOT-to-cohort translation framework mapping clinical question components to OMOP CDM concept domains and tables",
      "Defined the cohort logic schema: index event, inclusion and exclusion criteria, baseline window, follow-up window, and washout period specification",
      "Architected the SQL generation layer targeting OMOP CDM observation periods, condition occurrence, drug exposure, measurement, and visit occurrence tables",
      "Specified the cohort diagnostics workflow including attrition tracking, covariate distribution tables, and standardized mean difference checks",
      "Designed the results interpretation layer with structured framing for effect estimates, uncertainty, and design-linked limitations",
      "Developed the analytical safeguards layer ensuring that all design decisions are captured and versioned before analysis proceeds",
    ],
  },

  dataSources: [
    {
      name: "OMOP Common Data Model",
      acronym: "OMOP CDM",
      type: "Observational health data standard",
      period: "Target data standard for all generated SQL",
      scale: "Standardized schema across participating institutions",
      tables: [
        "person",
        "observation_period",
        "condition_occurrence",
        "drug_exposure",
        "measurement",
        "visit_occurrence",
      ],
      notes:
        "Target data standard for all generated cohort SQL. Workflow examples are illustrative and do not contain identifiable patient data.",
    },
    {
      name: "PICOT Clinical Question Framework",
      acronym: "PICOT",
      type: "Clinical question structuring framework",
      period: "Applied at study design stage",
      scale: "Five-component structured clinical question input",
      notes:
        "Input framework for decomposing clinical questions into operationalizable cohort components: Population, Intervention, Comparator, Outcome, and Time horizon.",
    },
  ],

  dataScale: {
    items: [
      { label: "Workflow Stages",   value: "7" },
      { label: "Target Data Model", value: "OMOP CDM" },
      { label: "Project Status",    value: "In Development" },
      { label: "Primary Output",    value: "Reproducible SQL" },
    ],
  },

  workflowSteps: [
    {
      step: 1,
      label: "Clinical Question Input",
      description:
        "The researcher enters a structured clinical question. The product guides decomposition using the PICOT framework: Population, Intervention, Comparator, Outcome, and Time horizon.",
      output: "Structured PICOT specification",
      tech: ["Python"],
    },
    {
      step: 2,
      label: "Cohort Definition",
      description:
        "Population criteria, intervention and comparator exposures, outcome events, and time windows are mapped to OMOP CDM concepts. Inclusion and exclusion criteria are specified in structured form with concept set references.",
      output: "Cohort logic specification",
      tech: ["Python", "OMOP CDM"],
    },
    {
      step: 3,
      label: "Index Event Specification",
      description:
        "The index date anchor is defined: the event that marks cohort entry, such as a first drug dispensing, diagnosis date, or procedure date. Baseline and follow-up windows are set relative to the index date.",
      output: "Time-anchored cohort design",
      tech: ["Python", "SQL"],
    },
    {
      step: 4,
      label: "SQL Generation",
      description:
        "The cohort logic specification is translated into OMOP CDM-compliant SQL. Queries target the appropriate observation tables and apply the specified criteria, time windows, and concept sets in a reproducible, versioned form.",
      output: "Generated OMOP CDM SQL",
      tech: ["SQL", "Python"],
    },
    {
      step: 5,
      label: "Cohort Diagnostics",
      description:
        "The generated cohort is characterized before analysis: attrition tracking documents criterion application, covariate distributions are computed for each exposure group, and standardized mean differences flag residual imbalance.",
      output: "Cohort diagnostics report",
      tech: ["R", "Python"],
    },
    {
      step: 6,
      label: "Statistical Analysis",
      description:
        "With a diagnostics-reviewed cohort, the appropriate statistical analysis is specified and executed. Propensity score methods are available for confounding control in comparative effectiveness applications.",
      output: "Analysis output",
      tech: ["R", "Python"],
    },
    {
      step: 7,
      label: "Results Interpretation",
      description:
        "Evidence outputs are structured with explicit framing of limitations, generalizability constraints, and design assumptions. Each output is linked to the upstream design decisions that produced it, creating an auditable evidence record.",
      output: "Interpretable evidence report",
      tech: ["Python", "R"],
    },
  ],

  methods: [
    {
      name: "PICOT-to-Cohort Translation",
      type: "primary",
      description:
        "A structured mapping process that decomposes the clinical question into five components — Population, Intervention, Comparator, Outcome, Time — and translates each into an operationalizable cohort specification using OMOP CDM concept sets and domain tables.",
      purpose:
        "Ensures that clinical reasoning is preserved through the analytical workflow. Reduces the gap between study intent and analytical implementation and creates a documented audit trail for all design decisions.",
    },
    {
      name: "New-User, Active-Comparator Cohort Design",
      type: "primary",
      description:
        "Cohorts are restricted to treatment initiators (new users) and compared against an active comparator rather than non-users. Index event, baseline, and follow-up windows are defined relative to the first observed treatment date.",
      purpose:
        "Reduces prevalent user bias and confounding by indication. The new-user design excludes patients who have already tolerated or failed treatment, making the comparison groups more comparable at baseline.",
    },
    {
      name: "OMOP CDM SQL Generation",
      type: "primary",
      description:
        "Cohort logic is automatically translated into SQL targeting the OMOP CDM schema. Queries cover condition occurrence, drug exposure, measurement, visit occurrence, and observation period tables with appropriate date arithmetic for time-at-risk windows.",
      purpose:
        "Enables reproducible cohort extraction from any OMOP-compliant data source. Separates cohort specification from implementation, making studies portable across institutions without analyst-level SQL expertise at the design stage.",
    },
    {
      name: "Cohort Diagnostics",
      type: "quality",
      description:
        "Pre-specified cohort characterization conducted and reviewed before the primary analysis begins. Includes attrition tables tracking each inclusion and exclusion criterion, covariate distributions for each exposure group, and standardized mean differences for balance assessment.",
      purpose:
        "Detects cohort specification errors before results are generated. Balance diagnostics confirm that confounding adjustment was applied correctly and that residual imbalance does not invalidate the exposure comparison.",
    },
    {
      name: "Propensity Score Adjustment",
      type: "sensitivity",
      description:
        "Propensity score estimation using logistic regression on pre-specified confounders. Available as inverse probability of treatment weighting or propensity score matching for comparative effectiveness applications.",
      purpose:
        "Controls for measured confounding by indication. Accounts for systematic differences in baseline characteristics between exposure groups that would otherwise bias effect estimates in observational comparisons.",
    },
    {
      name: "Analytical Safeguards Layer",
      type: "validation",
      description:
        "Each design decision — PICOT specification, cohort criteria, index event logic, analysis method, and interpretation framing — is documented and versioned within the workflow before analysis proceeds. Results link back to their upstream design choices.",
      purpose:
        "Creates an auditable evidence record. Enables reviewers to trace any result to the design decisions that produced it, supporting both reproducibility and critical appraisal of the study.",
    },
  ],

  outputPreviews: [
    {
      id: "picot-interface",
      title: "PICOT and Cohort Definition Interface",
      description:
        "Structured input interface for decomposing clinical questions into Population, Intervention, Comparator, Outcome, and Time components. Illustrative interface layout — example criteria shown.",
      visualType: "picot-interface",
      isPlaceholder: true,
    },
    {
      id: "sql-workspace",
      title: "Generated SQL Workspace",
      description:
        "SQL generation output targeting OMOP CDM tables. Query logic reflects the cohort criteria entered in the definition stage. Illustrative SQL — does not reference a real database or patient population.",
      visualType: "sql-preview",
      isPlaceholder: true,
    },
    {
      id: "cohort-diagnostics",
      title: "Cohort Diagnostics Interface",
      description:
        "Cohort characterization output including attrition tracking, covariate distribution, and baseline balance summary across exposure groups. Diagnostic preview — layout shown, values illustrative.",
      visualType: "bar-chart",
      isPlaceholder: true,
    },
  ],

  dataQualityMeasures: [
    "All cohort design decisions are captured in a structured specification before SQL generation begins, preventing post-hoc design changes that cannot be traced back to the original study intent",
    "Attrition tracking documents the number of records excluded at each inclusion and exclusion criterion step, providing a complete audit trail for cohort assembly",
    "Cohort diagnostics are conducted and reviewed before the primary analysis as a required precondition, not an optional post-hoc check",
    "Covariate balance assessment confirms that comparison groups are sufficiently similar after confounding adjustment before effect estimates are interpreted",
    "The new-user, active-comparator design is the default for comparative effectiveness analyses, reducing prevalent user bias and confounding by indication at the design stage",
    "All workflow runs are versioned: the same PICOT specification and cohort logic produce the same generated SQL on the same data, supporting reproducibility across analysts and institutions",
  ],

  limitations: [
    {
      id: "in-development",
      title: "Product in development",
      description:
        "RWE Evidence Studio is an active development project. Workflow examples are illustrative. The product has not yet been validated against a real OMOP CDM implementation or a completed observational study.",
      mitigation:
        "All workflow examples are clearly labeled as illustrative. Statements about product capabilities describe design intent, not validated performance in a production environment.",
    },
    {
      id: "omop-variation",
      title: "OMOP CDM implementation variation",
      description:
        "OMOP CDM implementations vary across institutions in vocabulary mapping, ETL decisions, and concept coding practices. Generated SQL may require institution-specific customization to run correctly on a given database.",
      mitigation:
        "The product generates standard OMOP-compliant SQL as a starting point. Analyst review and customization before execution are expected and documented in the workflow.",
    },
    {
      id: "unmeasured-confounding",
      title: "Unmeasured confounding",
      description:
        "Observational studies cannot control for confounders not captured in the available data. Even well-designed OMOP cohort studies with propensity score adjustment remain subject to unmeasured and residual confounding.",
      mitigation:
        "The product includes structured prompts for identifying potential unmeasured confounders at the design stage and provides sensitivity analysis options for assessing robustness to uncontrolled confounding assumptions.",
    },
    {
      id: "index-date-ambiguity",
      title: "Index event definition requires clinical judgment",
      description:
        "The choice of index event has large effects on study validity that an automated product cannot fully determine. The clinical judgment required to define a valid index event exceeds what a workflow tool can enforce.",
      mitigation:
        "The product guides index event specification with structured prompts and documented decision rules but does not automate the clinical judgment required. Analyst review of index event logic is required before SQL generation.",
    },
    {
      id: "generalizability",
      title: "Data source generalizability",
      description:
        "RWE findings are specific to the patient population, care setting, and time period captured in the underlying data source. OMOP-standardized data from different institutions represent different populations and may not be combined without harmonization.",
      mitigation:
        "The results interpretation layer includes structured framing for generalizability constraints. Cohort diagnostics characterize the study population before results are interpreted.",
    },
  ],

  technologies: [
    {
      category: "Data standard",
      items: ["OMOP CDM"],
    },
    {
      category: "Query language",
      items: ["SQL"],
    },
    {
      category: "Data pipeline",
      items: ["Python"],
    },
    {
      category: "Statistical analysis",
      items: ["R"],
    },
  ],

  lessonsLearned: [
    "Translating a clinical question into a valid cohort design requires more structured guidance than most RWE tools provide. The gap between a researcher's intent and a correctly specified OMOP cohort is a common failure point in observational research.",
    "Cohort diagnostics should be a precondition for interpretation, not an optional step. Building diagnostics into the required workflow before analysis results are accessible fundamentally changes how errors are caught.",
    "SQL generation from a structured specification surfaces ambiguities in the cohort logic that are not apparent in natural language descriptions. The translation step itself functions as a form of specification review.",
    "The new-user, active-comparator design resolves several common confounding problems and should be the workflow default, not an advanced option requiring deep methodological knowledge to select.",
  ],

  nextSteps: [
    "Validate the PICOT-to-cohort translation framework against published observational studies with known cohort specifications",
    "Connect the SQL generation layer to a test OMOP CDM instance to validate query correctness on real database structure",
    "Implement the cohort diagnostics module using OHDSI CohortDiagnostics outputs as a reference standard for characterization tables",
    "Design the results interpretation template with structured framing for effect estimate limitations, generalizability, and design assumptions",
    "Evaluate integration with OHDSI Atlas as a front-end option for cohort specification and vocabulary browsing",
  ],
}
