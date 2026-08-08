# PROMPTS.md — ABTalks Redesign
## AI Usage Log | ABTalks Vibe Code Hackathon

---

## Prompt 1 — Project Planning & Architecture
**Tool:** Claude
**Prompt:**
"Hackathon problem statement 1 hai — ABTalks redesign. 3 pages banana hai: Landing (/), Dashboard (/dashboard), Day page (/day/12). Mobile first 390px. Light clean premium theme. Unique idea — GitHub style heatmap. Stack: Vite + React + React Router + Framer Motion. Full plan banao."

**Output:** Complete page structure, color system, build order, feature list planned.

---

## Prompt 2 — Mock Data
**Tool:** Claude
**Prompt:**
"ABTalks redesign ke liye complete data.json banao jisme student profile, 60 days curriculum, leaderboard, tracks, testimonials, platform stats ho. Realistic mocked data chahiye, including an empty/new-student state for edge case testing."

**Output:** src/data/data.json — 60 days with GitHub/LinkedIn submission fields per day, 8 leaderboard entries, 3 tracks, testimonials, badges array.

---

## Prompt 3 — Design System
**Tool:** Claude
**Prompt:**
"World class design system banao src/index.css mein. Inter + Bricolage Grotesque fonts, premium color tokens, button variants, card styles, animations, gradient text. Senior developer level, light theme only."

**Output:** Complete CSS design system with tokens, utilities, animations.

---

## Prompt 4 — App Routing
**Tool:** Claude
**Prompt:**
"App.jsx mein React Router setup karo — 3 routes: /, /dashboard, /day/:dayNum"

**Output:** BrowserRouter with Routes configured for all three required pages.

---

## Prompt 5 — Navbar Component
**Tool:** Claude
**Prompt:**
"Navbar banao jisme scroll pe glass morphism effect ho, logo, desktop nav links, sign in/start free buttons, aur mobile fullscreen menu overlay ho. Dashboard ke liye alag simplified navbar variant bhi chahiye."

**Output:** src/components/Navbar.jsx — responsive navbar with scroll-based blur effect and animated mobile menu.

---

## Prompt 6 — Hero Section
**Tool:** Claude
**Prompt:**
"Landing page ka Hero section banao — centered minimal layout. Badge, bold gradient headline, subtitle, CTA buttons, aur stats bar (students, days completed, challenge length). Framer Motion staggered fade-up animations use karo."

**Output:** Hero section inside src/pages/Landing.jsx with animated entrance sequence.

---

## Prompt 7 — How It Works Section
**Tool:** Claude
**Prompt:**
"3-step 'How it works' section banao — pick track, ship daily, prove publicly. Scroll-triggered animations, mobile pe single column stack."

**Output:** src/components/HowItWorks.jsx

---

## Prompt 8 — Testimonials Section
**Tool:** Claude
**Prompt:**
"Social proof section banao 3 student testimonials ke saath — quote, name, role, avatar initials in gradient circle. Card-based layout."

**Output:** src/components/Testimonials.jsx

---

## Prompt 9 — Footer + Final CTA
**Tool:** Claude
**Prompt:**
"Landing page ke liye final CTA section aur footer banao — repeat CTA, brand logo, nav links, copyright."

**Output:** src/components/Footer.jsx

---

## Prompt 10 — Dashboard Top Section
**Tool:** Claude
**Prompt:**
"Student Dashboard banao — greeting header (personalized by name), 3-card row for current streak, overall progress (animated bar), aur rank/standing. Sabhi cards mein empty-state handle karo naye student ke liye (zero streak, no rank). Today's Task card bhi chahiye jo /day/:dayNum route pe le jaye."

**Output:** src/pages/Dashboard.jsx — top section with edge-case-aware streak, progress, and rank cards.

---

## Prompt 11 — Streak Heatmap (Unique Feature)
**Tool:** Claude
**Prompt:**
"GitHub-style 60-day contribution heatmap banao Dashboard ke liye — color coded by status (completed/missed/pending/upcoming), hover pe day ka detail tooltip dikhe, staggered entrance animation, mobile pe responsive grid columns."

**Output:** src/components/StreakHeatmap.jsx — this is our thoughtful unique idea addressing the "improve student experience" requirement.

---

## Prompt 12 — Badges & Leaderboard Section
**Tool:** Claude
**Prompt:**
"Achievements section banao — earned/locked badges list, aur leaderboard with top 3 medal emojis, current user ka row highlighted. Empty state for zero badges."

**Output:** src/components/AchievementsSection.jsx

---

## Prompt 13 — Day Challenge Page
**Tool:** Claude
**Prompt:**
"Day Challenge page banao (/day/:dayNum) — task title, description, requirements list, aur submission form with GitHub URL + LinkedIn URL inputs. Handle 3 states: locked (upcoming day), pending (show form), completed (show submitted links with edit option). useParams se dynamic day number read karo."

**Output:** src/pages/DayChallenge.jsx — complete submission flow covering all required edge cases (locked day, in-progress, completed).

---

## Notes
- All mock data is stored in a single `src/data/data.json` file as permitted by the problem statement.
- No backend, authentication, or database was used — all state is client-side (React useState) for the submission form demo.
- Design theme kept consistently light throughout (no dark sections) for visual cohesion across all 3 pages.
- Mobile-first approach followed throughout — every component tested and adjusted for 390px viewport.