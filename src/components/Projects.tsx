"use client";

import React, { useEffect, useRef } from "react";
import { portfolioData, ProjectItem } from "@/data/portfolio";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const data = portfolioData.projectsData;

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

  const isValidUrl = (url?: string) => {
    return !!url && url !== "#" && url.startsWith("http");
  };

  return (
    <section id="projects" ref={sectionRef} aria-label="Selected Projects">
      {/* Terminal-inspired path label */}
      <div className="terminal-label rv">{data.terminalPath}</div>

      {/* Monospace heading with signature green blinking cursor */}
      <h2 className="projects-heading rv">
        {data.heading}{" "}
        <span className="hero-cursor" aria-hidden="true">
          _
        </span>
      </h2>

      {/* Section Subtitle */}
      <p className="projects-subtitle rv">{data.subtitle}</p>

      {/* Projects Grid: 3 equal cards in a single horizontal row on desktop */}
      <div className="projects-grid">
        {data.projects.map((proj, idx) => {
          // Check for valid repository URL from projectsData or legacy projects array
          const rawRepo = proj.repo || portfolioData.projects[idx]?.repo;
          const hasValidRepo = isValidUrl(rawRepo);

          return (
            <article
              key={proj.title}
              className="project-card rv"
              style={{ "--d": `${(idx + 1) * 90}ms` } as React.CSSProperties}
              aria-labelledby={`proj-title-${idx}`}
            >
              <div className="project-card-inner">
                {/* Terminal Window Header with red, yellow, green dots and file path */}
                <div className="terminal-card-header">
                  <div className="terminal-card-dots" aria-hidden="true">
                    <span className="term-dot red" />
                    <span className="term-dot yellow" />
                    <span className="term-dot green" />
                  </div>
                  <span className="terminal-card-path">{proj.filePath}</span>
                </div>

                {/* Card Main Content */}
                <div className="project-card-body">
                  <div className="project-meta-row">
                    <span className="project-number">{proj.number}</span>
                    <span className="project-meta-sep" aria-hidden="true">
                      /
                    </span>
                    <span className="project-category-tag">{proj.category}</span>
                  </div>

                  <h3 id={`proj-title-${idx}`} className="project-title">
                    {proj.title}
                  </h3>

                  <p className="project-description">{proj.description}</p>

                  {/* Compact Terminal Output Panel */}
                  {proj.terminalOutput && (
                    <div
                      className="project-terminal-panel"
                      aria-label={`Terminal output preview for ${proj.title}`}
                    >
                      {proj.terminalOutput.map((line, lIdx) => (
                        <div
                          key={lIdx}
                          className={`term-line ${line.isCommand ? "cmd" : "out"}`}
                        >
                          <span className="term-prompt" aria-hidden="true">
                            {line.prompt}
                          </span>
                          {line.isCommand && line.text.startsWith("SELECT") ? (
                            <span className="term-text">
                              <span className="term-kw">SELECT</span> *{" "}
                              <span className="term-kw">FROM</span> patients;
                            </span>
                          ) : (
                            <span className="term-text">{line.text}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <ul
                    className="project-stack-list"
                    aria-label={`Technologies used in ${proj.title}`}
                  >
                    {proj.stack.map((tech) => (
                      <li key={tech} className="project-stack-chip">
                        <span className="project-stack-dot" aria-hidden="true">
                          ■
                        </span>
                        <span className="project-stack-name">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer: Terminal Source Code Action */}
                <div className="project-card-footer">
                  {hasValidRepo ? (
                    <a
                      href={rawRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-link"
                      aria-label={`View ${proj.title} source code on GitHub`}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="github-icon"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span className="action-label">[ VIEW SOURCE CODE ↗ ]</span>
                    </a>
                  ) : (
                    <div
                      className="project-action-link unavailable"
                      role="status"
                      aria-label={`${proj.title} source code unavailable`}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="github-icon"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span className="action-label">[ SOURCE CODE UNAVAILABLE ]</span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
