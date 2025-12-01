# Workflow (Classroom + Pika + Vercel)

## Google Classroom
- Post one assignment every ~1.5–2 weeks; attach the universal /15 rubric.
- Paste the site URL for the assignment (`/a1`…`/a7`, `/final-portfolio`) into the GC post. Add `gcUrl` in MDX if you want a return button.
- Remind students: daily Pika log (1–2 sentences), submit via GC with Docs history visible.
- Use weekly videos to set expectations and highlight tips (outline in `resources/weekly-video-outline.mdx`).

## Pika (attendance/authenticity)
- Daily check-in is required; mention it in every assignment.
- Encourage students to attach drafts/process notes; supports authenticity and rubric Criterion 3.

## Deploys (Vercel)
- Project root: `web/`; Build: `npm run build`; Output: `.next`.
- No env vars required now. Deploy on push to `main`.
- Confirm build logs show `[content] loaded ...` and `[static-params] slugs [...]` to ensure MDX was read.

## Editing flow
1) Update MDX in `web/content/...`. If changing assignment wording, mirror into `assignments/*.txt` for GC copy/paste.
2) Optional: add/update `gcUrl` frontmatter after GC post exists.
3) Run `cd web && npm run build`; fix any errors.
4) Commit/push to `main`; Vercel redeploys.

## New materials
- Add templates or guides under `resources/` (MDX) and, if needed, in root `resources/` for text copies.
- Update `expectations_map.md` if coverage shifts; keep weights aligned unless instructed otherwise.
