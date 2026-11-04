"use client";

import React, { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const data = portfolioData.contactData;

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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} aria-label="Contact Section">
      {/* Terminal path label */}
      <div className="terminal-label rv">{data.terminalPath}</div>

      {/* Monospace heading with signature green blinking cursor */}
      <h2 className="contact-heading rv">
        {data.heading}
        <span className="hero-cursor" aria-hidden="true">
          _
        </span>
      </h2>

      {/* Supporting text */}
      <p className="contact-subtitle rv">{data.subtitle}</p>

      {/* Terminal Contact Deck / Console */}
      <div className="contact-console rv" style={{ "--d": "90ms" } as React.CSSProperties}>
        {/* Terminal Header Bar */}
        <div className="terminal-card-header">
          <div className="terminal-card-dots contact-window-dots" aria-hidden="true">
            <span className="term-dot green-muted-1" />
            <span className="term-dot green-muted-2" />
            <span className="term-dot green-muted-3" />
          </div>
          <span className="terminal-card-path">~/contact/dispatch.sh</span>
          <div className="contact-status-badge">
            <span className="activity-live-dot" aria-hidden="true" />
            <span>OPEN FOR OPPORTUNITIES</span>
          </div>
        </div>

        {/* Console Body */}
        <div className="contact-console-body">
          {/* Primary Dispatch Module: Email */}
          <div className="contact-primary-card">
            <div className="contact-module-meta">
              <span className="contact-module-tag">01. PRIMARY_DISPATCH</span>
              <span className="contact-module-protocol">PROTOCOL: SMTP / DIRECT_MAIL</span>
            </div>

            <div className="contact-email-box">
              <div className="contact-email-info">
                <span className="contact-email-label">DIRECT EMAIL ADDRESS</span>
                <a
                  href={`mailto:${data.email}`}
                  className="contact-email-link"
                  aria-label={`Send direct email to ${data.email}`}
                >
                  <svg
                    className="contact-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className="email-text">{data.email}</span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="contact-copy-btn"
                aria-label="Copy email address to clipboard"
                title="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>COPIED!</span>
                  </>
                ) : (
                  <>
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
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>

            {/* Prominent Primary Button */}
            <div className="contact-cta-wrapper">
              <a
                href={`mailto:${data.email}`}
                className="contact-cta-button"
                aria-label="Send me an email via default mail client"
              >
                <span>[ SEND ME AN EMAIL ↗ ]</span>
              </a>
            </div>
          </div>

          {/* Technical Separator */}
          <div className="contact-inner-divider" aria-hidden="true">
            <span className="divider-line" />
            <span className="divider-marker">&lt; CONNECT_CHANNELS &gt;</span>
            <span className="divider-line" />
          </div>

          {/* Secondary External Channels Grid */}
          <div className="contact-channels-grid">
            {/* Channel 01: GitHub */}
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-card"
              aria-label="Visit Sarvani's GitHub profile in a new tab"
            >
              <div className="channel-card-top">
                <span className="channel-number">02.</span>
                <span className="channel-network">VERSION_CONTROL</span>
              </div>
              <div className="channel-body">
                <div className="channel-icon-wrap" aria-hidden="true">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <div className="channel-meta">
                  <div className="channel-title">GitHub</div>
                  <div className="channel-subtext">github.com/SarvaniVadavalli</div>
                </div>
              </div>
              <div className="channel-action">
                <span className="channel-action-btn">[ OPEN REPOSITORIES ↗ ]</span>
              </div>
            </a>

            {/* Channel 02: LinkedIn */}
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-card"
              aria-label="Visit Sarvani's LinkedIn profile in a new tab"
            >
              <div className="channel-card-top">
                <span className="channel-number">03.</span>
                <span className="channel-network">PROFESSIONAL_NETWORK</span>
              </div>
              <div className="channel-body">
                <div className="channel-icon-wrap" aria-hidden="true">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div className="channel-meta">
                  <div className="channel-title">LinkedIn</div>
                  <div className="channel-subtext">in/sarvani-vadavalli-94a501324</div>
                </div>
              </div>
              <div className="channel-action">
                <span className="channel-action-btn">[ CONNECT ON LINKEDIN ↗ ]</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Minimal Finished Footer */}
      <footer className="portfolio-footer rv" style={{ "--d": "180ms" } as React.CSSProperties}>
        <div className="footer-content">
          <div className="footer-credits">DESIGNED &amp; BUILT BY SARVANI</div>
          <div className="footer-copyright">&copy; 2026 &middot; ALL RIGHTS RESERVED</div>
        </div>

        <div className="footer-return-top">
          <a href="#hello" className="footer-top-link" aria-label="Return to top of page">
            [ ↑ RETURN TO TOP ]
          </a>
        </div>
      </footer>
    </section>
  );
}

