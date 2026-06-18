import { cn } from "@/lib/utils"

// Six provider nodes spread in a horseshoe arc above the central hospital hub.
// All labels are generic (Provider A-F). No real names, patient data, or
// operational records are represented.
const PROVIDERS = [
  { cx: 82,  cy: 78,  label: "A", zone: "A" },
  { cx: 178, cy: 42,  label: "B", zone: "A" },
  { cx: 286, cy: 30,  label: "C", zone: "A" },
  { cx: 394, cy: 30,  label: "D", zone: "B" },
  { cx: 502, cy: 42,  label: "E", zone: "B" },
  { cx: 598, cy: 78,  label: "F", zone: "B" },
]
const HUB_CX = 340
const HUB_CY = 158
const NODE_R = 18
const HUB_R  = 26

interface ReferralNetworkDiagramProps {
  className?: string
}

export function ReferralNetworkDiagram({ className }: ReferralNetworkDiagramProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <svg
        viewBox="0 0 680 220"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="min-w-[520px] w-full"
        role="img"
      >
        <defs>
          <radialGradient id="ref-net-bg" cx="50%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#0C1B2C" />
            <stop offset="100%" stopColor="#040A14" />
          </radialGradient>
          <marker id="ref-net-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0.5 L5,2.5 L0,4.5 Z" fill="#C6A0FF" fillOpacity="0.45" />
          </marker>
          {/* Radial pulse glow behind hub */}
          <radialGradient id="ref-hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C7FF35" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#C7FF35" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="680" height="220" rx="16" fill="url(#ref-net-bg)" />

        {/* Dot grid */}
        <defs>
          <pattern id="ref-net-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill="#7FE7F2" fillOpacity="0.03" />
          </pattern>
        </defs>
        <rect width="680" height="220" rx="16" fill="url(#ref-net-dots)" />

        {/* Header */}
        <text x="16" y="20" fontSize="6" fill="#7FE7F2" fillOpacity="0.38" fontFamily="monospace" fontWeight="500" letterSpacing="2">
          PROVIDER NETWORK · REFERRAL RELATIONSHIP MODEL
        </text>
        <line x1="16" y1="26" x2="664" y2="26" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.10" />

        {/* Zone A background arc (left cluster) */}
        <ellipse
          cx="182" cy="62"
          rx="138" ry="52"
          fill="#7FE7F2" fillOpacity="0.025"
          stroke="#7FE7F2" strokeWidth="0.6" strokeOpacity="0.09" strokeDasharray="4 4"
        />
        <text x="50" y="122" fontSize="5" fill="#7FE7F2" fillOpacity="0.22" fontFamily="monospace">Zone A</text>

        {/* Zone B background arc (right cluster) */}
        <ellipse
          cx="498" cy="62"
          rx="138" ry="52"
          fill="#C6A0FF" fillOpacity="0.025"
          stroke="#C6A0FF" strokeWidth="0.6" strokeOpacity="0.09" strokeDasharray="4 4"
        />
        <text x="598" y="122" fontSize="5" fill="#C6A0FF" fillOpacity="0.22" fontFamily="monospace">Zone B</text>

        {/* Connection lines from provider nodes to hospital hub */}
        {PROVIDERS.map((p) => {
          const dx = HUB_CX - p.cx
          const dy = HUB_CY - p.cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          const ux = dx / dist
          const uy = dy / dist
          const x1 = p.cx + ux * NODE_R
          const y1 = p.cy + uy * NODE_R
          const x2 = HUB_CX - ux * HUB_R
          const y2 = HUB_CY - uy * HUB_R
          const zoneColor = p.zone === "A" ? "#7FE7F2" : "#C6A0FF"
          return (
            <line
              key={p.label}
              x1={x1} y1={y1}
              x2={x2} y2={y2}
              stroke={zoneColor}
              strokeWidth="0.8"
              strokeOpacity="0.22"
              markerEnd="url(#ref-net-arrow)"
            />
          )
        })}

        {/* Hub glow */}
        <circle cx={HUB_CX} cy={HUB_CY} r={HUB_R + 18} fill="url(#ref-hub-glow)" />

        {/* Hospital hub — outer ring */}
        <circle
          cx={HUB_CX} cy={HUB_CY} r={HUB_R + 6}
          fill="none"
          stroke="#C7FF35" strokeWidth="0.5" strokeOpacity="0.18" strokeDasharray="3 3"
        />
        {/* Hospital hub — main circle */}
        <circle
          cx={HUB_CX} cy={HUB_CY} r={HUB_R}
          fill="#C7FF35" fillOpacity="0.08"
          stroke="#C7FF35" strokeWidth="0.9" strokeOpacity="0.60"
        />
        <text x={HUB_CX} y={HUB_CY - 5} fontSize="6.5" fill="#C7FF35" fillOpacity="0.82" fontFamily="monospace" fontWeight="bold" textAnchor="middle">HOSP</text>
        <text x={HUB_CX} y={HUB_CY + 8} fontSize="4.5" fill="#C7FF35" fillOpacity="0.40" fontFamily="monospace" textAnchor="middle">Hub</text>

        {/* Provider nodes */}
        {PROVIDERS.map((p) => {
          const zoneColor = p.zone === "A" ? "#7FE7F2" : "#C6A0FF"
          return (
            <g key={p.label}>
              <circle
                cx={p.cx} cy={p.cy} r={NODE_R}
                fill={zoneColor} fillOpacity="0.07"
                stroke={zoneColor} strokeWidth="0.7" strokeOpacity="0.32"
              />
              <text
                x={p.cx} y={p.cy + 3}
                fontSize="8" fill={zoneColor} fillOpacity="0.72"
                fontFamily="monospace" fontWeight="bold" textAnchor="middle"
              >
                {p.label}
              </text>
            </g>
          )
        })}

        {/* Provider node legend */}
        <text x="280" y="200" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.22" fontFamily="monospace">A–F = Generic provider node labels</text>

        {/* Bottom attribution */}
        <line x1="16" y1="208" x2="664" y2="208" stroke="#7FE7F2" strokeWidth="0.5" strokeOpacity="0.08" />
        <text x="16" y="217" fontSize="4.5" fill="#7FE7F2" fillOpacity="0.18" fontFamily="monospace">
          Conceptual provider network model · Illustrative · No real provider names or patient data
        </text>
      </svg>
    </div>
  )
}
