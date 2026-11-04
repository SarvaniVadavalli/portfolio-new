"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

// Unit block size for crisp pixel-art geometry
const U = 4;

// 6x6 pixel matrix for Pac-Man body (always visible)
const PACMAN_BODY = [
  "..####",
  ".###..",
  "###...",
  "###...",
  ".###..",
  "..####",
];

// 4x7 Retro Finish Flag at the far right
const FLAG_MATRIX = [
  "#.#.",
  ".#.#",
  "#.#.",
  ".#.#",
  "#...",
  "#...",
  "#...",
];

// Blocky pixel-art font for "YOU WIN!" (5 rows)
const PIXEL_FONT: Record<string, string[]> = {
  Y: ["#...#", "#...#", ".#.#.", "..#..", "..#.."],
  O: [".###.", "#...#", "#...#", "#...#", ".###."],
  U: ["#...#", "#...#", "#...#", "#...#", ".###."],
  W: ["#...#", "#...#", "#.#.#", "##.##", "#...#"],
  I: ["###", ".#.", ".#.", ".#.", "###"],
  N: ["#...#", "##..#", "#.#.#", "#..##", "#...#"],
  "!": ["#", "#", "#", ".", "#"],
};

function renderMatrix(
  matrix: string[],
  startX: number,
  startY: number,
  colorMap: Record<string, string>,
  keyPrefix: string
) {
  const rects: React.ReactElement[] = [];
  matrix.forEach((row, r) => {
    row.split("").forEach((ch, c) => {
      if (ch !== "." && colorMap[ch]) {
        rects.push(
          <rect
            key={`${keyPrefix}-${r}-${c}`}
            x={startX + c * U}
            y={startY + r * U}
            width={U}
            height={U}
            fill={colorMap[ch]}
            shapeRendering="crispEdges"
          />
        );
      }
    });
  });
  return rects;
}

// 18 dots distributed evenly along the 960px lane
const INITIAL_DOTS = [
  75, 123, 171, 219, 267, 315, 363, 411, 459, 507, 555, 603, 651, 699, 747, 795,
  843, 885,
];

export default function ArcadeBanner() {
  const [pacmanX, setPacmanX] = useState(24);
  const [facing, setFacing] = useState<"right" | "left">("right");
  const [mouthClosed, setMouthClosed] = useState(false);
  const [dots, setDots] = useState<boolean[]>(INITIAL_DOTS.map(() => true));
  const [isWon, setIsWon] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetGame = useCallback(() => {
    setPacmanX(24);
    setFacing("right");
    setMouthClosed(false);
    setDots(INITIAL_DOTS.map(() => true));
    setIsWon(false);
  }, []);

  const movePacman = useCallback(
    (direction: "right" | "left") => {
      if (isWon) {
        if (direction === "right") {
          resetGame();
        }
        return;
      }

      setFacing(direction);
      setMouthClosed((prev) => !prev);

      const step = 18;
      setPacmanX((prevX) => {
        const nextX =
          direction === "right"
            ? Math.min(prevX + step, 905)
            : Math.max(prevX - step, 16);

        // Collect dots within touching distance
        setDots((prevDots) =>
          prevDots.map((active, idx) => {
            if (!active) return false;
            const dotX = INITIAL_DOTS[idx];
            return Math.abs(nextX + 12 - (dotX + 3.5)) >= 15;
          })
        );

        // Win condition: reach finish marker at x >= 895
        if (nextX >= 895) {
          setIsWon(true);
        }

        return nextX;
      });
    },
    [isWon, resetGame]
  );

  // Global arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        movePacman("right");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        movePacman("left");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [movePacman]);

  // Click / tap support (left half moves left, right half moves right)
  const handleLaneClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX > rect.width / 2) {
      movePacman("right");
    } else {
      movePacman("left");
    }
  };

  // Render "YOU WIN!" pixel-art font centered in 960px lane
  const renderVictoryText = () => {
    const blockSize = 4.5;
    let curX = 389; // centered horizontally: (960 - 182) / 2
    const startY = 21.5;
    const letters = ["Y", "O", "U", " ", "W", "I", "N", "!"];
    const elements: React.ReactElement[] = [];

    letters.forEach((ch, idx) => {
      if (ch === " ") {
        curX += 4 * blockSize;
        return;
      }
      const mat = PIXEL_FONT[ch];
      if (!mat) return;
      const color =
        ch === "Y" || ch === "O" || ch === "U" || ch === "!"
          ? "var(--str)"
          : "var(--acc)";

      mat.forEach((row, r) => {
        row.split("").forEach((pixel, c) => {
          if (pixel === "#") {
            elements.push(
              <rect
                key={`win-${idx}-${r}-${c}`}
                x={curX + c * blockSize}
                y={startY + r * blockSize}
                width={blockSize}
                height={blockSize}
                fill={color}
                shapeRendering="crispEdges"
              />
            );
          }
        });
      });
      curX += (mat[0].length + 1.5) * blockSize;
    });

    return elements;
  };

  return (
    <section className="arcade-section" aria-label="Retro pixel-art arcade lane">
      <div
        className="arcade-lane-container"
        ref={containerRef}
        tabIndex={0}
        role="region"
        aria-label="Interactive Pac-Man minigame: use Left and Right arrow keys to move"
      >
        <svg
          className="arcade-lane-svg"
          viewBox="0 0 960 65"
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          onClick={handleLaneClick}
          role="img"
          aria-label={
            isWon
              ? "YOU WIN! Press Right arrow key to restart."
              : "Pac-Man arcade strip. Use Left and Right arrow keys to collect dots."
          }
        >
          {/* Top pair of thin horizontal boundary lines */}
          <rect x="0" y="8" width="960" height="2" fill="var(--line)" />
          <rect x="0" y="14" width="960" height="2" fill="var(--line)" />

          {/* Bottom pair of thin horizontal boundary lines */}
          <rect x="0" y="49" width="960" height="2" fill="var(--line)" />
          <rect x="0" y="55" width="960" height="2" fill="var(--line)" />

          {isWon ? (
            /* Victory screen: replaces characters with blocky pixel-art "YOU WIN!" */
            <g className="arcade-victory-message">{renderVictoryText()}</g>
          ) : (
            /* Active gameplay elements */
            <>
              {/* Collectible square dots */}
              <g className="arcade-dots">
                {INITIAL_DOTS.map((dotX, idx) =>
                  dots[idx] ? (
                    <rect
                      key={`dot-${idx}`}
                      x={dotX}
                      y={29}
                      width={7}
                      height={7}
                      fill="var(--str)"
                      shapeRendering="crispEdges"
                    />
                  ) : null
                )}
              </g>

              {/* Pac-Man Character with keyboard position & facing */}
              <g
                className="arcade-pacman-player"
                transform={
                  facing === "left"
                    ? `translate(${pacmanX * 2 + 24}, 0) scale(-1, 1)`
                    : undefined
                }
              >
                {renderMatrix(
                  PACMAN_BODY,
                  pacmanX,
                  20.5,
                  { "#": "var(--acc)" },
                  "pac-body"
                )}
                {/* Closed mouth fill while moving */}
                {mouthClosed && (
                  <g className="arcade-mouth-closed">
                    <rect
                      x={pacmanX + 4 * U}
                      y={20.5 + 1 * U}
                      width={U}
                      height={U}
                      fill="var(--acc)"
                      shapeRendering="crispEdges"
                    />
                    <rect
                      x={pacmanX + 3 * U}
                      y={20.5 + 2 * U}
                      width={3 * U}
                      height={U}
                      fill="var(--acc)"
                      shapeRendering="crispEdges"
                    />
                    <rect
                      x={pacmanX + 3 * U}
                      y={20.5 + 3 * U}
                      width={3 * U}
                      height={U}
                      fill="var(--acc)"
                      shapeRendering="crispEdges"
                    />
                    <rect
                      x={pacmanX + 4 * U}
                      y={20.5 + 4 * U}
                      width={U}
                      height={U}
                      fill="var(--acc)"
                      shapeRendering="crispEdges"
                    />
                  </g>
                )}
              </g>

              {/* Destination Finish Marker at far right */}
              <g className="arcade-flag-sprite">
                {FLAG_MATRIX.map((row, r) =>
                  row.split("").map((ch, c) => {
                    if (ch !== "#") return null;
                    const col =
                      r < 4
                        ? (r + c) % 2 === 0
                          ? "var(--acc)"
                          : "var(--str)"
                        : "var(--line)";
                    return (
                      <rect
                        key={`flag-${r}-${c}`}
                        x={926 + c * U}
                        y={18 + r * U}
                        width={U}
                        height={U}
                        fill={col}
                        shapeRendering="crispEdges"
                      />
                    );
                  })
                )}
              </g>
            </>
          )}
        </svg>
      </div>
    </section>
  );
}
