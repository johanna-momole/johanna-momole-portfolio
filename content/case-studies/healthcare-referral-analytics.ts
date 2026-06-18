import type { CaseStudy } from "./types"

export const healthcareReferralCaseStudy: CaseStudy = {
  slug: "healthcare-referral-analytics",
  title: "Healthcare Referral Analytics",
  subtitle: "Provider Network, Referral Performance, and Operational Workflow Analysis",
  positioning:
    "Connecting provider network data, referral patterns, and operational workflows to support hospital strategy and patient access at Siloam Hospitals Kebon Jeruk.",
  summary: [
    "In 2024, I led analytical work at Siloam Hospitals Kebon Jeruk focused on understanding and improving the hospital's external referral network. This involved mapping provider relationships, analyzing referral flow by service line and geography, and identifying workflow bottlenecks in EMR-related administrative processes.",
    "The work combined SQL-based operational queries, Python-driven pattern analysis, and Tableau dashboards that made referral performance visible to hospital leadership. Analytical outputs contributed to partnership development decisions and operational process redesign.",
    "Confirmed professional outcomes from 2024 include 216% referral revenue growth, the addition of more than 200 partner agreements, and a 45.5% reduction in EMR-related processing time. These outcomes reflect team and organizational effort alongside analytical contributions.",
  ],
  researchQuestion:
    "How can provider network data, referral flow patterns, and EMR workflow information be combined to support hospital referral strategy, partnership development, and operational efficiency at a regional health system?",
  context: {
    motivation:
      "Siloam Hospitals Kebon Jeruk operates within a regional healthcare market where referral relationships are central to patient access and revenue sustainability. Leadership needed a clearer view of which provider partnerships were performing, which geographic zones were underserved, and where administrative workflows were creating bottlenecks that slowed the referral process.",
    background:
      "Referral analytics in hospital settings sits at the intersection of business intelligence, clinical operations, and relationship management. The analytical challenge is not just generating metrics, but translating them into views that operational and strategic stakeholders can act on. EMR-related administrative workflows often carry hidden latency that compounds over volume, and identifying the specific friction points requires combining multiple operational data categories.",
  },
  role: {
    title: "Network & Relation Executive",
    summary:
      "In this role, I was responsible for both the relationship management dimension of provider partnerships and the analytical work that informed those partnerships. The title reflects a professional function combining external relationship development with operational and strategic analysis. Portfolio case study materials represent the analytical contribution to this work.",
    responsibilities: [
      "Design and build SQL queries to extract and organize referral and workflow data from operational systems",
      "Develop Python-based analysis of referral patterns across provider types, service lines, and geographic zones",
      "Build and maintain Tableau dashboards making referral performance visible to hospital leadership",
      "Identify bottlenecks in EMR-related administrative workflows and recommend process changes",
      "Coordinate with clinical and operational teams to validate analytical findings",
      "Present findings in structured briefings that connect analytical observations to strategic decisions",
      "Support provider relationship development by connecting network data to partnership opportunity analysis",
    ],
  },
  dataSourcesTitle: "Analytical Inputs Represented",
  dataSources: [
    {
      name: "Referral Operations Information",
      acronym: "Referral Ops",
      type: "Conceptual input category",
      period: "2024",
      scale: "Represented through synthetic portfolio visualizations",
      notes:
        "Represents the type of referral source, volume, pathway, and timing information relevant to network and performance analysis. Public portfolio visualizations use synthetic representative content and do not reproduce any hospital operational records. Referral volume figures, source identifiers, and pathway details are confidential.",
    },
    {
      name: "Provider and Partner Relationship Information",
      acronym: "Partner Info",
      type: "Conceptual input category",
      period: "2024",
      scale: "Represented through synthetic portfolio visualizations",
      notes:
        "Represents the type of provider identity, specialty, relationship status, and agreement tracking information relevant to network mapping. Public portfolio visualizations use synthetic representative content. Provider names, agreement terms, and relationship details are confidential and are not included in any portfolio material.",
    },
    {
      name: "Workflow Timing Information",
      acronym: "Workflow",
      type: "Conceptual input category",
      period: "2024",
      scale: "Represented through synthetic portfolio visualizations",
      notes:
        "Represents the type of EMR-related processing time, step-level latency, and administrative workflow information used to identify throughput bottlenecks. Public portfolio visualizations use synthetic representative content. The 45.5% reduction in EMR-related processing time reflects a confirmed professional outcome; the specific operational records underlying it are confidential.",
    },
  ],
  dataScale: {
    items: [
      { label: "Referral Revenue Growth",      value: "216%"  },
      { label: "Partner Agreements Added",      value: "200+"  },
      { label: "Processing Time Reduction",     value: "45.5%" },
      { label: "Reporting Period",              value: "2024"  },
    ],
  },
  workflowSteps: [
    {
      step: 1,
      label: "Define Operational Question",
      description:
        "Identify the specific strategic or operational question: which referral pathways need attention, which provider relationships represent growth opportunities, where EMR workflow bottlenecks reduce throughput.",
      output: "Analytical brief framing the question and data categories needed",
      tech: [],
    },
    {
      step: 2,
      label: "Consolidate Operational Data",
      description:
        "Bring together available referral, provider, and workflow information from hospital operational systems into a working analytical dataset, resolving definitional inconsistencies across departments.",
      output: "Organized working dataset for analysis",
      tech: ["SQL", "Python"],
    },
    {
      step: 3,
      label: "Provider Network Analysis",
      description:
        "Map referral sources and volumes across the provider network to identify concentration, coverage gaps, and relationship patterns by service line and provider type.",
      output: "Network view of referral relationships and relative volume",
      tech: ["SQL", "Python"],
    },
    {
      step: 4,
      label: "Geographic and Service-Line Review",
      description:
        "Examine referral distribution across geographic zones and clinical service lines to surface growth opportunities, specialty alignment gaps, and underserved catchment areas.",
      output: "Coverage analysis by zone and service category",
      tech: ["SQL", "Python"],
    },
    {
      step: 5,
      label: "Dashboard Design and Build",
      description:
        "Translate analytical views into Tableau dashboards that make referral performance interpretable for operational and strategic stakeholders who need answers, not raw data.",
      output: "Tableau dashboards deployed for leadership review",
      tech: ["Tableau"],
    },
    {
      step: 6,
      label: "Operational Recommendations",
      description:
        "Convert analytical findings into prioritized operational recommendations: which partnerships to strengthen, which pathways to formalize, which EMR workflow steps to redesign.",
      output: "Recommendation briefings for hospital leadership",
      tech: ["Tableau"],
    },
  ],
  methods: [
    {
      name: "Referral Network Mapping",
      type: "primary",
      description:
        "Mapping referral volume and directionality across the provider network to identify concentration, coverage gaps, and relationship patterns by provider type and specialty.",
      purpose:
        "Provides a structural view of which partnerships are active, which are underutilized, and where network coverage is thin relative to the hospital's catchment area.",
    },
    {
      name: "Service-Line Performance Analysis",
      type: "primary",
      description:
        "Breaking down referral volume by clinical service line to understand which specialties receive referrals from which provider types and geographic zones.",
      purpose:
        "Identifies service-line-specific growth opportunities and specialty mismatches between external provider capabilities and hospital intake capacity.",
    },
    {
      name: "Geographic Coverage Analysis",
      type: "primary",
      description:
        "Examining referral source locations to understand geographic concentration and identify zones with low referral density relative to population or partner density.",
      purpose:
        "Informs decisions about where to focus partnership development and provider outreach to expand the hospital's geographic referral reach.",
    },
    {
      name: "Workflow Bottleneck Identification",
      type: "quality",
      description:
        "Identifying steps in EMR-related administrative workflows where processing latency accumulates and reduces throughput across referral volume.",
      purpose:
        "Contributed to identifying the specific friction point that supported a 45.5% reduction in EMR-related processing time through targeted process redesign.",
    },
    {
      name: "Operational Dashboard Design",
      type: "validation",
      description:
        "Translating analytical views into Tableau dashboards that make referral performance visible to stakeholders who work with operational decisions, not raw data.",
      purpose:
        "Ensures analytical findings reach decision-makers in a form that supports action, not just observation.",
    },
  ],
  outputPreviews: [
    {
      id: "referral-network",
      title: "Provider Network View",
      description:
        "An illustrative view of the provider network showing referral relationships by source type and zone grouping. Abstract node labels represent conceptual provider categories. No real provider names, identifiers, or referral volumes are shown.",
      visualType: "network",
      isPlaceholder: true,
    },
    {
      id: "referral-trend",
      title: "Referral Volume Trend",
      description:
        "An illustrative time-series view showing relative referral activity across reporting periods. Abstract trend indicators represent the type of temporal analysis performed. No real referral counts or revenue figures are shown.",
      visualType: "trend-chart",
      isPlaceholder: true,
    },
    {
      id: "service-matrix",
      title: "Service-Line Distribution Matrix",
      description:
        "An illustrative matrix view showing relative referral activity across conceptual service-line and geographic zone dimensions. Cell shading represents relative activity levels only. No operational records, zone identifiers, or numeric values are shown.",
      visualType: "matrix",
      isPlaceholder: true,
    },
  ],
  dataQualityMeasures: [
    "Portfolio dashboard previews use synthetic representative data and do not contain patient information or confidential hospital records",
    "Confirmed professional outcomes are documented results from Johanna's work at Siloam Hospitals Kebon Jeruk in 2024 and represent organizational outcomes, not analytical output alone",
    "The 216% referral revenue growth refers specifically to referral revenue, not total hospital revenue",
    "The 45.5% refers specifically to a reduction in EMR-related processing time, not to overall hospital operational efficiency",
    "The 200+ partner agreements refers to agreements added in 2024, not the total active partner count at year-end",
    "Analytical dashboard views were developed to inform operational decisions and presented to hospital leadership as inputs to strategy, not as automated decision systems",
  ],
  limitations: [
    {
      id: "confidentiality",
      title: "Data confidentiality",
      description:
        "Hospital referral data, provider identities, contract terms, and financial records are confidential. The portfolio does not contain or reproduce any of this information.",
      mitigation:
        "All dashboard previews use abstract synthetic data. Data source cards describe conceptual categories, not verified system names, field names, or record counts.",
    },
    {
      id: "synthetic-visuals",
      title: "Synthetic portfolio visualizations",
      description:
        "Portfolio dashboard previews represent the types of analytical views created, using synthetic data. They are not de-identified real data and should not be interpreted as showing actual referral volumes, provider distributions, or workflow patterns.",
      mitigation:
        "Each output preview includes a clear label indicating synthetic or illustrative content. The case study text explains the distinction between confirmed outcomes and analytical interface design.",
    },
    {
      id: "attribution",
      title: "Outcome attribution",
      description:
        "The 216% referral revenue growth, 200+ partner agreements, and 45.5% EMR processing time reduction reflect professional outcomes from 2024. These outcomes involved team effort, organizational strategy, clinical operations, and market context alongside analytical work.",
      mitigation:
        "Results are stated with contribution language (contributed to, supported, informed) rather than causal claims. A separate provenance note on the results section makes this explicit.",
    },
    {
      id: "data-quality",
      title: "Operational data quality",
      description:
        "Referral and workflow data in hospital operational systems may be incomplete, inconsistently defined, or structured differently across departments and time periods.",
      mitigation:
        "Analytical work included definitional alignment across departments before drawing cross-departmental comparisons. Inconsistencies identified during consolidation informed the scope of conclusions drawn.",
    },
    {
      id: "generalizability",
      title: "Context specificity",
      description:
        "Referral network patterns and workflow findings are specific to the organizational context, service-line mix, and market of Siloam Hospitals Kebon Jeruk. Results and methods may not transfer directly to different hospital settings.",
      mitigation:
        "The case study describes methods in terms transferable to other hospital contexts while grounding specific outcomes in the Siloam Hospitals context explicitly.",
    },
  ],
  technologies: [
    {
      category: "Analytics and Query",
      items: ["SQL", "Python"],
    },
    {
      category: "Visualization and Reporting",
      items: ["Tableau"],
    },
  ],
  lessonsLearned: [
    "Provider relationship management and analytical work are inseparable in healthcare referral growth. Data can identify which partnerships represent the highest opportunity, but building and sustaining those relationships requires coordination and trust that no dashboard produces alone.",
    "Dashboard adoption by operational stakeholders depends more on answering the right questions simply than on comprehensive analytical coverage. Weekly leadership briefings work best when they directly address the current operational question, not when they display every available metric.",
    "Workflow bottleneck analysis in healthcare operations often reveals that a small number of administrative coordination steps account for most throughput loss. The 45.5% reduction in EMR-related processing time came from identifying a specific friction point, not from optimizing across all workflow stages.",
    "Referral analytics in hospital settings requires careful disambiguation of operational definitions. The word 'referral' can mean different things across clinical departments, and inconsistent definitions produce incomparable views that mislead strategic decisions.",
    "Translating operational data into executive-visible dashboards requires sustained collaboration with the operational teams who understand what the numbers mean in context, not just the technical work of building the views.",
  ],
  nextSteps: [
    "Formalize a provider segmentation framework categorizing partners by referral volume contribution, service-line alignment, and geographic zone for more targeted relationship investment",
    "Develop leading indicators of referral pathway underperformance using historical trend patterns to enable proactive rather than reactive operational responses",
    "Build a longitudinal referral performance tracker measuring the relationship between partner agreement activity and referral volume changes across subsequent quarters",
    "Extend EMR workflow analysis to identify additional coordination steps that could benefit from process redesign, building on the 45.5% processing time reduction baseline",
    "Develop service-line-specific referral pathway protocols matching external provider specialties with the most appropriate clinical departments at Siloam Hospitals",
  ],
  resultsTitle: "Confirmed Professional Outcomes",
  resultsTocLabel: "Outcomes",
  results: [
    "Referral revenue growth of 216% in 2024, supported through provider relationship development, referral network expansion, and analytical work connecting operational data to strategic decision-making.",
    "More than 200 new partner agreements added in 2024, developed through coordinated provider outreach, specialized referral pathway development, and sustained relationship management.",
    "A 45.5% reduction in EMR-related processing time in 2024, supported by analytical identification of workflow bottlenecks and evidence-based process redesign recommendations.",
  ],
  resultsProvenance:
    "These outcomes reflect Johanna's professional work at Siloam Hospitals Kebon Jeruk. The portfolio visualizations are synthetic representative interfaces and do not reproduce confidential hospital data. The analytical work contributed to and informed these outcomes alongside team effort, clinical operations, and broader organizational factors. The portfolio case study should not be interpreted as the sole cause of the reported results.",
}
