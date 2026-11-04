"use client";

import React, { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";

interface GitHubStats {
  username: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalContributions: number;
  currentYearContributions: number;
  languages: { name: string; count: number; percent: number }[];
  contributions: { date: string; count: number; level: number }[];
}

interface LeetCodeStats {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  acceptanceRate: number;
  totalSubmissions: number;
  submissions: { date: string; count: number; level: number }[];
  totalSubmissionDays: number;
}

const LEVEL_COLORS_DARK = [
  "#0d2017", // 0
  "#1a5033", // 1
  "#2d8a54", // 2
  "#3ec879", // 3
  "#56f29b", // 4
];

const LEVEL_COLORS_LIGHT = [
  "#eaf3ee", // 0
  "#a2ddbb", // 1
  "#5ec791", // 2
  "#28aa68", // 3
  "#0b8f63", // 4
];

export default function Activity() {
  const sectionRef = useRef<HTMLElement>(null);
  const data = portfolioData.activityData;
  const baseline = portfolioData.statsSnapshot;

  const [ghStats, setGhStats] = useState<GitHubStats | null>(null);
  const [lcStats, setLcStats] = useState<LeetCodeStats | null>(null);
  const [ghLoading, setGhLoading] = useState(true);
  const [lcLoading, setLcLoading] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);

  // Detect theme for SVG fills
  useEffect(() => {
    const updateTheme = () => {
      setIsLightMode(document.documentElement.getAttribute("data-theme") === "light");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // Fetch live stats
  useEffect(() => {
    let isMounted = true;

    async function fetchGitHub() {
      try {
        const res = await fetch("/api/stats/github");
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          setGhStats(json.data);
        } else if (isMounted) {
          // Graceful fallback from snapshot
          setGhStats({
            username: data.github.username,
            publicRepos: baseline.github.repos,
            followers: 1,
            following: 2,
            totalContributions: baseline.github.contributionsLastYear,
            currentYearContributions: 87,
            languages: [
              { name: "Python", count: 2, percent: 33 },
              { name: "TypeScript", count: 1, percent: 17 },
              { name: "JavaScript", count: 1, percent: 17 },
              { name: "CSS", count: 1, percent: 17 },
              { name: "HTML", count: 1, percent: 17 },
            ],
            contributions: [],
          });
        }
      } catch {
        if (isMounted) {
          setGhStats({
            username: data.github.username,
            publicRepos: baseline.github.repos,
            followers: 1,
            following: 2,
            totalContributions: baseline.github.contributionsLastYear,
            currentYearContributions: 87,
            languages: [
              { name: "Python", count: 2, percent: 33 },
              { name: "TypeScript", count: 1, percent: 17 },
              { name: "JavaScript", count: 1, percent: 17 },
              { name: "CSS", count: 1, percent: 17 },
              { name: "HTML", count: 1, percent: 17 },
            ],
            contributions: [],
          });
        }
      } finally {
        if (isMounted) setGhLoading(false);
      }
    }

    async function fetchLeetCode() {
      try {
        const res = await fetch("/api/stats/leetcode");
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          setLcStats(json.data);
        } else if (isMounted) {
          // Graceful fallback from snapshot
          setLcStats({
            username: data.leetcode.username,
            totalSolved: baseline.leetcode.solved,
            totalQuestions: 4101,
            easySolved: baseline.leetcode.easy,
            totalEasy: 975,
            mediumSolved: baseline.leetcode.medium,
            totalMedium: 2139,
            hardSolved: baseline.leetcode.hard,
            totalHard: 987,
            ranking: 833584,
            acceptanceRate: 57.7,
            totalSubmissions: baseline.leetcode.submissionsLastYear,
            submissions: [],
            totalSubmissionDays: 79,
          });
        }
      } catch {
        if (isMounted) {
          setLcStats({
            username: data.leetcode.username,
            totalSolved: baseline.leetcode.solved,
            totalQuestions: 4101,
            easySolved: baseline.leetcode.easy,
            totalEasy: 975,
            mediumSolved: baseline.leetcode.medium,
            totalMedium: 2139,
            hardSolved: baseline.leetcode.hard,
            totalHard: 987,
            ranking: 833584,
            acceptanceRate: 57.7,
            totalSubmissions: baseline.leetcode.submissionsLastYear,
            submissions: [],
            totalSubmissionDays: 79,
          });
        }
      } finally {
        if (isMounted) setLcLoading(false);
      }
    }

    fetchGitHub();
    fetchLeetCode();

    return () => {
      isMounted = false;
    };
  }, [baseline, data]);

  // Reveal animation observer
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;

    const revealElements = section.querySelectorAll<HTMLElement>(".rv");

    if (isReduced) {
      revealElements.forEach((el) => {
        el.classList.add("in", "done");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("in");
            setTimeout(() => {
              target.classList.add("done");
            }, 1400);
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((el, idx) => {
      el.style.setProperty("--d", `${(idx % 6) * 90}ms`);
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Format 52 weeks (364 days) for GitHub heatmap
  const ghContributions = ghStats?.contributions || [];
  const ghWeeks: { date: string; count: number; level: number }[][] = [];
  for (let i = 0; i < ghContributions.length; i += 7) {
    ghWeeks.push(ghContributions.slice(i, i + 7));
  }

  // Format 52 weeks (364 days) for LeetCode submission heatmap
  const lcSubmissions = lcStats?.submissions || [];
  const lcWeeks: { date: string; count: number; level: number }[][] = [];
  for (let i = 0; i < lcSubmissions.length; i += 7) {
    lcWeeks.push(lcSubmissions.slice(i, i + 7));
  }

  const levelPalette = isLightMode ? LEVEL_COLORS_LIGHT : LEVEL_COLORS_DARK;

  // Month labels helper
  const getMonthLabel = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short" });
  };

  // Month markers for GitHub (52 weeks)
  const ghMonthMarkers: { index: number; label: string }[] = [];
  let ghLastMonth = "";
  ghWeeks.forEach((week, wIdx) => {
    if (week[0]) {
      const m = getMonthLabel(week[0].date);
      if (m !== ghLastMonth && wIdx <= 50) {
        ghMonthMarkers.push({ index: wIdx, label: m });
        ghLastMonth = m;
      }
    }
  });

  // Month markers for LeetCode (52 weeks)
  const lcMonthMarkers: { index: number; label: string }[] = [];
  let lcLastMonth = "";
  lcWeeks.forEach((week, wIdx) => {
    if (week[0]) {
      const m = getMonthLabel(week[0].date);
      if (m !== lcLastMonth && wIdx <= 50) {
        lcMonthMarkers.push({ index: wIdx, label: m });
        lcLastMonth = m;
      }
    }
  });

  // LeetCode problem difficulty counts
  const totalSolved = lcStats?.totalSolved ?? 209;
  const easySolved = lcStats?.easySolved ?? 90;
  const mediumSolved = lcStats?.mediumSolved ?? 110;
  const hardSolved = lcStats?.hardSolved ?? 9;

  const easyPercent = totalSolved > 0 ? Math.round((easySolved / totalSolved) * 100) : 43;
  const mediumPercent = totalSolved > 0 ? Math.round((mediumSolved / totalSolved) * 100) : 53;
  const hardPercent = totalSolved > 0 ? Math.max(1, 100 - easyPercent - mediumPercent) : 4;

  return (
    <section id="stats" ref={sectionRef} aria-label="Developer Activity">
      {/* Terminal path label */}
      <div className="terminal-label rv">{data.terminalPath}</div>

      {/* Monospace heading with signature green blinking cursor */}
      <h2 className="activity-heading rv">
        {data.heading}{" "}
        <span className="hero-cursor" aria-hidden="true">
          _
        </span>
      </h2>

      {/* Section Subtitle */}
      <p className="activity-subtitle rv">{data.subtitle}</p>

      {/* Continuous Unified Activity Stream (Full Width, No Boxed Cards) */}
      <div className="activity-stream">
        {/* =========================================================
            SECTION 01: GITHUB ACTIVITY (First, Full Width)
           ========================================================= */}
        <section
          className="activity-block rv"
          style={{ "--d": "90ms" } as React.CSSProperties}
          aria-labelledby="activity-gh-title"
        >
          {/* Top Block Header: Identifier, Title, Path, Status, Action Link */}
          <div className="activity-block-header">
            <div className="activity-block-title-group">
              <span className="activity-block-tag">01.</span>
              <h3 id="activity-gh-title" className="activity-block-title">
                {data.github.label}
              </h3>
              <span className="activity-block-path">{data.github.terminalPath}</span>
              <div className="activity-live-badge">
                <span className="activity-live-dot" aria-hidden="true" />
                <span>LIVE TELEMETRY</span>
              </div>
            </div>

            <a
              href={data.github.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="activity-profile-link"
              aria-label="View Sarvani Vadavalli's GitHub profile in a new tab"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <span>VIEW GITHUB PROFILE ↗</span>
            </a>
          </div>

          {/* Profile Handle & Compact Secondary Metrics Strip */}
          <div className="activity-stats-strip">
            <div className="activity-user-badge">
              <span className="user-at">@</span>
              <span className="user-name">{data.github.username}</span>
              <span className="user-role-sep">·</span>
              <span className="user-role">Open-Source & Coursework Repositories</span>
            </div>

            <div className="activity-metrics-inline">
              <div className="metric-inline-item">
                <span className="m-label">CONTRIBS</span>
                <span className="m-val highlight">
                  {ghLoading ? "--" : `${ghStats?.totalContributions ?? 90}`}
                </span>
              </div>
              <div className="metric-inline-item">
                <span className="m-label">THIS YEAR</span>
                <span className="m-val">
                  {ghLoading ? "--" : `${ghStats?.currentYearContributions ?? 87}`}
                </span>
              </div>
              <div className="metric-inline-item">
                <span className="m-label">REPOS</span>
                <span className="m-val">{ghLoading ? "--" : ghStats?.publicRepos ?? 13}</span>
              </div>
              <div className="metric-inline-item">
                <span className="m-label">FOLLOWERS</span>
                <span className="m-val">{ghLoading ? "--" : ghStats?.followers ?? 1}</span>
              </div>
              <div className="metric-inline-item">
                <span className="m-label">FOLLOWING</span>
                <span className="m-val">{ghLoading ? "--" : ghStats?.following ?? 2}</span>
              </div>
            </div>
          </div>

          {/* Prominent Contribution Heatmap Canvas (Full Available Width, Compact Height) */}
          <div
            className="activity-heatmap-canvas"
            aria-label="GitHub contribution heatmap over the past 52 weeks"
          >
            <div className="heatmap-canvas-header">
              <span className="canvas-prompt">$ git log --contributions --year=2026</span>
              <span className="canvas-status">
                52-week telemetry · {ghStats?.totalContributions ?? 90} contributions
              </span>
            </div>

            {ghLoading ? (
              <div className="activity-loading-state">
                <span className="loading-spinner-char">&gt;</span> Synchronizing live
                contributions stream...
              </div>
            ) : ghWeeks.length === 0 ? (
              <div className="activity-empty-state">
                &gt; Live heatmap currently syncing. View profile for direct graph.
              </div>
            ) : (
              <div className="heatmap-svg-wrapper">
                <svg
                  viewBox="0 0 620 90"
                  className="heatmap-svg-full"
                  role="img"
                  aria-label={`GitHub contribution heatmap with ${ghStats?.totalContributions ?? 90} contributions`}
                >
                  {/* Month labels along the top */}
                  {ghMonthMarkers.map((marker) => (
                    <text
                      key={marker.index}
                      x={18 + marker.index * 11.5}
                      y="9"
                      className="heatmap-month-text"
                    >
                      {marker.label}
                    </text>
                  ))}

                  {/* Day of week labels */}
                  <text x="2" y="25" className="heatmap-day-text">
                    M
                  </text>
                  <text x="2" y="46" className="heatmap-day-text">
                    W
                  </text>
                  <text x="2" y="68" className="heatmap-day-text">
                    F
                  </text>

                  {/* 52 Columns of Heatmap cells */}
                  <g transform="translate(18, 14)">
                    {ghWeeks.map((week, colIdx) => (
                      <g key={colIdx} transform={`translate(${colIdx * 11.5}, 0)`}>
                        {week.map((day, rowIdx) => (
                          <rect
                            key={day.date}
                            x={0}
                            y={rowIdx * 10.6}
                            width={8.5}
                            height={8.5}
                            rx={1.5}
                            ry={1.5}
                            fill={levelPalette[day.level] || levelPalette[0]}
                            className="heatmap-cell"
                          >
                            <title>{`${day.count} contribution${
                              day.count === 1 ? "" : "s"
                            } on ${day.date}`}</title>
                          </rect>
                        ))}
                      </g>
                    ))}
                  </g>
                </svg>
              </div>
            )}

            <div className="heatmap-canvas-footer" aria-hidden="true">
              <span className="heatmap-footnote">verified public telemetry</span>
              <div className="heatmap-legend-row">
                <span className="legend-text">LESS</span>
                <div className="legend-cells">
                  {levelPalette.map((col, idx) => (
                    <span
                      key={idx}
                      className="legend-square"
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>
                <span className="legend-text">MORE</span>
              </div>
            </div>
          </div>
        </section>

        {/* Subtle Technical Horizontal Divider Between GitHub & LeetCode */}
        <div className="activity-stream-divider" aria-hidden="true">
          <span className="divider-line" />
          <span className="divider-marker">&lt;/&gt;</span>
          <span className="divider-line" />
        </div>

        {/* =========================================================
            SECTION 02: LEETCODE ACTIVITY (Directly Below, Full Width)
           ========================================================= */}
        <section
          className="activity-block activity-leetcode-block rv"
          style={{ "--d": "180ms" } as React.CSSProperties}
          aria-labelledby="activity-lc-title"
        >
          {/* Top Block Header: Identifier, Title, Path, Status, Action Link */}
          <div className="activity-block-header">
            <div className="activity-block-title-group">
              <span className="activity-block-tag">02.</span>
              <h3 id="activity-lc-title" className="activity-block-title">
                {data.leetcode.label}
              </h3>
              <span className="activity-block-path">{data.leetcode.terminalPath}</span>
              <div className="activity-live-badge">
                <span className="activity-live-dot" aria-hidden="true" />
                <span>LIVE TELEMETRY</span>
              </div>
            </div>

            <a
              href={data.leetcode.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="activity-profile-link"
              aria-label="View Sarvani Vadavalli's LeetCode profile in a new tab"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span>VIEW LEETCODE PROFILE ↗</span>
            </a>
          </div>

          {/* Profile Handle & Compact Secondary Metrics Strip */}
          <div className="activity-stats-strip">
            <div className="activity-user-badge">
              <span className="user-at">@</span>
              <span className="user-name">{data.leetcode.username}</span>
              <span className="user-role-sep">·</span>
              <span className="user-role">Algorithmic Problem Solving & Submissions</span>
            </div>

            <div className="activity-metrics-inline">
              <div className="metric-inline-item">
                <span className="m-label">SOLVED</span>
                <span className="m-val highlight">{lcLoading ? "--" : totalSolved}</span>
              </div>
              <div className="metric-inline-item">
                <span className="m-label">EASY</span>
                <span className="m-val">{lcLoading ? "--" : easySolved}</span>
              </div>
              <div className="metric-inline-item">
                <span className="m-label">MEDIUM</span>
                <span className="m-val">{lcLoading ? "--" : mediumSolved}</span>
              </div>
              <div className="metric-inline-item">
                <span className="m-label">HARD</span>
                <span className="m-val">{lcLoading ? "--" : hardSolved}</span>
              </div>
              <div className="metric-inline-item">
                <span className="m-label">ACCEPTANCE</span>
                <span className="m-val highlight-blue">
                  {lcLoading ? "--" : `${lcStats?.acceptanceRate ?? 57.7}%`}
                </span>
              </div>
              <div className="metric-inline-item">
                <span className="m-label">RANK</span>
                <span className="m-val">
                  {lcLoading ? "--" : `#${(lcStats?.ranking ?? 833584).toLocaleString()}`}
                </span>
              </div>
            </div>
          </div>

          {/* Prominent LeetCode Submission Activity Heatmap Canvas (Full Available Width, Compact Height) */}
          <div
            className="activity-heatmap-canvas"
            aria-label="LeetCode submission activity heatmap over the past 52 weeks"
          >
            <div className="heatmap-canvas-header">
              <span className="canvas-prompt">$ leetcode log --submissions --year=2026</span>
              <span className="canvas-status">
                52-week telemetry · {lcStats?.totalSubmissionDays ?? 79} active days
              </span>
            </div>

            {lcLoading ? (
              <div className="activity-loading-state">
                <span className="loading-spinner-char">&gt;</span> Synchronizing live
                submissions stream...
              </div>
            ) : lcWeeks.length === 0 ? (
              <div className="activity-empty-state">
                &gt; Live submissions stream syncing. View profile for direct graph.
              </div>
            ) : (
              <div className="heatmap-svg-wrapper">
                <svg
                  viewBox="0 0 620 90"
                  className="heatmap-svg-full"
                  role="img"
                  aria-label={`LeetCode submission activity heatmap with ${lcStats?.totalSubmissionDays ?? 79} active days`}
                >
                  {/* Month labels along the top */}
                  {lcMonthMarkers.map((marker) => (
                    <text
                      key={marker.index}
                      x={18 + marker.index * 11.5}
                      y="9"
                      className="heatmap-month-text"
                    >
                      {marker.label}
                    </text>
                  ))}

                  {/* Day of week labels */}
                  <text x="2" y="25" className="heatmap-day-text">
                    M
                  </text>
                  <text x="2" y="46" className="heatmap-day-text">
                    W
                  </text>
                  <text x="2" y="68" className="heatmap-day-text">
                    F
                  </text>

                  {/* 52 Columns of Submission cells */}
                  <g transform="translate(18, 14)">
                    {lcWeeks.map((week, colIdx) => (
                      <g key={colIdx} transform={`translate(${colIdx * 11.5}, 0)`}>
                        {week.map((day, rowIdx) => (
                          <rect
                            key={day.date}
                            x={0}
                            y={rowIdx * 10.6}
                            width={8.5}
                            height={8.5}
                            rx={1.5}
                            ry={1.5}
                            fill={levelPalette[day.level] || levelPalette[0]}
                            className="heatmap-cell"
                          >
                            <title>{`${day.count} submission${
                              day.count === 1 ? "" : "s"
                            } on ${day.date}`}</title>
                          </rect>
                        ))}
                      </g>
                    ))}
                  </g>
                </svg>
              </div>
            )}

            <div className="heatmap-canvas-footer" aria-hidden="true">
              <span className="heatmap-footnote">verified public telemetry</span>
              <div className="heatmap-legend-row">
                <span className="legend-text">LESS</span>
                <div className="legend-cells">
                  {levelPalette.map((col, idx) => (
                    <span
                      key={idx}
                      className="legend-square"
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>
                <span className="legend-text">MORE</span>
              </div>
            </div>
          </div>

          {/* Problem Difficulty Breakdown Section */}
          <div className="activity-meta-footer">
            <div className="languages-header">
              <span className="languages-title">&gt; Problem Difficulty Distribution</span>
              <span className="languages-status">
                {totalSolved} solved / {lcStats?.totalQuestions ?? 4101} questions
              </span>
            </div>

            <div
              className="languages-progress-bar"
              aria-label="Problem difficulty distribution bar"
            >
              <div
                className="lang-bar-segment"
                style={{
                  width: `${easyPercent}%`,
                  backgroundColor: "#48d597",
                }}
                title={`Easy: ${easySolved} (${easyPercent}%)`}
              />
              <div
                className="lang-bar-segment"
                style={{
                  width: `${mediumPercent}%`,
                  backgroundColor: "#ffbd2e",
                }}
                title={`Medium: ${mediumSolved} (${mediumPercent}%)`}
              />
              <div
                className="lang-bar-segment"
                style={{
                  width: `${hardPercent}%`,
                  backgroundColor: "#ff5f56",
                }}
                title={`Hard: ${hardSolved} (${hardPercent}%)`}
              />
            </div>

            <div className="languages-chip-grid">
              <span className="lang-chip">
                <span
                  className="lang-chip-dot"
                  style={{ backgroundColor: "#48d597" }}
                  aria-hidden="true"
                />
                <span className="lang-chip-name">Easy {easySolved}</span>
                <span className="lang-chip-percent">{easyPercent}%</span>
              </span>
              <span className="lang-chip">
                <span
                  className="lang-chip-dot"
                  style={{ backgroundColor: "#ffbd2e" }}
                  aria-hidden="true"
                />
                <span className="lang-chip-name">Medium {mediumSolved}</span>
                <span className="lang-chip-percent">{mediumPercent}%</span>
              </span>
              <span className="lang-chip">
                <span
                  className="lang-chip-dot"
                  style={{ backgroundColor: "#ff5f56" }}
                  aria-hidden="true"
                />
                <span className="lang-chip-name">Hard {hardSolved}</span>
                <span className="lang-chip-percent">{hardPercent}%</span>
              </span>
              <span className="lang-chip">
                <span
                  className="lang-chip-dot"
                  style={{ backgroundColor: "#61afef" }}
                  aria-hidden="true"
                />
                <span className="lang-chip-name">Primary Lang C++</span>
              </span>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
