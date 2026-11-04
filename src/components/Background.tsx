import React from "react";

export default function Background() {
  return (
    <div className="bg" aria-hidden="true">
      {/* Subtle atmospheric green glow pools */}
      <div className="bg-glow bg-glow-tl" />
      <div className="bg-glow bg-glow-br" />

      {/* Refined technical grid & minimal peripheral digital pixels */}
      <svg
        className="bg-tech"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle 36px orthogonal technical grid */}
          <pattern
            id="tech-grid"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 36 0 L 0 0 0 36"
              fill="none"
              stroke="var(--grid-line)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Global Grid Overlay */}
        <rect width="100%" height="100%" fill="url(#tech-grid)" />

        {/* Refined digital pixel clusters - calm, peripheral, non-intrusive */}
        <g className="pixel-clusters">
          {/* --- TOP-LEFT CORNER CLUSTER (calm peripheral framing) --- */}
          <rect x="2.5%" y="8%" width="7" height="7" fill="var(--acc)" opacity="0.14" />
          <rect x="3.2%" y="13%" width="6" height="6" fill="var(--acc)" opacity="0.20" className="px-pulse-1" />
          <rect x="4.5%" y="9%" width="10" height="10" fill="var(--acc)" opacity="0.08" />
          <rect x="6%" y="12%" width="7" height="7" fill="var(--acc)" opacity="0.22" className="px-pulse-2" />
          <rect x="7.8%" y="15%" width="8" height="8" fill="var(--acc)" opacity="0.12" />
          <rect x="9.5%" y="10%" width="6" height="6" fill="var(--acc)" opacity="0.16" />

          {/* --- SUBTLE FAR-EDGE ANCHORS (clear of central reading path) --- */}
          <rect x="14%" y="38%" width="6" height="6" fill="var(--acc)" opacity="0.12" />
          <rect x="88%" y="26%" width="7" height="7" fill="var(--acc)" opacity="0.18" className="px-pulse-2" />
          <rect x="94%" y="32%" width="6" height="6" fill="var(--acc)" opacity="0.14" />

          {/* --- BOTTOM-RIGHT CORNER CLUSTER (anchored away from text) --- */}
          <rect x="87%" y="82%" width="8" height="8" fill="var(--acc)" opacity="0.12" />
          <rect x="89%" y="86%" width="7" height="7" fill="var(--acc)" opacity="0.22" className="px-pulse-1" />
          <rect x="91%" y="81%" width="10" height="10" fill="var(--acc)" opacity="0.15" />
          <rect x="93%" y="87%" width="8" height="8" fill="var(--acc)" opacity="0.24" className="px-pulse-2" />
          <rect x="95%" y="84%" width="6" height="6" fill="var(--acc)" opacity="0.18" />
          <rect x="96%" y="90%" width="8" height="8" fill="var(--acc)" opacity="0.14" />
        </g>
      </svg>
    </div>
  );
}
