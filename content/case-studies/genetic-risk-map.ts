import type { CaseStudy } from "./types"

// Test execution: `pytest tests/ -v --tb=short` in the project's .venv
// Result: 31 passed in 12.77s (2 files: test_prs.py 11, test_validation.py 20)

export const geneticRiskMapCaseStudy: CaseStudy = {
  slug: "genetic-risk-map",
  title: "Genetic Risk Map",
  subtitle: "An interpretable pipeline for exploring gene-level association scores and relative score tiers.",
  positioning:
    "A reproducible Python pipeline that computes gene-level association scores from MAGMA or GWAS summary statistics, normalizes and ranks them within the submitted dataset, and assigns relative score tiers for exploratory research use.",
  summary: [
    "Genetic Risk Map is a portfolio rebuild of my BMIN 5100 RiskMap Genomics coursework from the Master of Biomedical Informatics program at the University of Pennsylvania. The rebuild refocuses on production-quality engineering: modular and testable Python, a strict input validation layer, configurable scoring thresholds, and reproducible execution through a venv or Docker workflow.",
    "The pipeline computes a gene-level association score derived from MAGMA or GWAS gene-level summary statistics, normalizes scores across the submitted gene set, assigns a percentile rank to each gene, and categorizes genes into three relative score tiers. All output is relative to the submitted input and must not be interpreted as an absolute measure of disease risk.",
    "This project is a research and educational pipeline. Its scores and rankings are relative to the submitted gene set and are not validated for clinical diagnosis, patient-level prediction, or medical decision-making. The example genes in the included dataset are demonstration inputs and should not be interpreted as newly discovered associations.",
  ],
  researchQuestion:
    "How can gene-level summary statistics from MAGMA or GWAS analyses be transformed into an interpretable, reproducible pipeline that computes, normalizes, and ranks gene-level association scores for research and educational exploration?",
  context: {
    motivation:
      "BMIN 5100 introduced gene-level risk scoring concepts using MAGMA output. Rebuilding that course project as a standalone Python pipeline was an opportunity to apply production engineering practices to biomedical data science: strict input validation, configurable parameters, testable modules, and scientifically honest framing throughout all outputs and documentation.",
    background:
      "MAGMA generates gene-level association statistics by aggregating SNP-level GWAS signals within gene boundaries. The output includes an effect size estimate (BETA) and a p-value per gene. Combining these into a single score that weights effect magnitude by statistical evidence strength is a common exploratory step in gene prioritization workflows. This pipeline implements that step in a modular, reproducible form with explicit limitations on how the output should be interpreted.",
  },
  role: {
    title: "Developer",
    summary:
      "Portfolio rebuild of a BMIN 5100 course project, restructured as a modular Python pipeline with full input validation, configurable parameters, automated tests, and documented scientific limitations.",
    responsibilities: [
      "Design and implement the modular pipeline structure across six focused source modules",
      "Build the input validation layer with descriptive error messages for all failure modes",
      "Implement the gene-level association scoring formula and p-value floor safeguard",
      "Implement z-score normalization and percentile ranking across the input gene set",
      "Implement percentile-based relative score tier assignment with configurable thresholds",
      "Generate the score distribution histogram and gene-level score map visualizations",
      "Write the CSV and JSON export modules with structured summary statistics",
      "Write and maintain the 31-test pytest suite covering scoring logic and input validation",
      "Author methodology and limitations documentation with explicit scientific scope constraints",
      "Configure Docker support for reproducible headless execution",
    ],
  },
  dataSourcesTitle: "Analytical Inputs",
  dataSources: [
    {
      name: "MAGMA or GWAS Gene-Level Association Input",
      acronym: "Gene CSV",
      type: "Structured tabular input format",
      period: "Variable (depends on upstream analysis)",
      scale: "Minimum: GENE, BETA, P per row; optional: ZSTAT, SE, NSNPS, GENE_SET",
      notes:
        "The pipeline accepts a comma-separated gene-level association file exported from MAGMA or a compatible gene-level analysis tool. Column names are normalized to uppercase on load, making the format case-insensitive. Required columns are GENE (unique symbol), BETA (effect size), and P (p-value in the range 0 to 1 exclusive-inclusive). Optional columns NSNPS and GENE_SET enable bubble-size encoding in the score map and gene-set breakdown in the JSON summary respectively. Raw input data are never modified.",
    },
    {
      name: "50-Gene Synthetic Example Dataset",
      acronym: "Sample",
      type: "Synthetic example dataset included in the repository",
      period: "N/A, demonstration input",
      scale: "50 genes across 6 gene sets",
      notes:
        "The repository includes a 50-gene synthetic example dataset covering six gene sets: Lipid Metabolism, DNA Repair, Cell Cycle Regulation, Inflammatory Response, Neurological Function, and Metabolic Signaling. The dataset uses well-known publicly documented gene symbols (including APOE, TP53, INS, SNCA, and TNF) as demonstration inputs. These gene symbols are used to make the example readable; they do not represent new biological findings or confirmed risk associations. The data values are synthetic and the file is labeled as such in the repository.",
    },
  ],
  dataScale: {
    items: [
      { label: "Example Genes", value: "50"  },
      { label: "Gene Sets",     value: "6"   },
      { label: "Unit Tests",    value: "31"  },
      { label: "Score Tiers",   value: "3"   },
    ],
  },
  workflowSteps: [
    {
      step: 1,
      label: "Load",
      description:
        "Reads the gene-level CSV using pandas. Normalizes all column names to uppercase so that the format is case-insensitive on input.",
      output: "Normalized DataFrame ready for validation",
      tech: ["Python", "pandas"],
    },
    {
      step: 2,
      label: "Validate",
      description:
        "Runs six validation checks in order: non-empty table, presence of required columns (GENE, BETA, P), numeric types for BETA and P, p-value range enforcement (0, 1], no null values in required columns, and gene symbol uniqueness. Raises descriptive errors at the first failure.",
      output: "Validated DataFrame or descriptive error",
      tech: ["Python", "pandas"],
    },
    {
      step: 3,
      label: "Score",
      description:
        "Computes the gene-level association score: raw_score = BETA times negative log base 10 of P. P-values of exactly 0 (numerical underflow artifacts from MAGMA) are clamped to 1e-300 before the log transformation as a numerical safeguard. Genes with negative BETA receive negative scores.",
      output: "raw_score column appended",
      tech: ["Python", "NumPy", "pandas"],
    },
    {
      step: 4,
      label: "Normalize",
      description:
        "Computes two derived columns: a z-score normalized form of raw_score ((score minus mean) divided by standard deviation across all genes) and a percentile rank from 0 to 100 using average rank for tied scores. Both transformations are relative to the submitted input.",
      output: "normalized_score and percentile_rank columns appended",
      tech: ["Python", "NumPy", "pandas"],
    },
    {
      step: 5,
      label: "Rank and Categorize",
      description:
        "Assigns each gene to one of three relative score tiers based on its raw_score percentile within the submitted input. Upper tier: score at or above the 75th percentile (inclusive). Middle tier: score at or above the 25th and strictly below the 75th percentile. Lower tier: score strictly below the 25th percentile. Thresholds are configurable in config.py.",
      output: "risk_category column appended with tier assignment",
      tech: ["Python", "pandas"],
    },
    {
      step: 6,
      label: "Visualize and Export",
      description:
        "Generates two plots (score distribution histogram with KDE overlay grouped by tier, and a ranked gene bubble chart colored by tier with top-gene labels) and writes the scored table to CSV and JSON. The JSON output includes summary statistics and, when GENE_SET is present, a per-set tier breakdown.",
      output: "CSV, JSON, prs_distribution.png, gene-score-map.png",
      tech: ["Python", "Matplotlib", "SciPy", "pandas"],
    },
  ],
  methods: [
    {
      name: "Gene-Level Association Scoring",
      type: "primary",
      description:
        "Computes raw_score = BETA times negative log base 10 of P for each gene. This weights effect size by the strength of statistical evidence from the upstream gene-level association analysis.",
      purpose:
        "Produces a single numeric score per gene that reflects both the magnitude and the statistical confidence of the association signal from MAGMA or GWAS input. This is an exploratory metric, not a validated polygenic risk score.",
    },
    {
      name: "Z-Score Normalization",
      type: "primary",
      description:
        "Standardizes raw scores by subtracting the mean and dividing by the standard deviation across all genes in the submitted input. When all genes have identical scores, the normalized score is set to zero.",
      purpose:
        "Produces a normalized_score column useful for comparing relative standing across pipeline runs with different input sizes. The normalized score remains input-distribution-dependent and is not calibrated against any external reference.",
    },
    {
      name: "Percentile Rank Assignment",
      type: "primary",
      description:
        "Ranks each gene's raw_score within the submitted input and expresses it as a percentile from 0 to 100. Tied scores are resolved using average rank.",
      purpose:
        "Provides a dimensionless relative rank that communicates where each gene falls within the submitted gene collection, independent of the absolute score magnitude.",
    },
    {
      name: "Percentile-Based Relative Tier Assignment",
      type: "primary",
      description:
        "Assigns three relative score tiers using percentile thresholds on raw_score within the submitted input. Upper tier: score at or above the 75th percentile. Middle tier: score at or above the 25th percentile and strictly below the 75th. Lower tier: score strictly below the 25th percentile. Thresholds are configurable.",
      purpose:
        "Provides a categorical label for each gene that communicates its relative standing within the submitted collection. A gene in the upper tier has a stronger association signal than at least 75 percent of the submitted genes. This is not a claim about absolute disease risk.",
    },
    {
      name: "Input Validation",
      type: "quality",
      description:
        "Runs six sequential validation checks before any computation: non-empty input, required column presence, numeric type enforcement for BETA and P, p-value range check (0 exclusive to 1 inclusive), null check on required columns, and gene symbol uniqueness.",
      purpose:
        "Prevents silently incorrect results by stopping the pipeline at the first validation failure with a descriptive error message that identifies the specific problem.",
    },
    {
      name: "Visualization and Tabular Export",
      type: "validation",
      description:
        "Generates a histogram with KDE overlay showing the score distribution across the three relative tiers, and a ranked bubble chart where bubble size encodes the number of SNPs in the gene analysis window when NSNPS is present. Exports both CSV and JSON with summary statistics.",
      purpose:
        "Produces human-interpretable outputs for exploratory review and structured machine-readable outputs for downstream analysis. Visual outputs are labeled as exploratory and do not replace formal statistical analysis.",
    },
  ],
  outputPreviews: [
    {
      id: "score-distribution",
      title: "Score Distribution by Relative Tier",
      description:
        "Histogram with KDE overlay showing the distribution of gene-level association scores grouped by relative score tier. Tiers are defined by 75th and 25th percentile thresholds within the submitted input. See the caption below regarding the repository's category labels.",
      visualType: "bar-chart",
      isPlaceholder: false,
      imageSrc: "/images/case-studies/genetic-risk-map/prs-distribution.png",
      imageAlt: "Distribution of gene-level association scores across repository-defined relative categories, shown as a histogram with KDE overlay for the 50-gene synthetic example dataset",
    },
    {
      id: "gene-score-map",
      title: "Gene-Level Score Map",
      description:
        "Ranked bubble chart where position reflects relative score rank, bubble size encodes the number of SNPs in the gene analysis window, and color indicates relative score tier. Top-scoring genes are labeled. See the caption below regarding the repository's category labels.",
      visualType: "bar-chart",
      isPlaceholder: false,
      imageSrc: "/images/case-studies/genetic-risk-map/gene-score-map.png",
      imageAlt: "Ranked bubble chart showing gene-level association scores and relative score tiers for the 50-gene synthetic example dataset, with top genes labeled",
    },
    {
      id: "output-table",
      title: "Scored Output Table",
      description:
        "Illustrative representation of the exported gene_prs_results.csv and JSON outputs. Each row in the real output contains the gene symbol, original input columns, raw score, normalized score, percentile rank, and relative tier assignment.",
      visualType: "table",
      isPlaceholder: true,
    },
  ],
  dataQualityMeasures: [
    "Input validation runs before any computation: non-empty check, required column presence, numeric type enforcement for BETA and P, p-value range enforcement, null check on required columns, and gene symbol uniqueness. Six checks in order with descriptive error messages at the first failure.",
    "Raw input data are never modified: all transformations write new columns or new output files, and data/input/ is treated as read-only by the pipeline",
    "Transformations are deterministic: given the same input CSV and Python environment, the pipeline produces identical outputs on every run",
    "P-values of exactly 0 (MAGMA numerical underflow artifacts) are clamped to 1e-300 before the log transformation as a numerical safeguard to prevent undefined log values, not as a statistical correction",
    "The pipeline test suite passes: 31 unit tests across scoring logic (11 tests in test_prs.py) and input validation (20 tests in test_validation.py), verified by running pytest tests/ -v --tb=short in the project environment",
    "Docker support enables reproducible execution in isolated environments, confirmed by the presence of a Dockerfile using the non-interactive Matplotlib Agg backend for headless plot generation",
    "Column names are normalized to uppercase on load, making the input format case-insensitive and reducing format errors from differently-cased MAGMA exports",
    "All threshold and path constants are centralized in a single config.py file so that no values are hard-coded across pipeline modules",
  ],
  limitations: [
    {
      id: "relative-only",
      title: "Relative score tiers, not absolute risk",
      description:
        "The three score tiers (upper, middle, lower) are defined by percentile rank within the submitted gene collection only. A gene in the upper tier has a stronger association signal than most other genes in that specific input. The same gene could fall into a different tier in a different study, with a different set of submitted genes, or with different MAGMA parameterization.",
      mitigation:
        "All portfolio copy uses 'relative score tier' rather than 'risk category.' The original pipeline labels and the plot images are accompanied by a visible caption explaining that they are repository-defined relative labels and do not represent absolute disease risk.",
    },
    {
      id: "gene-level-not-individual",
      title: "Gene-level only, not individual-level",
      description:
        "The pipeline operates on gene-level summary statistics from MAGMA or GWAS, not on individual genotype data. The resulting score is a gene-importance ranking within a single analysis, not a polygenic risk score computed for a specific person.",
      mitigation:
        "The pipeline documentation, portfolio copy, and role description do not use patient-level or individual-level language. The output should not be used to communicate disease risk to individuals.",
    },
    {
      id: "input-distribution-sensitivity",
      title: "Score magnitude depends on input distribution",
      description:
        "Raw scores and their normalized forms are only meaningful relative to the submitted dataset. Running the same gene through two different association studies can yield very different scores depending on sample size, trait definition, and statistical model.",
      mitigation:
        "The methodology documentation explicitly states this dependency. The pipeline produces a percentile rank (relative within the input) as the primary comparative metric, which is more robust to absolute score variation than the raw score alone.",
    },
    {
      id: "no-multiple-testing",
      title: "No multiple-testing correction",
      description:
        "The pipeline uses p-values from the input as evidence weights, not as filtered significance thresholds. No Bonferroni, Benjamini-Hochberg, or other multiple-testing correction is applied. That step belongs upstream in the MAGMA analysis.",
      mitigation:
        "The limitations documentation states this explicitly. Users who need significance thresholds should apply appropriate corrections before submitting the input file.",
    },
    {
      id: "no-functional-annotation",
      title: "Statistical signal only, no functional annotation",
      description:
        "Gene scores are derived purely from statistical association evidence. The pipeline does not integrate eQTL data, pathway enrichment, protein function, or any biological prior. A high-scoring gene reflects strong statistical signal in the input, not confirmed biological relevance.",
      mitigation:
        "Scores are labeled as 'gene-level association scores' throughout, not 'functional importance scores' or 'biological relevance scores.'",
    },
    {
      id: "upstream-dependency",
      title: "Dependence on upstream MAGMA analysis quality",
      description:
        "Score quality depends entirely on the upstream MAGMA analysis that produced the input betas: the study design, population ancestry, sample size, trait definition, gene window boundaries, and statistical model. Different MAGMA configurations produce different and incomparable scores for the same gene.",
      mitigation:
        "The methodology documentation notes that users should confirm BETA values are comparable in scale and direction before combining data from multiple sources.",
    },
    {
      id: "no-clinical-use",
      title: "Not a clinical diagnostic tool",
      description:
        "This pipeline is intended for research and educational purposes only. It must not be used to make clinical decisions, communicate disease risk to patients, or serve as the basis for treatment recommendations.",
      mitigation:
        "This constraint is stated prominently in the README, methodology documentation, limitations documentation, CLAUDE.md, and throughout the portfolio case study.",
    },
    {
      id: "ancestry-heterogeneity",
      title: "Ancestry and population heterogeneity not assessed",
      description:
        "When input data derive from consortium GWAS meta-analyses, heterogeneity across contributing cohorts, ancestry composition, and study-specific confounders are not accounted for by this pipeline.",
      mitigation:
        "The pipeline does not claim to correct for ancestry bias. Users should consult the upstream study's population description before interpreting gene scores across diverse ancestry groups.",
    },
  ],
  technologies: [
    {
      category: "Core Pipeline",
      items: ["Python 3.9+", "pandas 2.0+", "NumPy"],
    },
    {
      category: "Analysis and Visualization",
      items: ["SciPy (KDE)", "Matplotlib 3.7+"],
    },
    {
      category: "Testing and Reproducibility",
      items: ["pytest", "pytest-cov", "Docker"],
    },
  ],
  lessonsLearned: [
    "Centralizing all constants (paths, thresholds, filenames) in a single config.py file eliminates the class of bug where a threshold is changed in one module but not another. For a small pipeline, this discipline is easy to enforce from the start.",
    "Input validation that runs before any computation and raises descriptive errors is more valuable than defensive handling inside computation modules. A clear error at the boundary is faster to diagnose than a silent incorrect result discovered three steps later.",
    "Scientific framing requires explicit choices at every layer of the pipeline, not just in the README. Column names, plot labels, output file names, test fixture naming, and docstrings all communicate whether the tool is being honest about what it produces.",
    "The distinction between what a score measures and what it means for interpretation is the hardest thing to communicate in biomedical data science tools. High statistical association signal is not the same as high clinical importance, and a score pipeline that does not make this explicit will be misinterpreted.",
    "Writing the limitations document before building the visualization was useful. Understanding what the outputs cannot claim helped design simpler and more honest chart labels than would have emerged from starting with the visualization first.",
  ],
  nextSteps: [
    "Add support for reading optional MAGMA full output format directly, reducing the need for manual CSV preparation before running the pipeline",
    "Implement an optional gene-set enrichment summary section in the JSON output that computes per-set average scores and tier distributions when GENE_SET is present",
    "Add an HTML report output option that bundles the score table and both plots into a single self-contained file suitable for sharing with collaborators who do not run Python",
    "Explore integration of an ancestry-aware normalization step that flags when input data may combine effect sizes from incomparable population structures",
    "Extend the test suite to cover the visualization module and the io_utils export functions, increasing coverage beyond the current scoring and validation tests",
  ],
  resultsTitle: "Confirmed Pipeline Outputs",
  resultsTocLabel: "Outputs",
  results: [
    "Accepts and validates a gene-level CSV input (minimum columns: GENE, BETA, P) through six sequential validation checks with descriptive error messages, then computes, normalizes, and ranks scores for all genes in the input",
    "Exports a scored and categorized gene table as CSV and a structured JSON file including summary statistics and, when GENE_SET is present, a per-set tier breakdown",
    "Generates two output plots: a score distribution histogram with KDE overlay grouped by relative tier, and a ranked gene bubble chart with top-gene labels; 31 unit tests pass (verified: pytest tests/ -v --tb=short, 31 passed in 12.77s)",
  ],
  resultsProvenance:
    "This project is a research and educational pipeline. Its scores and rankings are relative to the submitted gene set and are not validated for clinical diagnosis, patient-level prediction, or medical decision-making. The example dataset uses well-known publicly documented gene symbols as demonstration inputs. These gene symbols are used to make the example readable; they do not represent new biological findings or confirmed risk associations.",
  outputDisclosure:
    "Original project plots are shown where available. The scored-table interface is an illustrative representation of the exported tabular output. Note: the source pipeline's repository uses the labels Low, Moderate, and High for the three percentile-based groups. On this portfolio page, these are interpreted only as lower, middle, and upper relative score tiers within the submitted gene set and do not represent absolute disease risk or patient-level clinical risk.",
}
