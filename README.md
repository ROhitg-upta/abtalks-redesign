# ABTalks — Redesigned

A mobile-first redesign of ABTalks, a 60-day coding challenge platform for Indian college students. Built for the ABTalks Vibe Code Hackathon.

**Live:** [add your Vercel URL here]
**Route Map:** `/` · `/dashboard` · `/day/12`

---

## What this is

ABTalks runs a 60-day coding challenge where students pick a track, build something every day, and maintain a public streak by submitting a GitHub commit and a LinkedIn post. This redesign focuses on three core screens:

- **Landing (`/`)** — first impression for a student who's never heard of ABTalks. Explains the challenge, the tracks, and builds trust through social proof.
- **Dashboard (`/dashboard`)** — the daily home screen: current streak, today's task, overall progress, a 60-day contribution heatmap, badges, and leaderboard standing.
- **Day Challenge (`/day/:dayNum`)** — a single day's task detail and submission flow (GitHub + LinkedIn links), with locked / in-progress / completed states.

## Thoughtful addition: the 60-day Streak Heatmap

A GitHub-style contribution grid on the dashboard, color-coded by day status, with a hover tooltip showing that day's task. It turns 60 days of abstract progress into one glanceable visual — the kind of thing that makes a streak feel real.

## Edge cases handled

- **First day / no streak** — a live toggle on the Dashboard ("Preview: New Student") switches the entire dashboard into a zero-state: empty streak, no rank, no badges, blank heatmap. This makes the empty-profile experience directly reachable instead of just existing in code.
- **Empty profile** — same toggle; badges and leaderboard sections show dedicated empty-state messaging instead of breaking or displaying nothing.
- **Locked / future days** — visiting a day that hasn't unlocked yet on `/day/:dayNum` shows a clear locked state instead of an empty form.

## Tech stack

- **Vite + React** — app shell and build tooling
- **React Router** — client-side routing for the three required routes
- **Framer Motion** — entrance animations, hover states, animated progress bars
- **Mocked data** — a single `src/data/data.json` file drives every screen (no backend, auth, or database, per the problem statement's scope)

## Running locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project structure

```
src/
  components/     Navbar, Tracks, HowItWorks, Testimonials, Footer,
                   StreakHeatmap, AchievementsSection
  pages/          Landing, Dashboard, DayChallenge
  data/           data.json — all mocked student, track, and leaderboard data
```

See `PROMPTS.md` for the full AI-assisted build log.