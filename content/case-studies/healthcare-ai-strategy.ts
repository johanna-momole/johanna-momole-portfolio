import type { CaseStudy } from "./types"

export const healthcareAiStrategyCaseStudy: CaseStudy = {
  slug: "healthcare-ai-strategy",
  title: "Healthcare AI Strategy and Business Case",
  subtitle: "Economic Modeling, Payer Segmentation, and Scenario Analysis for Conversational AI in Early Pregnancy Care",
  positioning:
    "Applying economic modeling and strategic analysis to evaluate how a conversational AI platform could create value within early pregnancy care delivery, conducted through the Penn Graduate Consulting Club.",
  summary: [
    "As a Business Analyst with the Penn Graduate Consulting Club, I contributed analytical work to an engagement focused on a conversational AI platform for early pregnancy care. The analytical work centered on building a structured business case, evaluating care delivery pathways, and communicating economic findings to both technical and nontechnical stakeholders.",
    "The engagement required translating a complex healthcare technology question into a structured economic analysis: how does a conversational AI platform change outcomes and costs across different care pathways, and what does that mean for different customer and payer segments? The analytical approach used scenario and sensitivity frameworks to make findings interpretable despite uncertainty.",
    "This case study documents the analytical structure and methodology. Specific client details, financial projections, and engagement recommendations remain confidential per consulting engagement standards.",
  ],
  researchQuestion:
    "How can economic modeling across care delivery pathways, combined with payer and customer segment analysis, produce a structured business case for a conversational AI platform in an early-stage healthcare setting?",
  context: {
    motivation:
      "Healthcare AI platforms face a common adoption challenge: the organizations most likely to benefit are often uncertain about the financial and operational case for deployment. Building a credible business case requires translating clinical and operational hypotheses into quantified economic scenarios that decision-makers can interrogate and stress-test.",
    background:
      "Early pregnancy care involves a mix of acute, ambulatory, and care coordination touchpoints across payers, health systems, and patients. Conversational AI platforms targeting this space can potentially reduce reliance on high-cost care settings, improve care coordination, and extend provider reach. Evaluating this requires comparing pathway economics across scenarios, identifying which customer segments capture the most value, and communicating uncertainty clearly through sensitivity analysis.",
  },
  role: {
    title: "Business Analyst, Penn Graduate Consulting Club",
    summary:
      "Contributed as a Business Analyst to the engagement through the Penn Graduate Consulting Club. Work focused on building the economic model, running scenario and sensitivity analyses, producing structured written deliverables, and adapting findings for stakeholders at different levels of technical familiarity.",
    responsibilities: [
      "Build an economic model comparing care delivery pathways and document modeling assumptions for decision-makers",
      "Evaluate payer and enterprise customer segments and translate value drivers into prioritized findings",
      "Run sensitivity analyses across key economic variables including unit costs, utilization rates, adoption rates, and care diversion rates",
      "Produce client-ready written reports and presentation decks communicating findings across technical levels",
      "Structure analytical outputs to support stakeholder decisions rather than to assert definitive answers",
    ],
  },
  dataSourcesTitle: "Analytical Inputs",
  dataSources: [
    {
      name: "Published Healthcare Cost and Utilization Literature",
      acronym: "Cost Literature",
      type: "Secondary research",
      period: "2024",
      scale: "Published benchmarks and estimates",
      notes:
        "Economic modeling used published ranges for healthcare unit costs and utilization patterns in early pregnancy care settings. No proprietary client cost data is disclosed or reproduced in portfolio materials.",
    },
    {
      name: "Payer and Market Structure Research",
      acronym: "Market Research",
      type: "Desk research and segment analysis",
      period: "2024",
      scale: "Segment-level analysis",
      notes:
        "Customer and payer segment analysis drew on publicly available market research, payer structure information, and healthcare AI adoption frameworks. Client-specific market assumptions and engagement findings are confidential.",
    },
    {
      name: "Engagement-Specific Inputs",
      acronym: "Client Inputs",
      type: "Confidential",
      period: "2024",
      scale: "Not disclosed",
      notes:
        "Inputs provided by the client organization during the engagement are confidential. Portfolio materials present the analytical structure and methodology only. Specific financial projections, client recommendations, and proprietary modeling assumptions are not disclosed.",
    },
  ],
  dataScale: {
    items: [
      { label: "Engagement type", value: "Graduate consulting club" },
      { label: "Domain", value: "Early pregnancy care" },
      { label: "Analytical output", value: "Business case with scenario modeling" },
      { label: "Deliverable format", value: "Deck and written report" },
    ],
  },
  workflowSteps: [
    {
      step: 1,
      label: "Problem Structuring",
      description: "Translate the client's business context into a structured analytical question: which care pathway and customer segment combination produces the most credible economic case for the platform.",
      output: "Structured problem definition and analytical scope",
      tech: ["Consulting frameworks", "Issue trees"],
    },
    {
      step: 2,
      label: "Care Pathway Mapping",
      description: "Map the care pathways most relevant to the platform's potential value: emergency department presentations, ambulatory care visits, and care coordination touchpoints. Document cost and utilization assumptions for each pathway.",
      output: "Care pathway economics comparison model",
      tech: ["Excel", "Published cost benchmarks"],
    },
    {
      step: 3,
      label: "Customer Segment Analysis",
      description: "Evaluate payer and enterprise customer segment types, identifying which segments have the greatest alignment between platform capabilities and value capture, and which present the most viable near-term go-to-market path.",
      output: "Prioritized segment landscape with value driver mapping",
      tech: ["Segment analysis frameworks"],
    },
    {
      step: 4,
      label: "Sensitivity and Scenario Analysis",
      description: "Run structured sensitivity analyses across key variables - unit costs, utilization rates, adoption curves, and care diversion rates - to communicate how findings change under different assumptions and to identify which variables matter most.",
      output: "Scenario matrix and sensitivity output",
      tech: ["Excel", "Scenario modeling"],
    },
    {
      step: 5,
      label: "Deliverable Production",
      description: "Produce client-ready decks and written reports adapting findings for different stakeholder audiences. Emphasis on communicating analytical uncertainty clearly rather than asserting false precision.",
      output: "Client deck and written report",
      tech: ["PowerPoint", "Written communication"],
    },
  ],
  methods: [
    {
      name: "Economic Pathway Modeling",
      type: "primary",
      description: "Constructed a model comparing the economics of care delivery across high-cost (emergency department) and lower-cost (ambulatory) care pathways, using published cost and utilization benchmarks with documented assumptions.",
      purpose: "Quantify where and how the platform could shift care utilization and generate economic value",
    },
    {
      name: "Payer and Customer Segment Analysis",
      type: "primary",
      description: "Evaluated customer segment types - payers, employer health plans, and health systems - by mapping their value capture potential against platform capabilities and near-term adoption feasibility.",
      purpose: "Identify which customer relationships to prioritize and why",
    },
    {
      name: "Sensitivity Analysis",
      type: "sensitivity",
      description: "Systematically varied key economic inputs - unit costs, adoption rates, utilization shifts, and diversion rates - to show how business case conclusions respond to uncertainty in each variable.",
      purpose: "Communicate analytical uncertainty and identify which assumptions most influence outcomes",
    },
    {
      name: "Stakeholder Communication Design",
      type: "quality",
      description: "Structured written deliverables and presentation materials to match technical depth to audience. Nontechnical stakeholders received narrative summaries of findings; technical stakeholders received full model documentation.",
      purpose: "Ensure findings are actionable at the appropriate level of detail for each audience",
    },
  ],
  outputPreviews: [
    {
      id: "care-pathway-economics",
      title: "Care Pathway Economics Framework",
      description: "A comparative model showing how cost and utilization patterns differ across high-cost emergency department presentations and lower-cost ambulatory care pathways. The model documents assumptions transparently and uses ranges rather than point estimates to communicate uncertainty. Specific financial values are confidential.",
      visualType: "strategy-care-pathway",
      isPlaceholder: false,
    },
    {
      id: "payer-segment-landscape",
      title: "Payer and Customer Segment Landscape",
      description: "A segment prioritization framework mapping payer and enterprise customer types by their value capture potential and adoption feasibility. Segments are evaluated against platform capabilities and near-term market access. Client-specific segment data and recommendations are confidential.",
      visualType: "strategy-payer-landscape",
      isPlaceholder: false,
    },
    {
      id: "scenario-sensitivity-matrix",
      title: "Scenario and Sensitivity Framework",
      description: "A structured sensitivity analysis showing how business case conclusions respond to variation in key economic variables: unit costs, utilization rates, adoption rates, and care diversion rates. The framework identifies which variables matter most and communicates outcome ranges rather than single-point projections.",
      visualType: "strategy-sensitivity-matrix",
      isPlaceholder: false,
    },
  ],
  outputDisclosure:
    "This case study presents the analytical structure and methodology of a consulting engagement conducted through the Penn Graduate Consulting Club. Client identity, financial projections, proprietary modeling assumptions, and engagement recommendations are confidential and are not disclosed. Portfolio visuals are illustrative representations of the analytical frameworks used.",
  outputLayout: "stacked",
  dataQualityMeasures: [
    "Published benchmarks used for economic modeling, with sources documented and ranges reported rather than point estimates",
    "Sensitivity analysis across key variables to characterize uncertainty rather than assert false precision",
    "Assumptions documented explicitly so decision-makers can interrogate and update the model",
    "Client-specific data and recommendations held confidential per consulting engagement standards",
  ],
  limitations: [
    {
      id: "confidentiality",
      title: "Engagement Confidentiality",
      description: "The full analytical work, financial projections, and client recommendations from this engagement are confidential. Portfolio materials present the methodology and framework structure only.",
      mitigation: "The analytical approach and problem-solving structure are documented in sufficient detail to demonstrate capability without disclosing confidential content.",
    },
    {
      id: "uncertainty",
      title: "Inherent Modeling Uncertainty",
      description: "Economic models in early-stage healthcare AI settings involve significant uncertainty in adoption rates, clinical utilization shifts, and payer behavior. No model output should be interpreted as a definitive prediction.",
      mitigation: "Sensitivity analysis was used throughout the engagement to communicate the range of outcomes under different assumptions, rather than asserting point estimates.",
    },
    {
      id: "single-engagement",
      title: "Single Engagement Context",
      description: "This work reflects one specific engagement context in early pregnancy care. Analytical frameworks used here may not generalize directly to other care settings or AI platform types.",
      mitigation: "The methodological approach - economic pathway modeling, segment analysis, sensitivity frameworks - is transferable even where the specific context differs.",
    },
  ],
  technologies: [
    {
      category: "Analytical Tools",
      items: ["Excel", "Financial modeling", "Scenario analysis"],
    },
    {
      category: "Deliverable Formats",
      items: ["PowerPoint", "Written report", "Executive summary"],
    },
    {
      category: "Frameworks",
      items: ["Issue tree analysis", "Payer segmentation", "Sensitivity analysis", "Care pathway economics"],
    },
  ],
  lessonsLearned: [
    "Communicating uncertainty clearly is more useful to decision-makers than presenting false precision - scenario and sensitivity frameworks are essential tools in early-stage healthcare AI evaluation",
    "Payer and customer segment analysis requires understanding not just who captures value but who has the organizational capacity and motivation to act on it in a near-term timeframe",
    "Economic models are most valuable when assumptions are made explicit and interrogable, not when they produce clean numbers that appear more certain than they are",
    "Adapting the same analytical findings for audiences at different technical levels requires deliberate structure in how information is layered and framed",
  ],
  nextSteps: [
    "Apply economic modeling and scenario frameworks to other healthcare AI adoption contexts across different care settings and patient populations",
    "Develop more sophisticated customer segment analysis methods that incorporate payer market structure and contracting dynamics",
    "Build experience with healthcare technology market access strategy across different payer mix environments",
  ],
}
