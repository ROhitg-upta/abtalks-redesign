# PROMPTS.md — ABTalks Redesign
## AI Usage Log | ABTalks Vibe Code Hackathon

---

## Prompt 1 — Project Planning & Architecture
**Tool:** Claude
**Prompt:** "Hackathon problem statement 1 hai — ABTalks redesign. 3 pages banana hai: Landing (/), Dashboard (/dashboard), Day page (/day/12). Mobile first 390px. Light clean premium theme. Unique idea — GitHub style heatmap. Stack: Vite + React + React Router + Framer Motion. Full plan banao."
**Output:** Complete page structure, color system, build order, feature list.

---

## Prompt 2 — Mock Data
**Tool:** Claude
**Prompt:** "ABTalks redesign ke liye complete data.json banao jisme student profile, 60 days curriculum, leaderboard, tracks, testimonials, platform stats ho. Realistic mocked data chahiye, including an empty/new-student state for edge case testing."
**Output:** src/data/data.json — 60 days with GitHub/LinkedIn submission fields per day, leaderboard entries, 3 tracks, testimonials, badges array.

---

## Prompt 3 — Design System
**Tool:** Claude
**Prompt:** "World class design system banao src/index.css mein. Inter + Bricolage Grotesque fonts, premium color tokens, button variants, card styles, animations, gradient text. Senior developer level."
**Output:** Complete CSS design system with tokens, utilities, animations. Later extended with CSS custom properties (--primary, --surface, --border, --muted, --bg) to support dark mode across the entire app.

---

## Prompt 4 — App Routing
**Tool:** Claude
**Prompt:** "App.jsx mein React Router setup karo — 3 routes: /, /dashboard, /day/:dayNum"
**Output:** BrowserRouter with Routes configured for all three required pages.

---

## Prompt 5 — Navbar Component
**Tool:** Claude
**Prompt:** "Navbar banao jisme scroll pe glass morphism effect ho, logo, desktop nav links, sign in/start free buttons, aur mobile fullscreen menu overlay ho."
**Output:** src/components/Navbar.jsx — responsive navbar with scroll-based blur effect and animated mobile menu. Later refined to a clean "AB TALKS" wordmark logo (no icon box) and functional nav links (Tracks/Community scroll to sections, Leaderboard routes to Dashboard).

---

## Prompt 6 — Hero Section
**Tool:** Claude
**Prompt:** "Landing page ka Hero section banao — centered minimal layout. Badge, bold gradient headline, subtitle, CTA buttons, stats bar. Framer Motion staggered fade-up animations."
**Output:** Hero section inside src/pages/Landing.jsx with animated entrance sequence.

---

## Prompt 7 — Tracks Section
**Tool:** Claude
**Prompt:** "Tracks section banao Landing page pe using data.json tracks array — custom SVG icons per track, theme colors, topic chips, student count. Dark-mode compatible using alpha/rgba overlay colors instead of solid hex."
**Output:** src/components/Tracks.jsx — 3 track cards (Web Dev / DSA / AI-ML) with distinct accent colors that work in both light and dark themes.

---

## Prompt 8 — How It Works (Timeline redesign)
**Tool:** Claude
**Prompt:** "How It Works section ko premium banao — plain 3-card grid ki jagah vertical timeline with connected dot markers, custom SVG icons, single-hue color progression for a cohesive premium feel."
**Output:** src/components/HowItWorks.jsx — redesigned as a connected vertical timeline (icon markers + line), replacing the initial grid layout for a more distinctive, professional look.

---

## Prompt 9 — Testimonials Section
**Tool:** Claude
**Prompt:** "Testimonials section banao — student quotes, star ratings, unified brand-accent avatars, dark-mode compatible."
**Output:** src/components/Testimonials.jsx — social proof cards with 5-star ratings and consistent brand-colored avatars.

---

## Prompt 10 — Footer + Final CTA
**Tool:** Claude
**Prompt:** "Landing page ke liye final CTA section aur footer banao."
**Output:** src/components/Footer.jsx — repeat CTA, wordmark logo, nav links, copyright.

---

## Prompt 11 — Dashboard: Stat Cards
**Tool:** Claude
**Prompt:** "Student Dashboard banao — greeting header, streak/progress/rank stat cards with custom SVG icons (no emoji), refined multi-tone accent palette, edge-case handling for new/zero-data students."
**Output:** src/pages/Dashboard.jsx — professional stat cards with icon badges, gradient accent bars, and a percentile badge on the rank card ("Top X%").

---

## Prompt 12 — Streak Heatmap (Unique Feature)
**Tool:** Claude
**Prompt:** "GitHub-style 60-day contribution heatmap banao — color coded by status, hover tooltip, staggered entrance animation, responsive grid."
**Output:** src/components/StreakHeatmap.jsx — our thoughtful unique idea addressing the "improve student experience" requirement.

---

## Prompt 13 — Badges & Realistic Leaderboard
**Tool:** Claude
**Prompt:** "Leaderboard ko realistic banao — top 3 podium, phir current user ke aas-paas ke ranks (upar aur neeche dono), beech ke skipped ranks ke liye divider, smoother XP/streak gaps taaki genuine platform jaisa lage."
**Output:** src/components/AchievementsSection.jsx — contextual leaderboard pattern (top 3 + "···" divider + neighboring ranks), similar to LeetCode/Codeforces standings.

---

## Prompt 14 — Day Challenge Page (Full Redesign)
**Tool:** Claude
**Prompt:** "Day Challenge page ko pro-level redesign karo — custom SVG icons (GitHub, LinkedIn, check, clock, lock) emoji ki jagah, progress bar, icon-prefixed form inputs, wordmark logo, fully dark-mode compatible."
**Output:** src/pages/DayChallenge.jsx — task detail, requirements checklist, submission form, and 3 states (locked / pending / completed) with a professional, emoji-free visual language consistent with the rest of the app.

---

## Prompt 15 — Dark Mode Support
**Tool:** Claude
**Prompt:** "Poore app ko dark mode compatible banao — hardcoded hex colors ko CSS custom properties se replace karo taaki theme toggle pe sab kuch consistently switch ho."
**Output:** Systematic pass across all components replacing hardcoded colors with var(--primary), var(--surface), var(--border), var(--muted), var(--bg).

---

## Notes
- All mock data lives in a single `src/data/data.json` file as permitted by the problem statement.
- No backend, authentication, or database used — all state is client-side (React useState) for the submission form demo.
- Mobile-first throughout — every component tested and adjusted for the 390px judging viewport.
- Iterative debugging (routing gaps, CSS specificity conflicts, encoding issues) was resolved collaboratively across the build — reflected in the incremental git commit history.