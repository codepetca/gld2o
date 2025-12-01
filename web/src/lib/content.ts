import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import matter from "gray-matter";

export type ContentType = "assignment" | "resource" | "material";

export type ContentMeta = {
  id: string;
  slug: string;
  title: string;
  type: ContentType;
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
const assignmentsDir = path.join(contentRoot, "assignments");
const resourcesDir = path.join(contentRoot, "resources");
const materialsDir = path.join(contentRoot, "materials");

async function readContentFromDir(
  dir: string,
  type: ContentType
): Promise<ContentItem[]> {
  // Debug log to confirm paths during build/runtime
  // eslint-disable-next-line no-console
  console.log(`[content] reading ${type} from ${dir}`);
  const files = await fs.readdir(dir);

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
        type,
      };

      return { meta, body: parsed.content.trim() };
    })
  );

  return items;
}

export async function getAllContent(): Promise<ContentItem[]> {
  const [assignments, materials, resources] = await Promise.all([
    readContentFromDir(assignmentsDir, "assignment"),
    readContentFromDir(materialsDir, "material").catch(() => []),
    readContentFromDir(resourcesDir, "resource"),
  ]);
  const items = [...assignments, ...materials, ...resources];
  // eslint-disable-next-line no-console
  console.log(
    `[content] loaded ${assignments.length} assignments, ${materials.length} materials, ${resources.length} resources`
  );
  return items;
}

export async function getAllSlugs(): Promise<string[]> {
  const items = await getAllContent();
  return items.map((item) => item.meta.slug);
}

export async function getContentBySlug(
  slug: string
): Promise<ContentItem | null> {
  const items = await getAllContent();
  const found = items.find((item) => item.meta.slug === slug) ?? null;
  // eslint-disable-next-line no-console
  console.log(
    `[content] lookup slug=${slug} found=${Boolean(found)}; slugs=${items
      .map((i) => i.meta.slug)
      .join(",")}`
  );
  return found;
}
