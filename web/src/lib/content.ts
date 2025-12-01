import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import matter from "gray-matter";

export type ContentType = "assignment" | "resource";

export type ContentMeta = {
  id: string;
  slug: string;
  title: string;
  type: ContentType;
  unit?: string; // only for assignments
  gcUrl?: string;
};

export type ContentItem = {
  meta: ContentMeta;
  body: string;
};

function resolveContentRoot() {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, "content"), // when root is set to web/
    path.join(cwd, "web", "content"), // when root is repo root
  ];

  for (const candidate of candidates) {
    if (fsSync.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error(
    `Content directory not found. Tried: ${candidates.join(", ")}`
  );
}

const contentRoot = resolveContentRoot();
const unitsDir = path.join(contentRoot, "units");
const resourcesDir = path.join(contentRoot, "resources");

async function readAssignments(): Promise<ContentItem[]> {
  const assignments: ContentItem[] = [];
  const unitEntries = await fs.readdir(unitsDir, { withFileTypes: true });

  for (const entry of unitEntries) {
    if (!entry.isDirectory()) continue;
    const unitId = entry.name;
    const assignDir = path.join(unitsDir, unitId, "assignments");
    if (!fsSync.existsSync(assignDir)) continue;

    // eslint-disable-next-line no-console
    console.log(`[content] reading assignment from ${assignDir}`);
    const files = await fs.readdir(assignDir);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    for (const file of mdxFiles) {
      const filePath = path.join(assignDir, file);
      const raw = await fs.readFile(filePath, "utf8");
      const parsed = matter(raw);
      const front = parsed.data as Partial<ContentMeta>;
      const slug = front.slug ?? file.replace(/\.mdx$/, "");

      assignments.push({
        meta: {
          id: front.id ?? slug,
          slug,
          title: front.title ?? slug,
          gcUrl: front.gcUrl ?? "",
          unit: front.unit ?? unitId,
          type: "assignment" as const,
        },
        body: parsed.content.trim(),
      });
    }
  }

  return assignments;
}

async function readResources(): Promise<ContentItem[]> {
  // eslint-disable-next-line no-console
  console.log(`[content] reading resource from ${resourcesDir}`);
  const files = await fs.readdir(resourcesDir);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const items = await Promise.all(
    mdxFiles.map(async (file) => {
      const filePath = path.join(resourcesDir, file);
      const raw = await fs.readFile(filePath, "utf8");
      const parsed = matter(raw);
      const front = parsed.data as Partial<ContentMeta>;
      const slug = front.slug ?? file.replace(/\.mdx$/, "");

      return {
        meta: {
          id: front.id ?? slug,
          slug,
          title: front.title ?? slug,
          gcUrl: front.gcUrl ?? "",
          type: "resource" as const,
        },
        body: parsed.content.trim(),
      };
    })
  );

  return items;
}

export async function getAllContent(): Promise<ContentItem[]> {
  const [assignments, resources] = await Promise.all([
    readAssignments(),
    readResources(),
  ]);
  const items = [...assignments, ...resources];
  // eslint-disable-next-line no-console
  console.log(
    `[content] loaded ${assignments.length} assignments, ${resources.length} resources`
  );
  return items;
}

export async function getAllPaths(): Promise<string[][]> {
  const items = await getAllContent();
  const paths: string[][] = [];
  for (const item of items) {
    if (item.meta.type === "assignment" && item.meta.unit) {
      paths.push([item.meta.unit, item.meta.slug]);
    } else {
      paths.push([item.meta.slug]);
    }
  }
  return paths;
}

export async function getContentByRoute(
  parts: string[]
): Promise<ContentItem | null> {
  const items = await getAllContent();
  let found: ContentItem | null = null;

  if (parts.length === 2) {
    const [unit, slug] = parts;
    found =
      items.find(
        (item) =>
          item.meta.type === "assignment" &&
          item.meta.unit === unit &&
          item.meta.slug === slug
      ) ?? null;
  } else if (parts.length === 1) {
    const [slug] = parts;
    found =
      items.find(
        (item) => item.meta.type === "resource" && item.meta.slug === slug
      ) ?? null;
  }

  // eslint-disable-next-line no-console
  console.log(
    `[content] lookup route=${parts.join(
      "/"
    )} found=${Boolean(found)}; assignments=${items
      .filter((i) => i.meta.type === "assignment")
      .map((i) => `${i.meta.unit}/${i.meta.slug}`)
      .join(",")} resources=${items
      .filter((i) => i.meta.type === "resource")
      .map((i) => i.meta.slug)
      .join(",")}`
  );

  return found;
}
