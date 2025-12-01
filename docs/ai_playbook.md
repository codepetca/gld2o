# AI Playbook (GLD2O)

Goal: keep GLD2O course content coherent across Google Classroom and the link-only Next.js site. Use this when asking an AI to edit or extend the project.

## Scope & Tone
- Audience: grade 10 students; instructional, concise, direct; avoid filler and first person.
- Platform: students start in Google Classroom; this site is a public, navigation-light reference.
- Attendance: daily Pika log (1–2 sentences) mentioned in every assignment.
- Rubric: universal /15 (Completion, Thinking/Communication, Workflow/Authenticity); reuse, don’t fork.

## File Layout (repo root)
- `assignments/` — legacy text versions (keep in sync when updating).
- `resources/` — text guides/checklists.
- `web/` — Next.js app (App Router); MDX content in `web/content/assignments` and `web/content/resources`.
- `course_outline.md`, `final_portfolio_site.md`, `expectations_map.md` — teacher-facing references.

## Content Rules
- Keep slugs stable (`a1`…`a7`, `final-portfolio`, resource slugs). Do not rename without strong reason.
- Frontmatter fields for assignments: `id`, `slug`, `title`, `gcUrl` (optional return link), `dueWindow`, `weight`.
- Per-assignment bodies must include: purpose, learning goals, steps, deliverable, submission steps, success criteria. Keep Pika reminder.
- Resources are reusable guides (rubric, submission guide, resume tips, etc.).

## Editing Workflow
1) Update MDX in `web/content/...`; mirror major text changes to `assignments/*.txt` for Classroom copy-paste.
2) If adding a new page: add MDX with frontmatter + body; slug lowercase/kebab; add to `content/assignments` or `content/resources`.
3) For GC return links: set `gcUrl` in frontmatter to the Classroom post URL (optional).
4) Run `cd web && npm run build` locally; fix lint/TypeScript if any.
5) Commit/push to `main`; Vercel builds from `web/` root (build `npm run build`, output `.next`).

## Navigation & Privacy
- Students reach pages via direct URLs from GC; `/menu` is a teacher-only convenience list (public but unlinked).
- `robots.txt` blocks indexing; keep it unless policy changes.

## When extending
- Align new tasks to GLD2O expectations; update `expectations_map.md` if scope changes.
- Keep weights consistent with current scheme unless instructed otherwise.
- Add templates or guides under `resources/`; keep tone and formatting consistent.
