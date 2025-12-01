# Content Model (Next.js site)

Static, link-only site; pages are generated from MDX at build time.

## Assignments
- Location: `web/content/assignments/*.mdx`
- Slugs: `a1`–`a7`, `final-portfolio` (stable; use lowercase/kebab).
- Frontmatter:
  - `id` (string) — usually same as slug.
  - `slug` (string) — URL segment (`/a1`).
  - `title` (string).
  - `gcUrl` (string, optional) — Classroom post link for “Open in Google Classroom” button.
  - `dueWindow` (string) — e.g., “End of Week 2”.
  - `weight` (number) — percent weighting (A1–A6 =10, A7=15, Final=25).
- Body must include: purpose, learning goals, steps, deliverable, submission steps (GC + Pika), success criteria (universal /15 rubric).

## Resources
- Location: `web/content/resources/*.mdx`
- Slugs: `rubric`, `submission-guide`, `reflection-stems`, `resume-cover-letter-tips`, `google-site-checklist`, `weekly-video-outline`.
- Frontmatter: `id`, `slug`, `title`, optional `gcUrl`.
- Body: reusable guidance (rubric, checklists, tips).

## Rendering
- Route pattern: `/[slug]` for assignments/resources; `/menu` for teacher navigation; `/` for “use links in GC”.
- `gcUrl` shows an “Open in Google Classroom” button when present.
- `robots.txt` blocks indexing.
- No student navigation; `/menu` is public but unlinked.

## Adding Pages
1) Create MDX with frontmatter and body in the appropriate folder.
2) Keep slug short, lowercase; avoid spaces.
3) Run `cd web && npm run build` to confirm SSG succeeds.
4) Commit/push; Vercel deploys with root `web/`.
