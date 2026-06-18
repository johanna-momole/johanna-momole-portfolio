import type { CaseStudy } from "./types"

// Source: BMIN503/EPID600 Final Project, University of Pennsylvania
// QMD file: final_project_Johanna Momole.qmd
// Rendered HTML confirms: XGBoost Accuracy 76.32%, Recall 99.14%, F1 86.52%;
// Logistic Regression Accuracy 76.64%, Recall 100.00% (collapsed to positive class), F1 86.78%.
// All metrics are from a post-SMOTE split and are not independent validation estimates.

export const hpvVaccinationCaseStudy: CaseStudy = {
  slug: "hpv-vaccination-analytics",
  title: "HPV Vaccination Analytics",
  subtitle:
    "Exploring selected access and socioeconomic variables associated with reported HPV vaccine receipt in the analyzed NHANES 2021-2023 sample.",
  positioning:
    "A BMIN503/EPID600 course analysis examining whether three binary predictors — insurance coverage, family savings, and education level — are associated with reported HPV vaccine receipt in a subset of the NHANES 2021-2023 survey. Logistic regression and XGBoost were compared with SMOTE class balancing. This case study documents both the original analytical workflow and a detailed methodological reflection on what a more rigorous rebuild would require.",
  summary: [
    "This analysis was developed as the final project for BMIN503/EPID600 (Data Science for Biomedical Informatics) at the University of Pennsylvania. It examines three binary predictors — insurance coverage, family savings, and education level — in relation to reported HPV vaccine receipt using data from the NHANES 2021-2023 cycle.",
    "Logistic regression and XGBoost were implemented in R as complementary classification approaches. SMOTE was applied to address the class imbalance between vaccinated and non-vaccinated respondents. Feature importance was assessed using XGBoost gain scores and logistic regression coefficients. The analysis was evaluated on a post-SMOTE split, not on an independent held-out sample.",
    "This case study documents the original analytical workflow and its methodological limitations transparently. Because SMOTE was applied before the data split, the reported evaluation metrics should not be treated as externally validated performance estimates. A dedicated section describes what a more rigorous rebuild would require.",
  ],
  researchQuestion:
    "Which selected access and socioeconomic variables — insurance coverage, family savings, and education level — were associated with reported HPV vaccine receipt in the analyzed NHANES 2021-2023 sample?",
  context: {
    motivation:
      "HPV vaccination rates in the United States remain below recommended targets, with disparities documented across socioeconomic, educational, and insurance-related dimensions. This BMIN503/EPID600 final project applied classification modeling to NHANES survey data to explore whether three selected binary variables showed measurable associations with reported vaccine receipt, and to practice applying machine learning techniques to an observational public-health dataset.",
    background:
      "The National Health and Nutrition Examination Survey (NHANES) combines interview and physical examination data from a nationally representative sample of the United States civilian non-institutionalized population. The 2021-2023 data collection used the questionnaire module IMQ_L for immunization status and additional modules for insurance, income-related measures, and demographics. Because the HPV vaccination question (IMQ060) is directed at female participants and the education variable (DMDEDUC2) is collected only for participants aged 20 and older, the complete-case analytical dataset used in this project effectively represents female NHANES 2021-2023 respondents in the 20-to-49 age range with non-missing values on all four included variables. The original survey uses a complex sample design with clustering and stratification; this analysis did not apply survey design weights or design variables, which means the results cannot be generalized as nationally representative estimates.",
  },
  role: {
    title: "Analyst",
    summary:
      "BMIN503/EPID600 final course project. Responsible for the full analytical workflow: variable selection, dataset construction, recoding, class balancing, model training, evaluation, and interpretation. Faculty consulted during development: Dr. Fuchiang Tsui (variable selection and data complexity) and Dr. Jesse Hsu (statistical modeling approaches), as acknowledged in the project documentation.",
    responsibilities: [
      "Identify and load four NHANES 2021-2023 data modules using the nhanesA R package",
      "Merge modules on the NHANES sequence number (SEQN) and apply a complete-case filter",
      "Define the binary outcome: reported HPV vaccine receipt (IMQ060) coded as vaccinated or not vaccinated",
      "Recode insurance (HIQ011), family savings (IND310), and education (DMDEDUC2) as binary predictors",
      "Apply SMOTE class balancing using the smotefamily package",
      "Implement an XGBoost classifier and a logistic regression model using caret and glm",
      "Evaluate both models using confusion matrices, accuracy, precision, recall, and F1 via caret",
      "Visualize descriptive distributions for the outcome and all three predictors",
      "Generate feature importance outputs using XGBoost gain scores and logistic regression coefficients",
      "Author the written interpretation, recommendations, and references for the course submission",
    ],
  },
  dataSourcesTitle: "Data Source",
  dataSources: [
    {
      name: "National Health and Nutrition Examination Survey (2021-2023)",
      acronym: "NHANES L",
      type: "Cross-sectional population survey",
      period: "2021-2023 data collection cycle (L cycle)",
      scale:
        "Four NHANES modules: IMQ_L (immunization), HIQ_L (health insurance), INQ_L (income and savings), DEMO_L (demographics). Merged on SEQN; complete-case filter applied across all four included variables. Final analytical sample: 829 respondents (323 reported receiving an HPV vaccine; 506 reported not receiving one). Confirmed from the rendered table(merged_data$HPV_vaccine) output in the original course submission.",
      notes:
        "The HPV vaccination question (IMQ060) was directed at female participants ages 9 to 49. The education variable (DMDEDUC2) is collected only for NHANES participants aged 20 and older. Because the complete-case filter required non-missing education data, the analytical sample was effectively restricted to female respondents ages 20 to 49. The exact final analytical sample size (N=829: 323 vaccinated, 506 not vaccinated) is confirmed from the rendered table output in the original course HTML submission, not inferred visually. The family savings variable (IND310) asks about total savings or cash assets for the family and is used here as an economic proxy; it does not represent an official poverty ratio or income-to-poverty ratio. NHANES uses a complex sample design with clustering and stratification; this analysis did not apply survey design weights, so results cannot be extrapolated as nationally representative estimates.",
    },
  ],
  dataScale: {
    items: [
      { label: "Outcome Classes",    value: "2"         },
      { label: "Predictors Used",    value: "3"         },
      { label: "Models Evaluated",   value: "2"         },
      { label: "Survey Cycle",       value: "2021-2023" },
    ],
  },
  workflowSteps: [
    {
      step: 1,
      label: "Survey Data Loading",
      description:
        "Loaded four NHANES 2021-2023 (L cycle) data modules using the nhanesA R package: IMQ_L (immunization), HIQ_L (health insurance), INQ_L (income and savings), and DEMO_L (demographics including education).",
      output: "Four separate NHANES data frames loaded into R",
      tech: ["R", "nhanesA"],
    },
    {
      step: 2,
      label: "Variable Selection and Extraction",
      description:
        "Selected four variables: IMQ060 (HPV vaccine receipt, female participants 9-49), HIQ011 (health insurance coverage), IND310 (total family savings or cash assets), and DMDEDUC2 (education level, participants 20 and older). Renamed to HPV_vaccine, Insurance, Poverty, and Education respectively.",
      output: "Four named variables identified across the loaded modules",
      tech: ["R", "tidyverse"],
    },
    {
      step: 3,
      label: "Dataset Merging and Complete-Case Filtering",
      description:
        "Merged the four data modules using left join on SEQN (the NHANES sequence number). Filtered to retain only rows with non-missing values on all four included variables. Because DMDEDUC2 collects education data only for participants aged 20 and older, the complete-case filter effectively restricted the analytical sample to female respondents ages 20 to 49. Final pre-SMOTE count: 829 respondents (323 vaccinated, 506 not vaccinated), confirmed from the rendered course output.",
      output: "Single merged analytical dataset with complete data on all four variables",
      tech: ["R", "tidyverse"],
    },
    {
      step: 4,
      label: "Binary Variable Recoding",
      description:
        "Recoded all four variables to binary 1/2 factor levels. HPV vaccine: 1 = Yes (ever received), 2 = No. Insurance: 1 = Covered, 2 = Not Covered. Family savings: 1 = Less than $3,000, 2 = $3,000 or more. Education: 1 = Below college (less than some college), 2 = College or above. Refused and don't-know responses were treated as missing and excluded by the complete-case filter.",
      output: "Binary-coded data frame; original survey response codes removed",
      tech: ["R", "tidyverse"],
    },
    {
      step: 5,
      label: "SMOTE Class Balancing",
      description:
        "Applied SMOTE (Synthetic Minority Oversampling Technique) using the smotefamily package to address the class imbalance between vaccinated and non-vaccinated respondents. Parameters: K=5 nearest neighbors, dup_size=2. SMOTE was applied to the full analytical dataset before the train-test split. This is a known methodological limitation: synthetic observations may appear in both the training and evaluation subsets, creating information leakage risk and potentially inflating recall estimates.",
      output: "SMOTE-balanced data frame with oversampled vaccinated-class observations",
      tech: ["R", "smotefamily"],
    },
    {
      step: 6,
      label: "Model Training",
      description:
        "Split the SMOTE-balanced dataset 70/30 into training and evaluation subsets using set.seed(123). Trained two models on the training subset: (1) XGBoost with binary logistic objective, max_depth=3, eta=0.1, nrounds=100, using a sparse model matrix; and (2) logistic regression using R's glm function with binomial family. Both models used Insurance, Family Savings, and Education as predictors.",
      output: "Fitted XGBoost model object and fitted logistic regression model object",
      tech: ["R", "xgboost", "Matrix", "caret"],
    },
    {
      step: 7,
      label: "Feature Importance and Evaluation",
      description:
        "Evaluated both models on the post-SMOTE 30% evaluation split using caret's confusionMatrix with the positive class set to vaccinated. Extracted XGBoost feature importance by gain. Visualized logistic regression feature importance as a coefficient bar chart using ggplot2. Both models used the same three predictors: Insurance, Family Savings, and Education.",
      output: "Confusion matrices, accuracy, precision, recall, F1, and feature importance plots for both models",
      tech: ["R", "caret", "MLmetrics", "ggplot2"],
    },
  ],
  methods: [
    {
      name: "XGBoost Classification",
      type: "primary",
      description:
        "Gradient-boosted tree ensemble trained with a binary logistic objective. Parameters: max_depth=3, eta=0.1, nrounds=100. Input was a sparse model matrix constructed from the three binary predictor factors. Feature importance was assessed using gain, which measures the improvement in the loss function attributed to each feature across all splits.",
      purpose:
        "Primary classification model selected for its ability to handle nonlinear feature interactions and its built-in gain-based feature importance metric. Used alongside logistic regression to assess whether a more complex model structure produced different predictor rankings.",
    },
    {
      name: "Logistic Regression",
      type: "primary",
      description:
        "Binomial logistic regression implemented using R's glm function. Predicted the binary HPV vaccine receipt outcome as a function of Insurance, Family Savings, and Education. Feature importance was derived from the magnitude and direction of the model coefficients.",
      purpose:
        "Baseline interpretable model for comparison with XGBoost. Coefficient signs and magnitudes provide a direct, interpretable description of the direction of each predictor's association with the outcome in the original course analysis.",
    },
    {
      name: "SMOTE",
      type: "quality",
      description:
        "Synthetic Minority Oversampling Technique applied using the smotefamily R package (K=5 neighbors, dup_size=2). SMOTE generated synthetic observations for the minority class (vaccinated respondents) to balance class proportions before model training.",
      purpose:
        "Addressed the class imbalance in the analytical dataset. Important note: SMOTE was applied to the full dataset before the 70/30 split, not restricted to the training subset. This creates the risk of information leakage between training and evaluation observations, which likely inflates recall estimates for both models.",
    },
    {
      name: "Descriptive Analysis",
      type: "quality",
      description:
        "Frequency distributions for all four binary variables were visualized using R base graphics barplot. Tables were generated to confirm class counts before and after SMOTE.",
      purpose:
        "Documented the distribution of each variable in the analytical dataset and confirmed the class imbalance that motivated the SMOTE step.",
    },
    {
      name: "Binary Outcome Modeling",
      type: "primary",
      description:
        "The outcome was defined as whether the respondent reported ever receiving an HPV vaccine (IMQ060: Yes coded as 1, No coded as 2). Refused and don't-know responses were excluded. The outcome does not capture dose count, series completion status, or timing of vaccination.",
      purpose:
        "Established a clearly defined binary classification target. Important limitation: because the outcome is a single binary item without dose-count information, the analysis cannot distinguish between respondents who received one dose and those who received the full recommended series.",
    },
  ],
  outputPreviews: [
    {
      id: "vaccination-status",
      title: "Distribution of Reported HPV Vaccine Receipt",
      description:
        "Frequency distribution of the binary outcome variable from the original course analysis. The final complete-case dataset before SMOTE contained 829 respondents: 323 who reported receiving an HPV vaccine and 506 who reported not receiving one (confirmed from the rendered table output in the original course submission). This distribution precedes SMOTE balancing.",
      visualType: "bar-chart",
      isPlaceholder: false,
      imageSrc: "/images/case-studies/hpv-vaccination-analytics/hpv-vaccination-status.png",
      imageAlt:
        "Bar chart showing the frequency distribution of reported HPV vaccine receipt in the original NHANES 2021-2023 analytical dataset: 323 respondents reported receiving an HPV vaccine and 506 reported not receiving one (N=829 before SMOTE)",
    },
    {
      id: "feature-importance-xgboost",
      title: "XGBoost Feature Importance (Gain)",
      description:
        "Feature importance by gain from the XGBoost model fitted in the original course analysis. Gain measures the average improvement in the loss function contributed by each feature across all decision tree splits. The three predictors shown are Insurance (HIQ011), Family Savings (IND310), and Education (DMDEDUC2). This plot reflects the fitted model on one training split and does not establish causal relationships between predictors and vaccine receipt. Stability of these rankings is limited by the small predictor set and the evaluation design described in the Limitations section.",
      visualType: "bar-chart",
      isPlaceholder: false,
      imageSrc: "/images/case-studies/hpv-vaccination-analytics/feature-importance-xgboost.png",
      imageAlt:
        "Horizontal bar chart showing XGBoost feature importance by gain for the three predictors: Insurance, Family Savings, and Education, from the original BMIN503 course analysis",
    },
    {
      id: "model-comparison",
      title: "Model Evaluation Framework",
      description:
        "Illustrative representation of the two-model evaluation design. Both XGBoost and logistic regression were evaluated on the same post-SMOTE 30% evaluation split using the same binary outcome and three predictors. Numerical metrics are documented in the Limitations section with appropriate methodological context.",
      visualType: "table",
      isPlaceholder: true,
    },
  ],
  dataQualityMeasures: [
    "Complete-case filtering applied: all respondents with missing values on HPV_vaccine, Insurance, Poverty, or Education were excluded from the analytical dataset",
    "All four variables explicitly recoded from original NHANES survey codes to binary 1/2 factor levels before modeling, with refused and don't-know responses treated as missing",
    "Both models used set.seed(123) to enable replication of the train-test split",
    "Two modeling approaches (XGBoost and logistic regression) provided cross-method comparison for the same predictors and outcome",
    "Feature importance was assessed separately for each model using method-appropriate metrics: gain for XGBoost and coefficient magnitude for logistic regression",
    "Descriptive frequency distributions were generated for all four variables and inspected before modeling",
  ],
  limitations: [
    {
      id: "smote-leakage",
      title: "SMOTE applied before the train-test split",
      description:
        "In the original course workflow, SMOTE was applied to the full analytical dataset before the data was split into training and evaluation subsets. This means synthetic observations generated from vaccinated-class respondents may have appeared in both the training and evaluation subsets. As a consequence, the evaluation subset was not a fully independent hold-out of original observations.",
      mitigation:
        "The reported evaluation metrics (see Original Course Evaluation in this section) should be interpreted as internal evaluation results on a post-SMOTE split rather than as externally validated performance estimates. Recall and F1 scores are likely optimistic. A section below describes what a methodologically sound rebuild would require.",
    },
    {
      id: "lr-positive-class-collapse",
      title: "Logistic regression collapsed to the positive class",
      description:
        "In the original course analysis, the logistic regression model predicted every observation in the evaluation split as vaccinated. Recall was 100% and true negatives were zero. This indicates the decision threshold of 0.5 on the probability output placed all predictions on the positive side, likely because SMOTE inflated the vaccinated class to the point where the model learned to assign higher probability to vaccinated status for most observations.",
      mitigation:
        "The logistic regression recall and F1 figures do not indicate useful class discrimination. This result is documented transparently here rather than omitted. It illustrates a common consequence of applying oversampling before evaluation: the model may appear to perform well on one metric while providing no useful separation on the other class.",
    },
    {
      id: "original-evaluation",
      title: "Original Course Evaluation Metrics",
      description:
        "The following evaluation metrics were reported in the original rendered project output (BMIN503/EPID600 final submission). They are reproduced here for transparency. Both models were evaluated on the same post-SMOTE 30% evaluation split. These metrics cannot be interpreted as externally validated estimates of performance on unseen data.\n\nXGBoost: Accuracy 76.32% · Precision 76.74% · Recall 99.14% · F1 86.52%\nLogistic Regression: Accuracy 76.64% · Precision 76.64% · Recall 100.00% · F1 86.78%\n\nThe logistic regression predicted every evaluated observation as vaccinated (confusion matrix: 233 true positives, 71 false positives, 0 true negatives, 0 false negatives). Its recall of 100% and F1 of 86.78% therefore do not indicate that the model successfully discriminated between classes. Neither model's figures should be described as strong performance, high predictive accuracy, or successful validation.",
      mitigation:
        "These metrics are presented as a historical record of the original course analysis, not as performance benchmarks. Evaluation on an independent pre-SMOTE hold-out set would be required before any assessment of real-world predictive utility.",
    },
    {
      id: "binary-outcome-only",
      title: "Binary outcome without dose-count information",
      description:
        "The outcome variable (IMQ060) captures whether the respondent reported ever receiving an HPV vaccine, coded as Yes or No. It does not capture the number of doses received, whether the respondent completed the recommended series, or when vaccination occurred. The analysis cannot distinguish between respondents who received one dose and those who completed the full recommended schedule.",
      mitigation:
        "All portfolio copy uses 'reported HPV vaccine receipt' to reflect the binary nature of the outcome. Dose count, series completion, and timing are not claimed.",
    },
    {
      id: "female-only-scope",
      title: "Female-only questionnaire scope",
      description:
        "The HPV vaccination question IMQ060 in NHANES L was directed at female participants ages 9 to 49. Male participants were not included in this variable's collection scope in the data modules used. The analytical sample therefore represents female respondents only.",
      mitigation:
        "All population descriptions use 'female participants' or 'female respondents' to reflect the actual scope of the questionnaire item.",
    },
    {
      id: "age-restriction",
      title: "Effective age restriction from DMDEDUC2",
      description:
        "The education variable (DMDEDUC2) is collected only for NHANES participants aged 20 and older. Because the complete-case filter required non-missing education data, the analytical sample was effectively restricted to female respondents aged 20 to 49, even though IMQ060 covers ages 9 to 49. Respondents aged 9 to 19 would have missing DMDEDUC2 values and were excluded.",
      mitigation:
        "The population is described as 'female NHANES respondents ages 20 to 49 with complete data on all four modeled variables' — the 20-year lower bound is derived from the DMDEDUC2 variable scope (collected only for participants 20 and older), not estimated visually.",
    },
    {
      id: "family-savings-proxy",
      title: "Family savings measure as a limited economic proxy",
      description:
        "The economic variable used in this analysis (IND310) asks about total savings or cash assets for the family. It was recoded to a binary variable: less than $3,000 versus $3,000 or more. This measure is a limited economic proxy: it captures savings holdings at one point in time, not income, income-to-poverty ratio, or persistent economic hardship. The source project titled this variable 'poverty level' in some plots, but IND310 is not an official poverty ratio measure.",
      mitigation:
        "All portfolio copy uses 'family savings' or 'family savings indicator' to accurately describe IND310. Descriptive plots from the original project that use the label 'poverty levels' are noted as original historical outputs with clarification that the underlying variable is IND310.",
    },
    {
      id: "no-survey-weights",
      title: "Survey design weights not applied",
      description:
        "NHANES uses a complex probability sample with unequal selection probabilities, stratification, and clustering. Analyses that do not incorporate the provided sampling weights and design variables produce estimates that describe the analytical sample but cannot be generalized as nationally representative estimates of the United States population.",
      mitigation:
        "No nationally representative conclusions are drawn from this analysis. Results are described as patterns observed in the analyzed NHANES sample.",
    },
    {
      id: "cross-sectional-design",
      title: "Cross-sectional observational design",
      description:
        "NHANES is a cross-sectional survey. All variables were measured at or close to a single point in time, so temporal sequences between predictors and the outcome cannot be established. The analysis is associative, not causal. Observed associations between insurance, savings, education, and vaccine receipt do not establish that those factors caused or prevented vaccination.",
      mitigation:
        "The research question and all portfolio copy use associative language. The word 'causes' and similar causal framings are not used.",
    },
    {
      id: "self-reported-outcome",
      title: "Self-reported vaccine receipt",
      description:
        "IMQ060 relies on respondent self-report of whether they ever received an HPV vaccine. Self-reported vaccination status may be subject to recall error or social desirability bias. Verification against vaccination records was not part of this analysis.",
      mitigation:
        "The outcome is described as 'reported HPV vaccine receipt' throughout to reflect the self-reported nature of the measure.",
    },
    {
      id: "small-predictor-set",
      title: "Small and selected predictor set",
      description:
        "The final models included only three predictors: insurance coverage, family savings, and education level. Factors documented in the broader literature on HPV vaccination — including age, race, ethnicity, geographic region, provider recommendation, and parental attitudes — were not included in the model. The analytical dataset also contained no sex or age variables in the final model specification.",
      mitigation:
        "Results are framed as patterns associated with the three selected variables, not as comprehensive explanations of HPV vaccine receipt. Unmeasured confounding is acknowledged.",
    },
    {
      id: "no-external-validation",
      title: "No external or temporal validation",
      description:
        "The analysis was evaluated only on a post-SMOTE internal split. No external dataset, later NHANES cycle, or independent sample was used to validate the model's generalizability. Performance on a different population or time period is unknown.",
      mitigation:
        "External validation is identified as a required step before any practical application of these models, as described in the What I Would Change section.",
    },
    {
      id: "vaccine-schedule-changes",
      title: "Changes in HPV vaccine recommendations over time",
      description:
        "HPV vaccine recommendations in the United States have changed since the vaccine's introduction, including expansions to male recipients, catch-up age limits, and schedule modifications. The 2021-2023 data reflect a specific period in the evolution of those guidelines, and patterns observed may not hold for different cycles.",
      mitigation:
        "Survey cycle is reported precisely as 2021-2023 and no cross-cycle comparisons are made.",
    },
    {
      id: "rebuild-reflection",
      title: "What I Would Change in a Rebuild",
      description:
        "This reflection documents the methodological improvements that would be applied in a more rigorous version of this analysis:\n\n1. Split the original complete-case observations first, before any oversampling, to preserve an untouched evaluation set of real survey respondents.\n2. Apply SMOTE only to the training subset, not to the full dataset.\n3. Prefer applying oversampling within each training resample or cross-validation fold rather than once before the loop.\n4. Preserve the held-out evaluation set as strictly unseen data for final reporting.\n5. Use stratified resampling to maintain class proportions across folds.\n6. Report class-specific precision, recall, specificity, and full confusion matrices for both models rather than only accuracy and F1.\n7. Evaluate ROC-AUC and precision-recall AUC as threshold-independent performance summaries.\n8. Examine probability calibration to assess whether predicted probabilities correspond to observed frequencies.\n9. Compare both models against a simple baseline — for example, predicting the majority class for every observation.\n10. Incorporate NHANES survey weights and design variables to produce estimates that are appropriate for population-level inference.\n11. Include age as a predictor or perform age-stratified analyses, given its known association with vaccination likelihood.\n12. Explore a broader predictor set including race, ethnicity, geographic region, and provider access measures.\n13. Perform external or temporal validation before any practical application.",
      mitigation:
        "This analysis was completed as a course project with the scope and time constraints of an academic submission. The reflection above is presented as evidence of methodological growth, not as a criticism of the original submission's educational value.",
    },
  ],
  technologies: [
    {
      category: "Core Environment",
      items: ["R", "tidyverse", "nhanesA"],
    },
    {
      category: "Modeling and Evaluation",
      items: ["caret", "xgboost", "Matrix", "MLmetrics", "smotefamily"],
    },
    {
      category: "Visualization",
      items: ["ggplot2", "R base graphics"],
    },
  ],
  lessonsLearned: [
    "The ordering of preprocessing steps — specifically whether oversampling precedes or follows the train-test split — determines whether evaluation metrics describe model performance on unseen data or on data partially derived from the training distribution. This distinction has a large effect on recall and must be documented explicitly in any analysis that uses synthetic oversampling.",
    "A model that reports high recall but zero true negatives is not performing well on the classification task; it has collapsed to the positive class. Examining only F1 or accuracy without looking at the full confusion matrix would hide this failure mode.",
    "A small predictor set with high collinearity or shared variance can produce unstable feature importance rankings across model runs. Publishing a single-run importance chart as if it were a stable finding overstates what the analysis demonstrated.",
    "The variable label in a survey codebook often differs from how a derived variable should be described publicly. IND310 is titled 'Total savings/cash assets for the family' — not a poverty index. Writing accurate public copy required reading the source codebook, not just the variable name that appeared in the analysis.",
    "Framing an academic course analysis publicly requires an extra layer of precision: distinguishing what the original project claimed from what can be said about it with hindsight and methodological awareness. That reframing is itself a form of professional communication skill.",
  ],
  nextSteps: [
    "Apply the rebuild methodology described in the What I Would Change section: split first, oversample only the training subset, and evaluate on a held-out set of original observations",
    "Expand the predictor set to include age, self-reported race and ethnicity, geographic region, and provider recommendation if available in the same NHANES cycle",
    "Incorporate NHANES survey weights and design variables to produce survey-weighted prevalence estimates appropriate for population-level inference",
    "Evaluate model performance using ROC-AUC and precision-recall AUC in addition to accuracy and F1, and compare both models against a majority-class baseline",
    "Examine whether the association patterns differ by age group by performing age-stratified analyses, given the effective restriction of the analytic sample to females aged 20 to 49",
    "Validate the rebuilt models on a different NHANES cycle to test temporal stability of the observed associations",
  ],
  resultsTitle: "Documented Analytical Outputs",
  resultsTocLabel: "Outputs",
  results: [
    "A binary HPV vaccine receipt outcome was defined from NHANES variable IMQ060 (Yes: ever received an HPV vaccine / No: never received) for female respondents; Refused and Don't Know responses were treated as missing and excluded",
    "Three binary predictors were constructed from NHANES variables HIQ011 (insurance: covered / not covered), IND310 (family savings: less than $3,000 / $3,000 or more, used as an economic proxy), and DMDEDUC2 (education: below college / college or above)",
    "SMOTE class balancing was applied to the merged complete-case dataset using K=5 nearest neighbors; the balanced data was then split 70/30 into training and evaluation subsets",
    "XGBoost (binary:logistic, max_depth=3, eta=0.1, nrounds=100) and logistic regression (glm, binomial) were trained and evaluated on the same post-SMOTE split; evaluation metrics are documented in the Limitations section with methodological context",
    "Original descriptive plots and feature importance visualizations were generated for the course submission; the XGBoost gain-based importance plot and the HPV vaccination status distribution are included as original course project outputs",
  ],
  resultsProvenance:
    "This case study documents the original BMIN503/EPID600 course analysis and its methodological limitations. Because SMOTE was applied before the data split, the reported evaluation metrics should not be interpreted as validated out-of-sample performance. The predictors showed associations with reported HPV vaccine receipt within the analyzed sample, but these patterns cannot be generalized as nationally representative estimates because survey design weights were not applied.",
  outputDisclosure:
    "The HPV vaccination status distribution and XGBoost feature importance chart are original outputs from the course analysis. The model comparison preview is an illustrative representation of the evaluation framework. Reported evaluation metrics are from the original post-SMOTE split and should be interpreted with the methodological limitations described in the Limitations section.",
}
