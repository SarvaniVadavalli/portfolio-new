"use client";

import React, { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";

function getCategoryIcon(title: string) {
  switch (title) {
    case "Programming Languages":
      return (
        <svg
          width="15"
          height="15"
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
      );
    case "Frontend Development":
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
          <line x1="2" y1="8" x2="22" y2="8" />
          <line x1="6" y1="5.5" x2="6.01" y2="5.5" />
          <line x1="9" y1="5.5" x2="9.01" y2="5.5" />
          <line x1="12" y1="5.5" x2="12.01" y2="5.5" />
        </svg>
      );
    case "Backend Development":
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    case "Databases":
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "AI / Machine Learning":
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.5-6.5l-2.1 2.1m-8.8 8.8l-2.1 2.1m0-13l2.1 2.1m8.8 8.8l2.1 2.1" />
        </svg>
      );
    case "Tools":
    default:
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );
  }
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const data = portfolioData.skillsData;

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

  return (
    <section id="skills" ref={sectionRef} aria-label="Technical Skills">
      {/* Terminal-inspired path label */}
      <div className="terminal-label rv">{data.terminalPath}</div>

      {/* Monospace heading with subtle blinking green cursor */}
      <h2 className="skills-heading rv">
        {data.heading}{" "}
        <span className="hero-cursor" aria-hidden="true">
          _
        </span>
      </h2>

      {/* Short introduction paragraph */}
      <p className="skills-intro rv">{data.intro}</p>

      {/* Structured grid of 6 compact skill panels */}
      <div className="skills-grid">
        {data.categories.map((cat, idx) => (
          <div
            className="skill-card rv"
            key={cat.title}
            style={{ "--d": `${(idx + 3) * 70}ms` } as React.CSSProperties}
          >
            <div className="skill-card-header">
              <div className="skill-card-title-group">
                <span className="skill-icon">{getCategoryIcon(cat.title)}</span>
                <h3 className="skill-category-title">{cat.title}</h3>
              </div>
              <span
                className="skill-count-badge"
                aria-label={`${cat.items.length} technologies in this category`}
              >
                0{idx + 1}
              </span>
            </div>

            <ul
              className="skill-items-list"
              aria-label={`${cat.title} skill items`}
            >
              {cat.items.map((item) => (
                <li key={item} className="skill-chip">
                  <span className="skill-chip-dot" aria-hidden="true">
                    ■
                  </span>
                  <span className="skill-chip-name">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

