const BASE_URL = "https://partners.every.org/v0.2";
const API_KEY = process.env.NEXT_PUBLIC_EVERY_ORG_API_KEY;

export interface Charity {
  ein: string;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  coverImageUrl: string | null;
  websiteUrl: string | null;
  tags: string[];
}

export async function searchCharities(query: string): Promise<Charity[]> {
  if (!query || query.length < 2) return [];

  const res = await fetch(
    `${BASE_URL}/search/${encodeURIComponent(query)}?apiKey=${API_KEY}&take=12`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return [];

  const data = await res.json();

  return (data.nonprofits ?? []).map((n: any) => ({
    ein: n.ein ?? n.slug,
    name: n.name,
    slug: n.slug,
    description: n.description ?? null,
    logoUrl: n.logoUrl ?? null,
    coverImageUrl: n.coverImageUrl ?? null,
    websiteUrl: n.websiteUrl ?? null,
    tags: n.tags ?? [],
  }));
}

export async function getFeaturedCharities(): Promise<Charity[]> {
  const categories = ["health", "education", "environment", "hunger", "animals"];
  const results = await Promise.all(
    categories.map((cat) =>
      fetch(
        `${BASE_URL}/search/${cat}?apiKey=${API_KEY}&take=2`,
        { next: { revalidate: 3600 } }
      ).then((r) => r.json())
    )
  );

  return results
    .flatMap((r) => r.nonprofits ?? [])
    .map((n: any) => ({
      ein: n.ein ?? n.slug,
      name: n.name,
      slug: n.slug,
      description: n.description ?? null,
      logoUrl: n.logoUrl ?? null,
      coverImageUrl: n.coverImageUrl ?? null,
      websiteUrl: n.websiteUrl ?? null,
      tags: n.tags ?? [],
    }));
}

export async function getCharityBySlug(slug: string): Promise<Charity | null> {
  console.log("Fetching slug:", slug);
  
  const res = await fetch(
    `${BASE_URL}/nonprofit/${slug}?apiKey=${API_KEY}`,
    { next: { revalidate: 3600 } }
  );

  console.log("Response status:", res.status);
  console.log("Response ok:", res.ok);

  if (!res.ok) return null;

  const data = await res.json();
  console.log("Data:", JSON.stringify(data).slice(0, 200));
  const n = data.data?.nonprofit;

  if (!n) return null;

  return {
    ein: n.ein ?? n.slug,
    name: n.name,
    slug: n.slug,
    description: n.description ?? null,
    logoUrl: n.logoUrl ?? null,
    coverImageUrl: n.coverImageUrl ?? null,
    websiteUrl: n.websiteUrl ?? null,
    tags: n.tags ?? [],
  };
}