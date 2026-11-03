import React from "react";

export default function Background() {
  return (
    <div className="bg" aria-hidden="true">
      {/* Atmospheric ambient green glow pools */}
      <div className="bg-glow bg-glow-tl" />
      <div className="bg-glow bg-glow-br" />

      {/* Futuristic technical grid & digital pixel clusters */}
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

        {/* Digital pixel clusters & isolated glowing bits */}
        <g className="pixel-clusters">
          {/* --- TOP-LEFT CLUSTER --- */}
          <rect x="2%" y="9%" width="8" height="8" fill="var(--acc)" opacity="0.22" />
          <rect x="2.5%" y="15%" width="7" height="7" fill="var(--acc)" opacity="0.32" />
          <rect x="3.2%" y="11%" width="12" height="12" fill="var(--acc)" opacity="0.12" />
          <rect x="4%" y="8%" width="8" height="8" fill="var(--acc)" opacity="0.28" />
          <rect x="5.5%" y="13%" width="6" height="6" fill="var(--acc)" opacity="0.4" />
          <rect x="6%" y="10%" width="10" height="10" fill="var(--acc)" opacity="0.16" />
          <rect x="7%" y="14%" width="14" height="14" fill="var(--acc)" opacity="0.08" />
          <rect x="8.5%" y="16%" width="8" height="8" fill="var(--acc)" opacity="0.25" />
          <rect x="10%" y="12%" width="7" height="7" fill="var(--acc)" opacity="0.18" />

          {/* --- SCATTERED FIELD PIXELS & ACCENTS --- */}
          {/* Upper field */}
          <rect x="25.5%" y="19%" width="7" height="7" fill="var(--acc)" opacity="0.85" />
          <rect x="25.8%" y="19.3%" width="3" height="3" fill="#ffffff" opacity="0.6" />
          <rect x="34%" y="14%" width="6" height="6" fill="var(--acc)" opacity="0.2" />

          {/* Center-upper field */}
          <rect x="53%" y="23.5%" width="8" height="8" fill="var(--acc)" opacity="0.9" />
          <rect x="53.4%" y="23.9%" width="4" height="4" fill="#ffffff" opacity="0.75" />
          <rect x="56%" y="26%" width="5" height="5" fill="var(--acc)" opacity="0.25" />

          {/* Right field */}
          <rect x="77.5%" y="34%" width="7" height="7" fill="var(--acc)" opacity="0.75" />
          <rect x="77.8%" y="34.3%" width="3" height="3" fill="#ffffff" opacity="0.5" />
          <rect x="94%" y="22%" width="6" height="6" fill="var(--acc)" opacity="0.3" />
          <rect x="96.5%" y="30.5%" width="7" height="7" fill="var(--acc)" opacity="0.55" />

          {/* Mid-lower scattered field */}
          <rect x="35.5%" y="92%" width="7" height="7" fill="var(--acc)" opacity="0.35" />
          <rect x="42%" y="76%" width="6" height="6" fill="var(--acc)" opacity="0.45" />
          <rect x="43%" y="78%" width="8" height="8" fill="var(--acc)" opacity="0.18" />
          <rect x="53.5%" y="83.5%" width="8" height="8" fill="var(--acc)" opacity="0.8" />
          <rect x="53.9%" y="83.9%" width="4" height="4" fill="#ffffff" opacity="0.6" />
          <rect x="68%" y="72%" width="6" height="6" fill="var(--acc)" opacity="0.25" />

          {/* --- BOTTOM-RIGHT CORNER CLUSTER --- */}
          <rect x="85%" y="88%" width="8" height="8" fill="var(--acc)" opacity="0.2" />
          <rect x="86.5%" y="82%" width="12" height="12" fill="var(--acc)" opacity="0.25" />
          <rect x="88%" y="80%" width="8" height="8" fill="var(--acc)" opacity="0.35" />
          <rect x="88%" y="86%" width="9" height="9" fill="var(--acc)" opacity="0.85" />
          <rect x="88.3%" y="86.3%" width="4" height="4" fill="#ffffff" opacity="0.6" />
          <rect x="90%" y="84%" width="14" height="14" fill="var(--acc)" opacity="0.3" />
          <rect x="92%" y="82%" width="8" height="8" fill="var(--acc)" opacity="0.45" />
          <rect x="93%" y="87%" width="10" height="10" fill="var(--acc)" opacity="0.6" />
          <rect x="95%" y="85%" width="8" height="8" fill="var(--acc)" opacity="0.35" />
          <rect x="96%" y="89%" width="12" height="12" fill="var(--acc)" opacity="0.5" />
          <rect x="94%" y="91%" width="7" height="7" fill="var(--acc)" opacity="0.7" />
          <rect x="97%" y="93%" width="10" height="10" fill="var(--acc)" opacity="0.4" />
          <rect x="91%" y="90%" width="6" height="6" fill="var(--acc)" opacity="0.8" />
          <rect x="89.5%" y="92%" width="8" height="8" fill="var(--acc)" opacity="0.28" />
        </g>
      </svg>
    </div>
  );
}
