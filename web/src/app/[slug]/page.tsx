import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getContentBySlug } from "@/lib/content";

type Params = {
  params: { slug: string };
};

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  console.log("[static-params] slugs", slugs);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolved = await Promise.resolve(params as any);
  const item = await getContentBySlug(resolved.slug);
  if (!item) {
    return { title: "Not found | GLD2O" };
  }
  return { title: `${item.meta.title} | GLD2O` };
}

export default async function ContentPage({ params }: Params) {
  const resolved = await Promise.resolve(params as any);
  console.log("[page] params", resolved);
  const item = await getContentBySlug(resolved.slug);
  if (!item) {
    return notFound();
  }

  const { meta, body } = item;

  return (
    <main className="shell">
      <header className="page-header">
        <p className="eyebrow">
          {meta.type === "assignment" ? "Assignment" : "Resource"}
        </p>
        <h1>{meta.title}</h1>
        {meta.gcUrl ? (
          <a
            className="gc-button"
            href={meta.gcUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Classroom
          </a>
        ) : null}
      </header>

      <article className="prose">
        <MDXRemote source={body} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </article>
    </main>
  );
}
