import { NextResponse } from "next/server";

export async function GET() {
  const robots = `
User-agent: *
Allow: /
Allow: /privacy
Allow: /terms
Allow: /security
Disallow: /dashboard
Disallow: /admin
Disallow: /onboarding
Disallow: /api/

Sitemap: https://cheerful.org/sitemap.xml
  `.trim();

  return new NextResponse(robots, {
    headers: { "Content-Type": "text/plain" },
  });
}