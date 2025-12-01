# GLD2O link-only site

Public, navigation-free pages for GLD2O assignments and resources. Students reach pages only via links you post in Google Classroom; no submissions or sign-in on this site.

## Structure
- `content/assignments/*.mdx` — A1–A7 + final portfolio (frontmatter holds `slug`, `title`, `weight`, `dueWindow`, optional `gcUrl`).
- `content/resources/*.mdx` — rubric, submission guide, checklists, tips.
- `src/app/[slug]/page.tsx` — renders any assignment/resource slug (e.g., `/a1`, `/rubric`).
- `public/robots.txt` — blocks indexing.

## Running locally
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Editing content
1) Open the MDX file in `content/assignments` or `content/resources`.
2) Update frontmatter fields (optional `gcUrl` for an “Open in Google Classroom” button).
3) Edit the Markdown body.  
4) Commit + deploy; URLs stay stable (e.g., `/a3`).

## Building
```bash
npm run build
npm start   # serves production build
```
