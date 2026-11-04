"use client";

import React, { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [imgError, setImgError] = useState(false);

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
      { threshold: 0.15 }
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
    <section id="about" ref={sectionRef} aria-label="About Sarvani">
      {/* Terminal-inspired path label */}
      <div className="terminal-label rv">
        {portfolioData.about.terminalPath}
      </div>

      {/* Monospace heading with green blinking cursor */}
      <h2 className="about-heading rv">
        {portfolioData.about.heading}{" "}
        <span className="hero-cursor" aria-hidden="true">
          _
        </span>
      </h2>

      {/* Two-column layout with vertical divider */}
      <div className="about-layout rv">
        {/* Left column: Profile photograph with corner-bracket detail */}
        <div className="about-photo-col">
          <div className="about-photo-wrapper">
            {/* Subtle green corner-bracket detail (viewfinder accent) */}
            <svg
              className="about-corner-bracket"
              width="24"
              height="24"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 18V6C3 4.34315 4.34315 3 6 3H18"
                stroke="var(--acc)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="3" cy="18" r="1.5" fill="var(--acc)" />
              <circle cx="18" cy="3" r="1.5" fill="var(--acc)" />
            </svg>

            <div className="about-photo-card" id="photo">
              {portfolioData.about.photo.url && !imgError ? (
                <img
                  src={portfolioData.about.photo.url}
                  alt={portfolioData.name}
                  className="about-photo-img"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span aria-label="Profile placeholder">
                  {portfolioData.shortName.charAt(0)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Middle vertical divider */}
        <div className="about-vertical-divider" aria-hidden="true" />

        {/* Right column: About text & three profile tags */}
        <div className="about-content-col">
          <div className="about-paragraphs">
            {portfolioData.about.paragraphs.map((p, idx) => (
              <p key={idx} className="about-p">
                {p}
              </p>
            ))}
          </div>

          {/* Exactly three profile information tags */}
          <div className="profile-tags" aria-label="Profile Information Tags">
            {portfolioData.about.profileTags.map((tag) => (
              <span key={tag} className="profile-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
