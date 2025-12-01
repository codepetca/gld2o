# Repository Guidelines

## Project Structure & Module Organization
- `course_outline.md` and `final_portfolio_site.md` hold the high-level course flow and final deliverable instructions.
- `assignments/` contains the numbered Google Classroom-ready task sheets; each file is a standalone text block meant for copy/paste.
- `gc_rubric/` and `rubric.md` provide the universal marking scheme (/15) in text and Markdown formats.
- Keep new materials in plain text or Markdown; mirror the existing naming pattern (`NN_assignment_topic.txt`) when adding assignments.

## Build, Test, and Development Commands
- No build pipeline is required; content is static text. Open Markdown locally to spot formatting issues.
- Use `rg "..." assignments` to confirm phrasing or find where a topic is already covered before adding duplicates.
- Run `wc -w <file>` if you need a quick word-count check for length-sensitive instructions.

## Coding Style & Naming Conventions
- Markdown: use `#`/`##` headings, short paragraphs, and hyphen bullets; keep lists numbered where sequence matters.
- Tone: instructional and direct; avoid first person and filler language.
- Formatting: prefer plain ASCII characters; if editing files that already use special punctuation, keep it consistent within that file.
- Filenames: lowercase with underscores; keep the numeric prefix for ordering.

## Testing & Quality Checks
- Read assignments end-to-end to ensure steps are actionable and ordered; confirm deadlines or submission locations are stated.
- Cross-check rubric references so point totals align with `/15`.
- When modifying existing text, compare before/after in a diff viewer to catch accidental deletions of requirements.

## Commit & Pull Request Guidelines
- Commits: use short, imperative summaries such as `Add decision barriers task details` or `Tighten rubric wording`.
- Pull requests: include a brief description of the change, list affected files, and note any instructions that were clarified or added.
- Link to any related issue or classroom request; include screenshots only if formatting changes affect layout.

## Security & Content Hygiene
- Do not add student data, personal identifiers, or external proprietary material.
- Keep links limited to trusted, long-lived resources; prefer descriptive link text over raw URLs.
- Store reusable templates or resources in a dedicated folder (e.g., `resources/`) instead of scattering attachments in assignment files.
