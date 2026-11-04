# Portfolio Build Spec: Sarvani

A spec for building a personal developer portfolio for internship and job applications. Read this whole file before writing any code. The appendix at the bottom contains a complete working prototype (single HTML file). It is the source of truth for look, spacing, and behaviour. Where this spec and the prototype disagree, the prototype wins.

## 1. Goal and audience

- **Owner:** Sarvani, a student studying software engineering, computer science, and AI/ML.
- **Audience:** recruiters and hiring managers who skim for about a minute.
- **Goal:** feel like a developer's portfolio (code touches, mono type, git-style details) while staying minimal, unique, animated, and not cluttered. Plain language, not too technical.
- **Inspiration:** React Bits (reactbits.dev) for backgrounds, cards, and text animations.

## 2. Tech stack (recommended)

- Next.js (App Router) + TypeScript + Tailwind CSS.
- Fonts via `next/font/google`: `IBM_Plex_Sans` (400, 500, 600) and `IBM_Plex_Mono` (400, 500).
- Animation: plain CSS and small React hooks (IntersectionObserver, requestAnimationFrame). Framer Motion is optional; do not add it unless it replaces something simpler.
- Deploy on Vercel.
- All content lives in `src/data/portfolio.ts` so the owner edits data, not components.

Suggested structure:

```
src/
  app/ (layout.tsx, page.tsx, globals.css)
  components/ (Header, Landing, About, Skills, Projects, Stats, Heatmap, Contact, Footer, Background, ThemeToggle, Reveal)
  data/portfolio.ts
  hooks/ (useReveal, useCountUp, useScrollProgress)
```

## 3. Design system

### 3.1 Colour tokens (define as CSS variables in `globals.css`; do not hardcode colours in components)

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#f6f8f5` | `#0b110e` |
| `--card` | `#ffffff` | `#121b16` |
| `--ink` | `#12201a` | `#e9f2ec` |
| `--dim` | `#5f6f66` | `#8fa398` |
| `--line` | `#d6ded8` | `#243229` |
| `--acc` (green accent) | `#0b8f63` | `#4ade9a` |
| `--soft` | `rgba(11,143,99,.16)` | `rgba(74,222,154,.15)` |
| `--key` (code keys) | `#0b8f63` | `#4ade9a` |
| `--str` (code strings) | `#b4531a` | `#f0b27a` |
| `--b` (strong border) | `#12201a` | `#e9f2ec` |

Theme behaviour: follow `prefers-color-scheme` by default. A Theme button sets `data-theme="light|dark"` on `<html>` and overrides the system. Persisting the choice in localStorage is fine in the Next.js app; add a tiny inline script in `<head>` to avoid a flash.

### 3.2 Typography (technical, not bold-only)

- Sans: IBM Plex Sans. Mono: IBM Plex Mono. Only weights 400, 500, 600. **Never 700.**
- Body: 17px / 1.65, Plex Sans 400.
- H1 (landing name): 500, `clamp(40px, 8.5vw, 96px)`, line-height 1.05, letter-spacing -0.03em.
- H2 (sections): 500, `clamp(28px, 5vw, 40px)`, line-height 1.15, letter-spacing -0.02em. Each H2 gets a mono index before it via CSS counter: `01 /`, `02 /`, ... in accent colour, 14px mono.
- Mono (Plex Mono) is used for: logo, nav links, labels, tags, chips, stat numbers, code card, email, footer.
- No serif fonts anywhere. Nothing luxurious.

### 3.3 Shape and surfaces

- Cards and boxes: `--card` background, 2px solid `--b` border, radius 10px.
- Buttons: Plex Sans 600 15px, `--card` background, 1px `--line` border with a 3px bottom border (raised look), radius 10px, padding 8px 16px. Primary: accent fill, text colour `--bg`. Hover: lift -2px and accent border.
- Hover shadow on project cards: `5px 5px 0 var(--soft)`.

### 3.4 Background (futuristic technical grid & digital pixel clusters)

A fixed atmospheric layer behind everything:
- Deep green-black base (`--bg: #060c08` in dark, `#f6f8f5` in light).
- Fine, subtle 36px orthogonal technical grid covering the viewport (`--grid-line: rgba(74, 222, 154, 0.05)`).
- Scattered digital green pixel clusters concentrated near corners (top-left, bottom-right) and isolated glowing bit accents across the field.
- Subtle atmospheric green ambient radial lighting (`.bg-glow-tl`, `.bg-glow-br`).
- Lightweight SVG implementation; no heavy animations or runtime penalties.

## 4. Sections (in order)

### 4.1 Header
Sticky, blurred (`color-mix(bg 85% transparent)` + `backdrop-filter: blur(8px)`), 1px bottom border. Left: "Sarvani" with a subtle blinking cursor `|` in mono 500 17px. Centre: nav links (about, skills, projects, stats, contact) in mono 14px with subtle green hover; the link for the section in view is highlighted (IntersectionObserver, rootMargin `-45% 0px -50% 0px`); nav hidden below 640px. Right: Theme button in mono 13px with rounded border.

### 4.2 Landing (full screen, before About)
- `min-height: 100svh`, elevated padding: top padding of header height + `clamp(24px, 6vh, 64px)`, bottom padding `clamp(60px, 12vh, 120px)`, left/right padding `clamp(24px, 6vw, 96px)`. Sits visually balanced with an authentic computer science workspace atmosphere.
- Layout:
  - From 900px up: Two columns with `clamp(40px, 5vw, 76px)` gap, left column slightly wider than right (`minmax(0, 1.2fr) minmax(0, 1fr)`), max-width 1280px. Both columns vertically aligned. Left column contains terminal path label ("~/sarvani/developer"), monospace heading ("Hi, I'm Sarvani._"), intro paragraph, and buttons ("Resume →" and "See my projects"). Right column contains code editor window card with 3 green indicator dots, typing animation, and education metadata underneath ("B.Tech CSE · AI & ML · 2028").
  - Below 900px: Single column stacking gracefully in natural order: terminal label, heading, intro line, buttons, code editor card, technical info line.
- Terminal path label: "~/sarvani/developer" in IBM Plex Mono 13.5px (`--acc`), subtle spacing above the heading.
- H1 "Hi, I'm Sarvani._": IBM Plex Mono weight 500, normal `--ink` colour (no green text, no text shadows, no glowing effects, never weight 700). Sized to `clamp(36px, 4.4vw, 62px)` (~56–62px on desktop). Word-grouped split-letter rising animation (0.9s cubic-bezier(.2,.8,.2,1), letter stagger 45ms, delay 200ms) with `"Sarvani."` preserved as an unbroken nowrap word group, followed by a blinking green terminal cursor `_` in `--acc`.
- Code editor card (mono 14px, dark card surface, 1px line border, radius 14, max-width 530px, padding 22px 26px 26px, with 3 green window dots in the upper-left corner). Types itself once, starting at 1.2s, 28ms per character:

```
const sarvani = {
  studying: "Software engineering and AI",
  building: "Things people actually use",
  lookingFor: "An internship",
}
```
  Keys use `--key`, strings use `--str`.
- Technical info subtext: "B.Tech CSE · AI & ML · 2028" in mono 13px dim text (`--dim`) underneath the code card, read from `codeCardSubtext` in `src/data/portfolio.ts`. Fades up at 1.5s.
- Intro line: "From building applications to exploring intelligent systems, I enjoy turning curiosity into practical solutions. I'm looking for opportunities to learn, contribute, and grow through real-world engineering." Font size `clamp(15.5px, 1.1vw, 17.5px)` / 1.65. Fades up at 1.4s.
- Buttons: "Resume →" (primary green fill `--acc`, opens /resume.pdf in new tab) and "See my projects" (secondary outlined card, scrolls to #projects). Fade up at 1.6s. Monospace typography, 8px radius.
- Scroll cue bottom-left: a 1px accent line animating `scaleY` plus mono label "scroll to enter".
- Scroll-linked exit: `p = min(scrollY / innerHeight, 1)`. Landing gets `translateY(-40px * p)`, `scale(1 - 0.05 * p)`, `opacity(1 - 1.1 * p)`. Throttle with requestAnimationFrame and a passive listener.

### 4.3 About (`01 /`)
Compact top padding (`clamp(18px, 3vh, 32px)`, `scroll-margin-top: 70px`). Two columns: 200px photo on the left, then text on the right (gap 34px); stacks on mobile. Photo: square, 2px `--b` border, radius 18, shadow `6px 6px 0 var(--soft)`, `object-fit: cover`. Placeholder is an "S" in mono accent until a real photo is added at `public/profile.jpg`. Text: three personal paragraphs (stored in `portfolioData.about.paragraphs`) plus fact tags in mono 13px with dashed `--line` borders: "Student", "Software Engineering", "AI / ML", "Open to Internships". Reveal on scroll (15% visible threshold, 0.8s `cubic-bezier(.2,.8,.2,1)`).

### 4.4 Skills (`02 /`)
Grouped boxes (grid, `auto-fit, minmax(270px, 1fr)`, gap 18). Each box: header row in mono 13px with a small accent square icon (14px, radius 3, shadow `3px 3px 0 var(--soft)`) and a lowercase label on the left, and "N items" in `--dim` on the right. Below: chips in mono 14px, padding 5px 12px, `--bg` background, 1px `--line` border with a 3px bottom border, radius 7. Chip hover: accent border and text, lift -2px. Optional later: pixel-art icons per group (the owner shared a reference with pixel icons).

Starting groups (owner must correct these): languages (Python, JavaScript, TypeScript, SQL); frontend (React, Next.js, Tailwind, Framer Motion); backend (Node.js, REST, Supabase); ai and data (Machine learning, LLM apps, PostgreSQL); tools (Git, Figma, Vercel).

### 4.5 Projects (`03 /`)
A horizontal strip of **short** cards (the owner does not want long cards).
- Strip: flex, gap 18, `overflow-x: auto`, `scroll-snap-type: x mandatory`; cards `flex: 0 0 min(270px, 78vw)` with `scroll-snap-align: start`.
- Mouse drag-to-scroll (pointer events, mouse only; disable snap while dragging; cursor grab/grabbing). Touch uses native scroll.
- Card: title (Plex Sans 500 20px), one dim sentence (15px), two mono accent tags (12px), a "View project ↗" mono link. Hover: lift -4px plus the soft offset shadow.
- First project: **ApplyFlow**, "Automates the repetitive parts of job applications." Tags: SaaS, Automation. Others are placeholders.

### 4.6 GitHub and LeetCode stats (`04 /`)
Two stacked boxes, each with a header (icon, "github" or "leetcode", "@handle"), a contribution heatmap, a footer line, and a counts row.
- Heatmap: CSS grid, 7 rows, 53 columns (`grid-auto-flow: column`, `grid-auto-columns: 1fr`), gap 3px, square cells (`aspect-ratio: 1`), radius 3. Wrap in an `overflow-x: auto` container with `min-width: 640px` on the grid so it scrolls on phones.
- Levels: 0 = `--line`; 1 to 4 = `color-mix(in srgb, var(--acc) 28% / 52% / 76% / 100%, var(--card))`.
- Footer: left "N contributions in the last year" (GitHub) or "N submissions in the last year" (LeetCode); right legend "less" + 5 squares + "more". Mono 13px, `--dim`.
- Counts row: mono 500 30px numbers over mono 13px dim labels. GitHub: repos, day streak. LeetCode: solved, easy, medium, hard.
- Animation: cells fade and scale in from the left (`delay = 14ms * column`) when the heatmap enters view. Numbers count up over 1.1s (ease-out cubic) when 50% visible. Each runs once.
- Phase 1 uses sample data (the prototype's seeded generator). Phase 2 uses live data (see section 7).

### 4.7 Contact (`05 /`)
H2 "Let's talk", line "I'm looking for internships and entry-level roles. I reply fast." Email in mono 500 `clamp(20px, 4vw, 34px)`, accent colour, soft underline, plus a "Copy email" button that changes to "Copied" for 1.8s. Buttons: Download resume (primary), GitHub, LinkedIn, LeetCode. Footer: "Built by Sarvani", mono 13px, top border.

## 5. Transitions and animation

- **Reveal on scroll:** h2, lead text, photo, about text, boxes, project cards, contact row and buttons start at opacity 0, `translateY(28px)`, and ease in when 15% visible: 0.8s `cubic-bezier(.2,.8,.2,1)`, stagger `(siblingIndex % 6) * 90ms`. After about 1.4s, swap to the short hover transitions so hover effects stay snappy. Run once.
- **Anchors:** `scroll-behavior: smooth`, `scroll-padding-top: 70px`.
- **Only these things animate on their own:** landing intro, scroll-linked landing exit, section reveals, heatmap fill, stat count-up, background drift. Nothing else. Keep it calm.
- **Reduced motion:** `prefers-reduced-motion: reduce` turns off all animation and transitions and shows final states immediately (full name, full code card, filled heatmap, final numbers, no hidden elements).

## 6. Responsive, accessibility, performance

- Mobile first. Below 640px: nav hidden, About stacks, photo 150px.
- Semantic HTML (`header`, `nav`, `section`, `footer`), one H1, ordered headings.
- `aria-label` on the split-letter H1 (letters `aria-hidden`) and on the code card. Alt text on the photo. Theme button has an `aria-label`.
- Visible focus: 2px accent outline, 3px offset. Contrast at least WCAG AA in both themes.
- Keep JavaScript small. No animation libraries unless needed. Lighthouse target: 95+ on performance, accessibility, and best practices.

## 7. Data and live stats

Put everything editable in `src/data/portfolio.ts`: name, tagline, about text, photo path, fact tags, skill groups, projects, links, email, stats handles and snapshot numbers.

**Placeholders the owner must replace:** about paragraph, profile photo, skills lists, projects two to four (title, sentence, tags, link), email, GitHub, LinkedIn, LeetCode URLs, resume file (`public/resume.pdf`), and all stat numbers.

**Phase 2 (optional) live stats:**
- GitHub: the GraphQL API's `contributionsCollection.contributionCalendar` gives the heatmap data. It needs a personal access token stored server-side as `GITHUB_TOKEN`, never exposed to the browser.
- LeetCode: there is no official public API. The unofficial GraphQL endpoint at `leetcode.com/graphql` (profile calendar and submission stats) works today but may change.
- Fetch on the server, cache with ISR (revalidate about every 6 hours), and fall back to a static snapshot JSON if a request fails.

## 8. Build phases (do them in order; stop after each and show the result)

1. Project setup, fonts, colour tokens, theme toggle, background layer.
2. Header and Landing, including the letter animation, typing card, and scroll-linked exit.
3. About, Skills, Projects (with drag strip).
4. Stats with the heatmap component and count-ups (sample data).
5. Contact, footer, reveal system, reduced-motion handling.
6. Accessibility, performance, and responsive polish. Compare against the prototype side by side.
7. Deploy to Vercel. Then, optionally, live stats (section 7).

**Done means:** matches the prototype in both themes, works from 360px to desktop, passes the reduced-motion check, and all content comes from the data file.

## 9. Do not

- Do not add a grid background, a serif font, blue as the accent, or bold (700) type.
- Do not make long project cards or add sections that were not requested.
- Do not add more animation than listed. Calm and minimal wins.
- Do not hardcode colours or content inside components.
- Do not invent facts about the owner. Leave clearly marked placeholders.

## Appendix: working prototype (single HTML file)

Port this faithfully into the stack above. Reproduce its look and behaviour, not its structure.

````html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Sarvani · Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{--bg:#f6f8f5;--card:#fff;--ink:#12201a;--dim:#5f6f66;--line:#d6ded8;--acc:#0b8f63;--soft:rgba(11,143,99,.16);--key:#0b8f63;--str:#b4531a;--b:#12201a;
--head:'IBM Plex Sans',system-ui,sans-serif;--sans:'IBM Plex Sans',system-ui,sans-serif;--mono:'IBM Plex Mono',ui-monospace,monospace;color-scheme:light;
box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0b110e;--card:#121b16;--ink:#e9f2ec;--dim:#8fa398;--line:#243229;--acc:#4ade9a;--soft:rgba(74,222,154,.15);--key:#4ade9a;--str:#f0b27a;--b:#e9f2ec;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#0b110e;--card:#121b16;--ink:#e9f2ec;--dim:#8fa398;--line:#243229;--acc:#4ade9a;--soft:rgba(74,222,154,.15);--key:#4ade9a;--str:#f0b27a;--b:#e9f2ec;color-scheme:dark}
*,*::before,*::after{box-sizing:inherit}
html{scroll-behavior:smooth;scroll-padding-top:70px}
body{margin:0;background:var(--bg);color:var(--ink);font:400 17px/1.65 var(--sans);overflow-x:hidden}
.bg{position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none}
.bg i{position:absolute;width:55vmax;height:55vmax;border-radius:50%;background:radial-gradient(circle,var(--soft),transparent 65%);filter:blur(30px);animation:drift 26s ease-in-out infinite alternate}
.bg i:nth-child(1){left:-15vmax;top:-20vmax}
.bg i:nth-child(2){right:-20vmax;bottom:-25vmax;animation-duration:32s;animation-delay:-9s}
.bg::after{content:"";position:absolute;inset:0;opacity:.35;mix-blend-mode:overlay;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E")}
@keyframes drift{to{transform:translate(12vmax,8vmax) scale(1.15)}}
header{position:sticky;top:env(safe-area-inset-top,0px);z-index:5;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:12px clamp(18px,5vw,48px);background:color-mix(in srgb,var(--bg) 82%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
header b{font:500 17px var(--mono)}
nav{display:flex;gap:4px;font:14px var(--mono);overflow-x:auto}
nav a{padding:6px 12px;border-radius:8px;color:var(--dim);text-decoration:none;white-space:nowrap}
nav a:hover,nav a.on{color:var(--acc);background:var(--soft)}
#theme,.btn{font:600 15px var(--sans);color:var(--ink);background:var(--card);border:1px solid var(--line);border-bottom-width:3px;border-radius:10px;padding:8px 16px;cursor:pointer;text-decoration:none;transition:transform .15s,border-color .2s;display:inline-block}
#theme{font:13px var(--mono);padding:5px 12px}
.btn.pri{background:var(--acc);border-color:var(--acc);color:var(--bg)}
.btn:hover,#theme:hover{transform:translateY(-2px);border-color:var(--acc)}
section{max-width:960px;margin:0 auto;padding:90px clamp(20px,5vw,40px) 10px}
#hello{max-width:none;min-height:100svh;padding-top:90px;padding-left:clamp(20px,8vw,120px);display:flex;flex-direction:column;justify-content:center;align-items:flex-start;position:relative;transform-origin:50% 100%;transform:translateY(calc(var(--p,0) * -40px)) scale(calc(1 - var(--p,0) * .05));opacity:calc(1 - var(--p,0) * 1.1)}
.ch{display:inline-block;white-space:pre;animation:rise .9s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i) * 45ms + 200ms)}
@keyframes rise{from{opacity:0;transform:translateY(40%);filter:blur(8px)}}
.up{animation:up .9s cubic-bezier(.2,.8,.2,1) both;animation-delay:var(--d,0s)}
@keyframes up{from{opacity:0;transform:translateY(18px)}}
.cue{position:absolute;left:clamp(20px,8vw,120px);bottom:28px;display:flex;align-items:center;gap:12px;font:13px var(--mono);color:var(--dim)}
.cue i{width:1px;height:34px;background:var(--acc);transform-origin:top;animation:cue 1.8s ease-in-out infinite}
@keyframes cue{0%{transform:scaleY(0)}50%{transform:scaleY(1)}100%{transform:scaleY(1);opacity:0}}
h1{font:500 clamp(40px,8.5vw,96px)/1.05 var(--head);letter-spacing:-.03em;margin:0 0 24px}
body{counter-reset:s}
h2{font:500 clamp(28px,5vw,40px)/1.15 var(--head);letter-spacing:-.02em;margin:0 0 26px;counter-increment:s}
h2::before{content:"0" counter(s) " /";font:400 14px var(--mono);color:var(--acc);margin-right:12px;vertical-align:middle;letter-spacing:0}
.lead{color:var(--dim);max-width:540px;margin:0 0 26px}
pre{margin:0 0 26px;padding:18px 22px;background:var(--card);border:1px solid var(--line);border-radius:12px;font:14px/1.8 var(--mono);min-height:140px;max-width:500px;overflow-x:auto}
.k{color:var(--key)}.s{color:var(--str)}
.btns{display:flex;gap:12px;flex-wrap:wrap}
.about{display:grid;grid-template-columns:200px 1fr;gap:34px;align-items:center}
.photo{width:200px;aspect-ratio:1;border:2px solid var(--b);border-radius:18px;background:var(--card);box-shadow:6px 6px 0 var(--soft);display:grid;place-items:center;font:500 64px var(--mono);color:var(--acc);overflow:hidden}
.photo img{width:100%;height:100%;object-fit:cover}
.facts{display:flex;flex-wrap:wrap;gap:8px;margin-top:6px}
.facts span{font:13px var(--mono);color:var(--dim);border:1px dashed var(--line);border-radius:8px;padding:4px 10px}
.skills{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:18px}
.box{background:var(--card);border:2px solid var(--b);border-radius:10px;padding:16px 16px 18px}
.box header{all:unset;display:flex;justify-content:space-between;align-items:center;font:13px var(--mono);margin-bottom:14px}
.box header span:first-child{display:flex;align-items:center;gap:10px}
.box header span:last-child{color:var(--dim)}
.ic{width:14px;height:14px;background:var(--acc);box-shadow:3px 3px 0 var(--soft);border-radius:3px}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{font:14px var(--mono);padding:5px 12px;background:var(--bg);border:1px solid var(--line);border-bottom-width:3px;border-radius:7px;transition:.15s}
.chip:hover{border-color:var(--acc);color:var(--acc);transform:translateY(-2px)}
.strip{display:flex;gap:18px;overflow-x:auto;scroll-snap-type:x mandatory;padding:6px 4px 20px;margin:0 calc(-1 * clamp(20px,5vw,40px));padding-inline:clamp(20px,5vw,40px);scrollbar-width:thin;cursor:grab}
.strip.drag{cursor:grabbing;scroll-snap-type:none}
.pc{flex:0 0 min(270px,78vw);scroll-snap-align:start;background:var(--card);border:2px solid var(--b);border-radius:10px;padding:20px;user-select:none;transition:transform .2s,box-shadow .2s}
.pc:hover{transform:translateY(-4px);box-shadow:5px 5px 0 var(--soft)}
.pc h3{font:500 20px var(--head);margin:0 0 6px}
.pc p{margin:0 0 14px;color:var(--dim);font-size:15px;line-height:1.5}
.tag{font:12px var(--mono);color:var(--acc);margin-right:10px}
.pc a{display:block;margin-top:14px;font:14px var(--mono);color:var(--ink);text-decoration:none}
.pc a:hover{color:var(--acc)}
.stats{display:grid;gap:18px}
.nums{display:grid;grid-template-columns:repeat(auto-fit,minmax(90px,1fr));gap:10px;margin-top:18px}
.nums div b{display:block;font:500 30px/1.1 var(--mono)}
.nums div span{font:13px var(--mono);color:var(--dim)}
.bar{display:grid;grid-template-columns:70px 1fr 40px;gap:12px;align-items:center;font:13px var(--mono);margin-top:10px;color:var(--dim)}
.bar i{height:10px;border:1px solid var(--line);border-radius:6px;background:var(--bg);overflow:hidden}
.bar i u{display:block;height:100%;width:0;background:var(--acc);transition:width 1.2s cubic-bezier(.2,.8,.2,1)}
.hmw{overflow-x:auto;padding-bottom:6px}
.hm{display:grid;grid-template-rows:repeat(7,1fr);grid-auto-flow:column;grid-auto-columns:1fr;gap:3px;min-width:640px}
.hm i{aspect-ratio:1;border-radius:3px;background:var(--line);opacity:0;transform:scale(.4);transition:opacity .4s,transform .4s;transition-delay:calc(var(--c) * 14ms)}
.hm.on i{opacity:1;transform:none}
.hm i[data-l="1"],.lg i[data-l="1"]{background:color-mix(in srgb,var(--acc) 28%,var(--card))}
.hm i[data-l="2"],.lg i[data-l="2"]{background:color-mix(in srgb,var(--acc) 52%,var(--card))}
.hm i[data-l="3"],.lg i[data-l="3"]{background:color-mix(in srgb,var(--acc) 76%,var(--card))}
.hm i[data-l="4"],.lg i[data-l="4"]{background:var(--acc)}
.hmf{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;font:13px var(--mono);color:var(--dim);margin-top:12px}
.hmf b{color:var(--ink)}
.lg{display:flex;align-items:center;gap:4px}
.lg i{width:12px;height:12px;border-radius:3px;background:var(--line);display:inline-block}
.rv{opacity:0;transform:translateY(28px);transition:opacity .8s cubic-bezier(.2,.8,.2,1),transform .8s cubic-bezier(.2,.8,.2,1);transition-delay:var(--d,0s)}
.rv.in{opacity:1;transform:none}
.rv.done{transition:transform .2s,box-shadow .2s,border-color .2s,opacity .2s;transition-delay:0s}
.mail{font:500 clamp(20px,4vw,34px)/1.2 var(--mono);letter-spacing:-.02em;color:var(--acc);text-decoration:none;border-bottom:2px solid var(--soft)}
.row{display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-bottom:24px}
footer{max-width:960px;margin:60px auto 0;padding:24px clamp(20px,5vw,40px) 40px;color:var(--dim);font:13px var(--mono);border-top:1px solid var(--line)}
a:focus-visible,button:focus-visible{outline:2px solid var(--acc);outline-offset:3px}
@media(max-width:640px){.about{grid-template-columns:1fr}.photo{width:150px;font-size:48px}nav{display:none}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}html{scroll-behavior:auto}}
</style>
</head>
<body>
<div class="bg" aria-hidden="true"><i></i><i></i></div>
<header>
  <b>Sarvani</b>
  <nav><a href="#about">about</a><a href="#skills">skills</a><a href="#projects">projects</a><a href="#stats">stats</a><a href="#contact">contact</a></nav>
  <button id="theme" type="button" aria-label="Switch between light and dark theme">Theme</button>
</header>

<section id="hello">
  <h1 id="name" aria-label="Hi, I’m Sarvani.">Hi, I’m Sarvani.</h1>
  <pre id="code" class="up" style="--d:1.1s" aria-label="Short profile: studying software engineering and AI, building useful things, looking for an internship"></pre>
  <p class="lead up" style="--d:1.4s">I’m a software engineering student who builds with AI. I’m looking for an internship where I can ship real features.</p>
  <div class="btns up" style="--d:1.6s"><a class="btn pri" href="#about">Enter portfolio</a><a class="btn" href="#projects">See my projects</a></div>
  <div class="cue"><i></i>scroll to enter</div>
</section>

<section id="about">
  <h2>About me</h2>
  <div class="about">
    <div class="photo" id="photo">S<!-- replace with: <img src="your-photo" alt="Sarvani"> --></div>
    <div>
      <p class="lead" style="max-width:none">I’m studying software engineering, computer science and AI/ML. I like turning ideas into products people can use, and I build projects to learn faster. [Add one or two personal sentences here.]</p>
      <div class="facts"><span>Student</span><span>Software engineering</span><span>AI/ML</span><span>Open to internships</span></div>
    </div>
  </div>
</section>

<section id="skills">
  <h2>What I work with</h2>
  <div class="skills">
    <div class="box"><header><span><i class="ic"></i>languages</span><span>4 items</span></header><div class="chips"><span class="chip">Python</span><span class="chip">JavaScript</span><span class="chip">TypeScript</span><span class="chip">SQL</span></div></div>
    <div class="box"><header><span><i class="ic"></i>frontend</span><span>4 items</span></header><div class="chips"><span class="chip">React</span><span class="chip">Next.js</span><span class="chip">Tailwind</span><span class="chip">Framer Motion</span></div></div>
    <div class="box"><header><span><i class="ic"></i>backend</span><span>3 items</span></header><div class="chips"><span class="chip">Node.js</span><span class="chip">REST</span><span class="chip">Supabase</span></div></div>
    <div class="box"><header><span><i class="ic"></i>ai and data</span><span>3 items</span></header><div class="chips"><span class="chip">Machine learning</span><span class="chip">LLM apps</span><span class="chip">PostgreSQL</span></div></div>
    <div class="box"><header><span><i class="ic"></i>tools</span><span>3 items</span></header><div class="chips"><span class="chip">Git</span><span class="chip">Figma</span><span class="chip">Vercel</span></div></div>
  </div>
</section>

<section id="projects">
  <h2>Things I’ve built</h2>
  <div class="strip" id="strip">
    <div class="pc"><h3>ApplyFlow</h3><p>Automates the repetitive parts of job applications.</p><span class="tag">SaaS</span><span class="tag">Automation</span><a href="#">View project ↗</a></div>
    <div class="pc"><h3>[Project two]</h3><p>One plain sentence on what it does.</p><span class="tag">AI/ML</span><span class="tag">[Stack]</span><a href="#">View project ↗</a></div>
    <div class="pc"><h3>[Project three]</h3><p>One plain sentence on what it does.</p><span class="tag">Web</span><span class="tag">[Stack]</span><a href="#">View project ↗</a></div>
    <div class="pc"><h3>[Project four]</h3><p>One plain sentence on what it does.</p><span class="tag">[Type]</span><span class="tag">[Stack]</span><a href="#">View project ↗</a></div>
  </div>
</section>

<section id="stats">
  <h2>GitHub and LeetCode</h2>
  <div class="stats">
    <div class="box"><header><span><i class="ic"></i>github</span><span>@your-handle</span></header>
      <div class="hmw"><div class="hm" data-seed="7"></div></div><div class="hmf"><span><b data-n="620">0</b> contributions in the last year</span><span class="lg">less<i></i><i data-l="1"></i><i data-l="2"></i><i data-l="3"></i><i data-l="4"></i>more</span></div><div class="nums"><div><b data-n="24">0</b><span>repos</span></div><div><b data-n="18">0</b><span>day streak</span></div></div></div>
    <div class="box"><header><span><i class="ic"></i>leetcode</span><span>@your-handle</span></header>
      <div class="hmw"><div class="hm" data-seed="11"></div></div><div class="hmf"><span><b data-n="310">0</b> submissions in the last year</span><span class="lg">less<i></i><i data-l="1"></i><i data-l="2"></i><i data-l="3"></i><i data-l="4"></i>more</span></div><div class="nums"><div><b data-n="150">0</b><span>solved</span></div><div><b data-n="90">0</b><span>easy</span></div><div><b data-n="52">0</b><span>medium</span></div><div><b data-n="8">0</b><span>hard</span></div></div>
      
      
      </div>
  </div>
</section>

<section id="contact">
  <h2>Let’s talk</h2>
  <p class="lead">I’m looking for internships and entry-level roles. I reply fast.</p>
  <div class="row"><a class="mail" href="mailto:you@example.com">you@example.com</a><button class="btn" id="copy" type="button">Copy email</button></div>
  <div class="btns"><a class="btn pri" href="#">Download resume</a><a class="btn" href="#">GitHub</a><a class="btn" href="#">LinkedIn</a><a class="btn" href="#">LeetCode</a></div>
</section>
<footer>Built by Sarvani</footer>

<script>
(function(){
  var root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  document.getElementById('theme').addEventListener('click',function(){
    var dark=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
    root.dataset.theme=dark?'light':'dark';
  });
  /* Landing: the profile writes itself once */
  var full='const sarvani = {\n  studying: "Software engineering and AI",\n  building: "Things people actually use",\n  lookingFor: "An internship",\n}',el=document.getElementById('code'),n=0;
  function paint(t){el.innerHTML=t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"[^"]*"?/g,function(m){return '<span class="s">'+m+'</span>'}).replace(/^(\s+)(\w+):/gm,'$1<span class="k">$2</span>:')}
  function type(){paint(full.slice(0,n));if(n++<full.length)setTimeout(type,28)}
  reduce?paint(full):setTimeout(type,1200);
  /* Stats count up and bars fill when visible */
  var seen=new WeakSet();
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting||seen.has(e.target))return;seen.add(e.target);
    var t=e.target;
    if(t.dataset.n){var end=+t.dataset.n,s=null;(function f(ts){s=s||ts;var p=reduce?1:Math.min((ts-s)/1100,1);t.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(performance.now())}
    if(t.dataset.w)t.style.width=t.dataset.w+'%';
  })},{threshold:.5});
  document.querySelectorAll('[data-n],[data-w]').forEach(function(x){io.observe(x)});
  /* Project strip: drag to scroll with a mouse */
  var st=document.getElementById('strip'),down=false,x0=0,s0=0;
  st.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;x0=e.clientX;s0=st.scrollLeft;st.classList.add('drag')});
  addEventListener('pointermove',function(e){if(down)st.scrollLeft=s0-(e.clientX-x0)});
  addEventListener('pointerup',function(){down=false;st.classList.remove('drag')});
  /* Nav highlights the section in view */
  var links=document.querySelectorAll('nav a'),secs=document.querySelectorAll('section');
  var nio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(function(s){nio.observe(s)});
  /* Landing: letters rise in, then the page eases away as you scroll */
  var nm=document.getElementById('name'),land=document.getElementById('hello'),txt=nm.textContent;
  nm.textContent='';
  txt.split('').forEach(function(c,i){var s=document.createElement('span');s.className='ch';s.style.setProperty('--i',i);s.setAttribute('aria-hidden','true');s.textContent=c;nm.appendChild(s)});
  if(!reduce){var busy=false;addEventListener('scroll',function(){if(busy)return;busy=true;requestAnimationFrame(function(){land.style.setProperty('--p',Math.min(scrollY/innerHeight,1));busy=false})},{passive:true})}
  /* GitHub and LeetCode heatmaps (sample data: replace with your own) */
  function rnd(s){return function(){s=(s*16807)%2147483647;return (s-1)/2147483646}}
  document.querySelectorAll('.hm').forEach(function(h){
    var r=rnd(+h.dataset.seed||7);
    for(var c=0;c<53;c++){var b=r()>.35?1:.35;for(var d=0;d<7;d++){
      var v=r()*b*((d===0||d===6)?.5:1),l=v>.8?4:v>.6?3:v>.4?2:v>.22?1:0,i=document.createElement('i');
      if(l)i.dataset.l=l;i.style.setProperty('--c',c);h.appendChild(i)}}
  });
  /* Sections ease in as you reach them */
  var vis=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;var t=e.target;vis.unobserve(t);
    if(t.classList.contains('hm')){t.classList.add('on');return}
    t.classList.add('in');setTimeout(function(){t.classList.add('done')},1400);
  })},{threshold:.15});
  document.querySelectorAll('.hm').forEach(function(x){vis.observe(x)});
  document.querySelectorAll('section:not(#hello) h2,section:not(#hello) .lead,.photo,.about>div:last-child,.box,.pc,.row,section:not(#hello) .btns').forEach(function(x){
    var k=Array.prototype.indexOf.call(x.parentNode.children,x);
    x.classList.add('rv');x.style.setProperty('--d',(k%6)*90+'ms');vis.observe(x);
  });
  var cp=document.getElementById('copy');
  cp.addEventListener('click',function(){try{navigator.clipboard.writeText('you@example.com')}catch(e){}cp.textContent='Copied';setTimeout(function(){cp.textContent='Copy email'},1800)});
})();
</script>
</body>
</html>

````
