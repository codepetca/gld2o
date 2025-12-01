import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getContentBySlug } from "@/lib/content";

type Params = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const item = await getContentBySlug(params.slug);
  if (!item) {
    return { title: "Not found | GLD2O" };
  }
  return { title: `${item.meta.title} | GLD2O` };
}

export default async function ContentPage({ params }: Params) {
  const item = await getContentBySlug(params.slug);
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
        <div className="meta-row">
          {typeof meta.weight === "number" ? (
            <span className="pill">Weight: {meta.weight}%</span>
          ) : null}
          {meta.dueWindow ? (
            <span className="pill">Due: {meta.dueWindow}</span>
          ) : null}
        </div>
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
