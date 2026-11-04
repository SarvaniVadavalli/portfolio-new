"use client";

import React, { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";

// Formatter replicating prototype's paint function
function formatCode(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"[^"]*"?/g, (m) => `<span class="s">${m}</span>`)
    .replace(/^(\s+)(\w+):/gm, '$1<span class="k">$2</span>:');
}

export default function Landing() {
  const helloRef = useRef<HTMLElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);
  const [typedHtml, setTypedHtml] = useState<string>("");

  const fullCodeText = `const sarvani = {
  studying: "${portfolioData.codeCard.studying}",
  building: "${portfolioData.codeCard.building}",
  lookingFor: "${portfolioData.codeCard.lookingFor}",
}`;

  // Typewriter effect matching prototype timing (start 1.2s, 28ms/char)
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      setTypedHtml(formatCode(fullCodeText));
      return;
    }

    let n = 0;
    let timer: NodeJS.Timeout | null = null;

    const type = () => {
      setTypedHtml(formatCode(fullCodeText.slice(0, n)));
      if (n <= fullCodeText.length) {
        n++;
        timer = setTimeout(type, 28);
      }
    };

    const startTimer = setTimeout(type, 1200);

    return () => {
      clearTimeout(startTimer);
      if (timer) clearTimeout(timer);
    };
  }, [fullCodeText]);

  // Scroll-linked exit matching prototype
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const section = helloRef.current;
    if (!section) return;

    let busy = false;
    const handleScroll = () => {
      if (busy) return;
      busy = true;
      requestAnimationFrame(() => {
        const p = Math.min(window.scrollY / window.innerHeight, 1);
        section.style.setProperty("--p", p.toString());
        busy = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="hello" ref={helloRef}>
      <div className="landing-grid">
        {/* Left column: Technical label, H1, intro paragraph, buttons */}
        <div className="landing-left">
          <div
            className="terminal-label up"
            style={{ "--d": "0.1s" } as React.CSSProperties}
          >
            {portfolioData.terminalPath}
          </div>

          <h1 id="name" aria-label={portfolioData.headline}>
            {(() => {
              const words = portfolioData.headline.split(" ");
              let charIndex = 0;
              return words.map((word, wordIdx) => {
                const letters = word.split("").map((c) => {
                  const idx = charIndex++;
                  return (
                    <span
                      key={idx}
                      className="ch"
                      style={{ "--i": idx } as React.CSSProperties}
                      aria-hidden="true"
                    >
                      {c}
                    </span>
                  );
                });
                const isLast = wordIdx === words.length - 1;
                const spaceIdx = !isLast ? charIndex++ : -1;
                return (
                  <React.Fragment key={wordIdx}>
                    <span className="inline-block whitespace-nowrap">
                      {letters}
                      {isLast && (
                        <span className="hero-cursor" aria-hidden="true">
                          _
                        </span>
                      )}
                    </span>
                    {!isLast && (
                      <span
                        className="ch"
                        style={{ "--i": spaceIdx } as React.CSSProperties}
                        aria-hidden="true"
                      >
                        {" "}
                      </span>
                    )}
                  </React.Fragment>
                );
              });
            })()}
          </h1>

          <p
            className="lead up"
            style={{ "--d": "1.4s" } as React.CSSProperties}
          >
            {portfolioData.subheading}
          </p>

          <div
            className="btns up"
            style={{ "--d": "1.6s" } as React.CSSProperties}
          >
            <a
              className="btn pri"
              href={portfolioData.landingButtons.primaryHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {portfolioData.landingButtons.primaryText}
            </a>
            <a className="btn" href={portfolioData.landingButtons.secondaryHref}>
              {portfolioData.landingButtons.secondaryText}
            </a>
          </div>
        </div>

        {/* Right column: Code editor card and technical information subtext */}
        <div className="landing-right">
          <div
            className="code-editor-card up"
            style={{ "--d": "1.1s" } as React.CSSProperties}
          >
            <div className="window-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <pre
              id="code"
              ref={codeRef}
              aria-label="Short profile: studying software engineering and AI, building useful things, looking for an internship"
              dangerouslySetInnerHTML={{ __html: typedHtml }}
            />
          </div>

          <div
            className="code-subtext up"
            style={{ "--d": "1.5s" } as React.CSSProperties}
          >
            {portfolioData.codeCardSubtext}
          </div>
        </div>
      </div>
    </section>
  );
}
