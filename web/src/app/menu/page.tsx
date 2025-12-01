import Link from "next/link";
import { getAllContent } from "@/lib/content";

export const dynamic = "force-static";

export const metadata = {
  title: "Menu | GLD2O",
  description: "Teacher navigation for GLD2O links.",
};

export default async function MenuPage() {
  const items = await getAllContent();

  const assignments = items
    .filter((i) => i.meta.type === "assignment")
    .sort((a, b) => a.meta.slug.localeCompare(b.meta.slug));

  const resources = items
    .filter((i) => i.meta.type === "resource")
    .sort((a, b) => a.meta.slug.localeCompare(b.meta.slug));

  const materials = items
    .filter((i) => i.meta.type === "material")
    .sort((a, b) => a.meta.slug.localeCompare(b.meta.slug));

  return (
    <main className="shell">
      <p className="eyebrow">Internal</p>
      <h1>Quick Menu</h1>
      <section style={{ marginTop: "20px" }}>
        <h2>Assignments</h2>
        <ul>
          {assignments.map((item) => (
            <li key={item.meta.slug}>
              <Link href={`/${item.meta.slug}`}>
                {item.meta.slug.toUpperCase()} — {item.meta.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {materials.length ? (
        <section style={{ marginTop: "24px" }}>
          <h2>Materials</h2>
          <ul>
            {materials.map((item) => (
              <li key={item.meta.slug}>
                <Link href={`/${item.meta.slug}`}>
                  {item.meta.slug.toUpperCase()} — {item.meta.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section style={{ marginTop: "24px" }}>
        <h2>Resources</h2>
        <ul>
          {resources.map((item) => (
            <li key={item.meta.slug}>
              <Link href={`/${item.meta.slug}`}>{item.meta.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
