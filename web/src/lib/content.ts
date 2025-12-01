import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export type ContentType = "assignment" | "resource";

export type ContentMeta = {
  id: string;
  slug: string;
  title: string;
  type: ContentType;
  gcUrl?: string;
  dueWindow?: string;
  weight?: number;
};

export type ContentItem = {
  meta: ContentMeta;
  body: string;
};

const contentRoot = path.join(process.cwd(), "content");
const assignmentsDir = path.join(contentRoot, "assignments");
const resourcesDir = path.join(contentRoot, "resources");

async function readContentFromDir(
  dir: string,
  type: ContentType
): Promise<ContentItem[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(dir);
  } catch (err) {
    return [];
  }

  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const items = await Promise.all(
    mdxFiles.map(async (file) => {
      const filePath = path.join(dir, file);
      const raw = await fs.readFile(filePath, "utf8");
      const parsed = matter(raw);
      const front = parsed.data as Partial<ContentMeta>;
      const slug = front.slug ?? file.replace(/\.mdx$/, "");

      const meta: ContentMeta = {
        id: front.id ?? slug,
        slug,
        title: front.title ?? slug,
        gcUrl: front.gcUrl ?? "",
        dueWindow: front.dueWindow,
        weight: front.weight,
        type,
      };

      return { meta, body: parsed.content.trim() };
    })
  );

  return items;
}

export async function getAllContent(): Promise<ContentItem[]> {
  const [assignments, resources] = await Promise.all([
    readContentFromDir(assignmentsDir, "assignment"),
    readContentFromDir(resourcesDir, "resource"),
  ]);
  return [...assignments, ...resources];
}

export async function getAllSlugs(): Promise<string[]> {
  const items = await getAllContent();
  return items.map((item) => item.meta.slug);
}

export async function getContentBySlug(
  slug: string
): Promise<ContentItem | null> {
  const items = await getAllContent();
  return items.find((item) => item.meta.slug === slug) ?? null;
}
