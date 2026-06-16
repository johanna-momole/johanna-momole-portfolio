export function BiologicalDataVisual() {
  return (
    <svg
      viewBox="0 0 520 520"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full"
      style={{ maxWidth: "520px", maxHeight: "520px" }}
    >
      <defs>
        {/* Background gradient */}
        <radialGradient id="bg-grad" cx="45%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#152430" />
          <stop offset="100%" stopColor="#090B0C" />
        </radialGradient>

        {/* Organic blob gradient */}
        <radialGradient id="blob-grad" cx="50%" cy="45%" r="58%">
          <stop offset="0%" stopColor="#C9F2EE" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#D9D1FF" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#C9F2EE" stopOpacity="0" />
        </radialGradient>

        {/* Inner glow gradient for ring center */}
        <radialGradient id="ring-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9F2EE" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#C9F2EE" stopOpacity="0" />
        </radialGradient>

        {/* Chartreuse glow filter */}
        <filter id="dot-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Subtle glow for aqua dots */}
        <filter id="aqua-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip for visual boundary */}
        <clipPath id="visual-clip">
          <rect width="520" height="520" rx="24" />
        </clipPath>
      </defs>

      <g clipPath="url(#visual-clip)">
        {/* Background */}
        <rect width="520" height="520" fill="url(#bg-grad)" />

        {/* Fine grid */}
        <g stroke="#C9F2EE" strokeWidth="0.5" opacity="0.07">
          {/* Horizontal lines */}
          {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="520" y2={y} />
          ))}
          {/* Vertical lines */}
          {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="520" />
          ))}
        </g>

        {/* Main organic blob */}
        <path
          className="bio-blob"
          d="M 310 72 C 405 78, 452 152, 444 240 C 436 326, 382 398, 285 412 C 190 426, 108 372, 88 278 C 68 184, 128 96, 220 78 C 252 72, 282 70, 310 72 Z"
          fill="url(#blob-grad)"
        />

        {/* Ring system: centered at (268, 240) */}
        {/* Inner glow disc */}
        <circle cx="268" cy="240" r="52" fill="url(#ring-glow)" />

        {/* Ring 1 */}
        <circle
          cx="268"
          cy="240"
          r="55"
          fill="none"
          stroke="#C9F2EE"
          strokeWidth="0.8"
          opacity="0.45"
        />
        {/* Ring 2 */}
        <circle
          cx="268"
          cy="240"
          r="92"
          fill="none"
          stroke="#C9F2EE"
          strokeWidth="0.6"
          opacity="0.28"
          strokeDasharray="4 6"
        />
        {/* Ring 3 */}
        <circle
          cx="268"
          cy="240"
          r="134"
          fill="none"
          stroke="#D9D1FF"
          strokeWidth="0.5"
          opacity="0.18"
          className="bio-ring-outer"
        />
        {/* Ring 4 outer subtle */}
        <circle
          cx="268"
          cy="240"
          r="175"
          fill="none"
          stroke="#C9F2EE"
          strokeWidth="0.4"
          opacity="0.10"
          strokeDasharray="2 8"
        />

        {/* Network connection lines */}
        <g stroke="#C9F2EE" strokeWidth="0.7" opacity="0.25" fill="none">
          <line x1="168" y1="172" x2="268" y2="240" strokeDasharray="3 5" />
          <line x1="380" y1="168" x2="268" y2="240" strokeDasharray="3 5" />
          <line x1="412" y1="310" x2="268" y2="240" strokeDasharray="3 5" />
          <line x1="148" y1="330" x2="268" y2="240" strokeDasharray="3 5" />
          <line x1="168" y1="172" x2="380" y2="168" />
          <line x1="148" y1="330" x2="412" y2="310" />
        </g>

        {/* Waveform line */}
        <path
          className="bio-wave"
          d="M 50 310 C 90 298, 110 325, 148 312 C 186 299, 205 326, 240 312 C 275 298, 295 324, 330 310 C 365 296, 385 320, 420 308 C 450 298, 468 315, 490 308"
          fill="none"
          stroke="#C7FF35"
          strokeWidth="1.4"
          opacity="0.55"
          strokeLinecap="round"
        />

        {/* Evidence pathway arc */}
        <path
          d="M 100 200 Q 200 140 300 180 Q 380 210 390 280"
          fill="none"
          stroke="#D9D1FF"
          strokeWidth="0.8"
          opacity="0.30"
          strokeLinecap="round"
        />

        {/* Mini bar chart (bottom-right corner) */}
        <g opacity="0.50">
          {/* Bar chart background panel */}
          <rect x="380" y="408" width="100" height="72" rx="6" fill="#ffffff" fillOpacity="0.04" stroke="#C9F2EE" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Bars */}
          <rect x="390" y="442" width="10" height="30" rx="2" fill="#C9F2EE" fillOpacity="0.35" />
          <rect x="404" y="432" width="10" height="40" rx="2" fill="#C9F2EE" fillOpacity="0.35" />
          <rect x="418" y="448" width="10" height="24" rx="2" fill="#C9F2EE" fillOpacity="0.35" />
          <rect x="432" y="424" width="10" height="48" rx="2" fill="#C7FF35" fillOpacity="0.75" />
          <rect x="446" y="438" width="10" height="34" rx="2" fill="#C9F2EE" fillOpacity="0.35" />
          {/* X-axis line */}
          <line x1="388" y1="474" x2="458" y2="474" stroke="#C9F2EE" strokeWidth="0.5" opacity="0.4" />
          {/* Chart label */}
          <text x="390" y="421" fontSize="5" fill="#C9F2EE" fillOpacity="0.5" fontFamily="monospace">SIGNAL INDEX</text>
        </g>

        {/* Data nodes — aqua */}
        <circle cx="380" cy="168" r="5" fill="#C9F2EE" opacity="0.6" filter="url(#aqua-glow)" />
        <circle cx="412" cy="310" r="4" fill="#C9F2EE" opacity="0.55" filter="url(#aqua-glow)" />
        <circle cx="148" cy="330" r="4" fill="#C9F2EE" opacity="0.55" filter="url(#aqua-glow)" />

        {/* Data nodes — chartreuse (active) */}
        <circle
          className="bio-dot-a"
          cx="168"
          cy="172"
          r="5"
          fill="#C7FF35"
          opacity="0.85"
          filter="url(#dot-glow)"
        />
        <circle
          className="bio-dot-b"
          cx="268"
          cy="240"
          r="4"
          fill="#C7FF35"
          opacity="0.85"
          filter="url(#dot-glow)"
        />
        <circle
          className="bio-dot-c"
          cx="330"
          cy="310"
          r="5"
          fill="#C7FF35"
          opacity="0.80"
          filter="url(#dot-glow)"
        />

        {/* Node labels (decorative, screen-reader hidden by aria-hidden on parent) */}
        <text x="175" y="164" fontSize="6" fill="#C9F2EE" fillOpacity="0.40" fontFamily="monospace">FAERS</text>
        <text x="338" y="164" fontSize="6" fill="#C9F2EE" fillOpacity="0.35" fontFamily="monospace">RWE</text>
        <text x="418" y="306" fontSize="6" fill="#C9F2EE" fillOpacity="0.35" fontFamily="monospace">SNP</text>
        <text x="90" y="340" fontSize="6" fill="#C9F2EE" fillOpacity="0.35" fontFamily="monospace">EMR</text>
        <text x="248" y="256" fontSize="5.5" fill="#C7FF35" fillOpacity="0.55" fontFamily="monospace">p=0.003</text>

        {/* Top-left coordinate label */}
        <text x="16" y="30" fontSize="7" fill="#C9F2EE" fillOpacity="0.22" fontFamily="monospace">39.9°N 75.2°W</text>
        <text x="16" y="42" fontSize="7" fill="#C9F2EE" fillOpacity="0.18" fontFamily="monospace">UPENN · BIO INF</text>
      </g>
    </svg>
  )
}
