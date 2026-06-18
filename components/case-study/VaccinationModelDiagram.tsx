import { cn } from "@/lib/utils"

// Vertical flow methodology diagram for HPV Vaccination Analytics.
// Documents the original course workflow: 3 predictors → merge/recode → SMOTE (flagged)
// → 70/30 split → XGBoost and Logistic Regression → binary output.
// The SMOTE-before-split step is visually flagged with a caution ring and "!" indicator
// to signal that this is a methodological note, not recommended best practice.
// Background: cross / plus pattern (distinct from dot grid, scan-line, cross-hatch, diagonal).
// Accessible text is included as an sr-only paragraph alongside the SVG.

interface VaccinationModelDiagramProps {
  className?: string
}

export function VaccinationModelDiagram({ className }: VaccinationModelDiagramProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      {/* Accessible description of the full modeling workflow */}
      <p className="sr-only">
        HPV Vaccination Analytics modeling workflow. Three binary predictors were used:
        insurance coverage (NHANES variable HIQ011, coded as covered or not covered),
        family savings (NHANES variable IND310, coded as less than three thousand dollars
        or three thousand dollars or more, used as an economic proxy),
        and education level (NHANES variable DMDEDUC2, coded as below college or college and above).
        These were merged on the NHANES sequence number and filtered to complete cases.
        All four variables were recoded to binary one-or-two factor levels.
        SMOTE class balancing was then applied to the full analytical dataset using K equals five
        nearest neighbors and a duplication size of two.
        Caution: SMOTE was applied before the data was split, which introduces potential
        information leakage and likely inflates recall estimates.
        The balanced data was then split approximately seventy percent training and thirty percent evaluation.
        Two classification models were trained: XGBoost using a binary logistic objective
        with maximum tree depth of three, learning rate of zero point one, and one hundred rounds;
        and logistic regression using R glm with a binomial family.
        Both models were evaluated using a confusion matrix, accuracy, precision, recall,
        and F1 score via the caret package.
        Feature importance was assessed using XGBoost gain scores and logistic regression coefficients.
        The binary outcome was reported HPV vaccine receipt: vaccinated versus not vaccinated.
      </p>

      <svg
        viewBox="0 0 680 300"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="min-w-[520px] w-full"
        role="img"
      >
        <defs>
          <linearGradient id="vax-mod-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F0618" />
            <stop offset="100%" stopColor="#07050E" />
          </linearGradient>
          {/* Cross / plus pattern — distinct from existing methodology diagram backgrounds */}
          <pattern id="vax-cross" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="10" y1="7" x2="10" y2="13" stroke="#D9D1FF" strokeWidth="0.4" strokeOpacity="0.04" />
            <line x1="7"  y1="10" x2="13" y2="10" stroke="#D9D1FF" strokeWidth="0.4" strokeOpacity="0.04" />
          </pattern>
          <marker id="vax-mod-arr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0.5 L5,2.5 L0,4.5 Z" fill="#C9F2EE" fillOpacity="0.40" />
          </marker>
          <marker id="vax-mod-arr-warn" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0.5 L5,2.5 L0,4.5 Z" fill="#C7FF35" fillOpacity="0.40" />
          </marker>
        </defs>

        <rect width="680" height="300" rx="16" fill="url(#vax-mod-bg)" />
        <rect width="680" height="300" rx="16" fill="url(#vax-cross)" />

        {/* Header */}
        <text x="16" y="20" fontSize="6" fill="#C9F2EE" fillOpacity="0.35" fontFamily="monospace" fontWeight="500" letterSpacing="2">
          MODELING APPROACH
        </text>
        <line x1="16" y1="26" x2="664" y2="26" stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.10" />

        {/* ── Row 1: Predictor chips ──────────────────────────────────────── */}
        <rect x="55"  y="34" width="160" height="26" rx="6" fill="#D9D1FF" fillOpacity="0.07" stroke="#D9D1FF" strokeWidth="0.6" strokeOpacity="0.30" />
        <text x="135" y="44" fontSize="7"   fill="#D9D1FF" fillOpacity="0.82" fontFamily="monospace" fontWeight="bold" textAnchor="middle">INSURANCE</text>
        <text x="135" y="55" fontSize="4.5" fill="#D9D1FF" fillOpacity="0.38" fontFamily="monospace" textAnchor="middle">HIQ011</text>

        <rect x="260" y="34" width="160" height="26" rx="6" fill="#F1D7E4" fillOpacity="0.07" stroke="#F1D7E4" strokeWidth="0.6" strokeOpacity="0.30" />
        <text x="340" y="44" fontSize="7"   fill="#F1D7E4" fillOpacity="0.82" fontFamily="monospace" fontWeight="bold" textAnchor="middle">FAMILY SAVINGS</text>
        <text x="340" y="55" fontSize="4.5" fill="#F1D7E4" fillOpacity="0.38" fontFamily="monospace" textAnchor="middle">IND310 · economic proxy</text>

        <rect x="465" y="34" width="160" height="26" rx="6" fill="#C9F2EE" fillOpacity="0.07" stroke="#C9F2EE" strokeWidth="0.6" strokeOpacity="0.30" />
        <text x="545" y="44" fontSize="7"   fill="#C9F2EE" fillOpacity="0.82" fontFamily="monospace" fontWeight="bold" textAnchor="middle">EDUCATION</text>
        <text x="545" y="55" fontSize="4.5" fill="#C9F2EE" fillOpacity="0.38" fontFamily="monospace" textAnchor="middle">DMDEDUC2</text>

        {/* Arrows: chips → merge box */}
        <line x1="135" y1="60" x2="135" y2="72" stroke="#D9D1FF" strokeWidth="0.7" strokeOpacity="0.20" markerEnd="url(#vax-mod-arr)" />
        <line x1="340" y1="60" x2="340" y2="72" stroke="#F1D7E4" strokeWidth="0.7" strokeOpacity="0.20" markerEnd="url(#vax-mod-arr)" />
        <line x1="545" y1="60" x2="545" y2="72" stroke="#C9F2EE" strokeWidth="0.7" strokeOpacity="0.20" markerEnd="url(#vax-mod-arr)" />

        {/* ── Row 2: Merge & recode ───────────────────────────────────────── */}
        <rect x="95" y="74" width="490" height="28" rx="7" fill="#C9F2EE" fillOpacity="0.06" stroke="#C9F2EE" strokeWidth="0.7" strokeOpacity="0.28" />
        <text x="340" y="85" fontSize="6.5" fill="#C9F2EE" fillOpacity="0.72" fontFamily="monospace" fontWeight="500" textAnchor="middle">MERGE &amp; BINARY RECODE</text>
        <text x="340" y="96" fontSize="4.5" fill="#C9F2EE" fillOpacity="0.28" fontFamily="monospace" textAnchor="middle">Left join on SEQN · Complete-case filter · All variables recoded to binary 1/2</text>

        {/* Arrow → SMOTE */}
        <line x1="340" y1="102" x2="340" y2="114" stroke="#C7FF35" strokeWidth="0.7" strokeOpacity="0.22" markerEnd="url(#vax-mod-arr-warn)" />

        {/* ── Row 3: SMOTE (caution) ──────────────────────────────────────── */}
        <rect x="95" y="116" width="490" height="28" rx="7" fill="#C7FF35" fillOpacity="0.06" stroke="#C7FF35" strokeWidth="0.7" strokeOpacity="0.40" />
        <text x="340" y="127" fontSize="6.5" fill="#C7FF35" fillOpacity="0.78" fontFamily="monospace" fontWeight="500" textAnchor="middle">SMOTE CLASS BALANCING</text>
        <text x="340" y="138" fontSize="4.5" fill="#C7FF35" fillOpacity="0.38" fontFamily="monospace" textAnchor="middle">K=5 nearest neighbors · dup_size=2 · smotefamily</text>

        {/* Caution indicator */}
        <circle cx="574" cy="124" r="7" fill="#C7FF35" fillOpacity="0.12" stroke="#C7FF35" strokeWidth="0.6" strokeOpacity="0.55" />
        <text x="574" y="128" fontSize="8" fill="#C7FF35" fillOpacity="0.85" fontFamily="monospace" fontWeight="bold" textAnchor="middle">!</text>

        {/* Leakage note */}
        <text x="340" y="156" fontSize="4.5" fill="#C7FF35" fillOpacity="0.48" fontFamily="monospace" textAnchor="middle">
          ! Applied to full dataset before 70/30 split — introduces potential information leakage
        </text>

        {/* Branching arrows → two model boxes */}
        <path d="M 340,160 L 340,170 L 190,170 L 190,180" stroke="#C9F2EE" strokeWidth="0.7" strokeOpacity="0.18" fill="none" markerEnd="url(#vax-mod-arr)" />
        <path d="M 340,160 L 340,170 L 490,170 L 490,180" stroke="#F1D7E4" strokeWidth="0.7" strokeOpacity="0.18" fill="none" markerEnd="url(#vax-mod-arr)" />

        {/* ── Row 4: Model boxes ──────────────────────────────────────────── */}
        <rect x="90" y="182" width="200" height="38" rx="7" fill="#C9F2EE" fillOpacity="0.06" stroke="#C9F2EE" strokeWidth="0.7" strokeOpacity="0.28" />
        <text x="190" y="195" fontSize="7"   fill="#C9F2EE" fillOpacity="0.78" fontFamily="monospace" fontWeight="bold" textAnchor="middle">XGBOOST</text>
        <text x="190" y="206" fontSize="4.5" fill="#C9F2EE" fillOpacity="0.35" fontFamily="monospace" textAnchor="middle">binary:logistic · max_depth=3</text>
        <text x="190" y="215" fontSize="4.5" fill="#C9F2EE" fillOpacity="0.35" fontFamily="monospace" textAnchor="middle">eta=0.1 · nrounds=100</text>

        <rect x="390" y="182" width="200" height="38" rx="7" fill="#F1D7E4" fillOpacity="0.06" stroke="#F1D7E4" strokeWidth="0.7" strokeOpacity="0.28" />
        <text x="490" y="195" fontSize="7"   fill="#F1D7E4" fillOpacity="0.78" fontFamily="monospace" fontWeight="bold" textAnchor="middle">LOGISTIC REGRESSION</text>
        <text x="490" y="206" fontSize="4.5" fill="#F1D7E4" fillOpacity="0.35" fontFamily="monospace" textAnchor="middle">glm · binomial family</text>
        <text x="490" y="215" fontSize="4.5" fill="#F1D7E4" fillOpacity="0.35" fontFamily="monospace" textAnchor="middle">coefficient-based importance</text>

        {/* T-connector: two model boxes → evaluation */}
        <path d="M 190,220 L 190,234 L 490,234 L 490,220" stroke="#C9F2EE" strokeWidth="0.7" strokeOpacity="0.16" fill="none" />
        <line x1="340" y1="234" x2="340" y2="244" stroke="#C9F2EE" strokeWidth="0.7" strokeOpacity="0.22" markerEnd="url(#vax-mod-arr)" />

        {/* ── Row 5: Evaluation ───────────────────────────────────────────── */}
        <rect x="95" y="246" width="490" height="26" rx="6" fill="#D9D1FF" fillOpacity="0.06" stroke="#D9D1FF" strokeWidth="0.6" strokeOpacity="0.24" />
        <text x="340" y="257" fontSize="6.5" fill="#D9D1FF" fillOpacity="0.70" fontFamily="monospace" fontWeight="500" textAnchor="middle">EVALUATION (POST-SMOTE SPLIT)</text>
        <text x="340" y="267" fontSize="4.5" fill="#D9D1FF" fillOpacity="0.28" fontFamily="monospace" textAnchor="middle">Confusion matrix · Accuracy · Precision · Recall · F1 · Feature importance</text>

        {/* Footer */}
        <line x1="16" y1="282" x2="664" y2="282" stroke="#C9F2EE" strokeWidth="0.4" strokeOpacity="0.08" />
        <text x="340" y="292" fontSize="4.5" fill="#C7FF35" fillOpacity="0.35" fontFamily="monospace" textAnchor="middle">
          ! Diagram documents the original course workflow — see Limitations for methodological notes
        </text>
      </svg>
    </div>
  )
}
