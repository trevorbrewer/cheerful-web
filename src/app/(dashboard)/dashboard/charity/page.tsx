import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { searchCharities, getFeaturedCharities } from "@/lib/everyorg";
import DashboardNav from "@/components/dashboard/DashboardNav";
import SearchBar from "@/components/charity/SearchBar";
import CharityGrid from "@/components/charity/CharityGrid";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function CharityBrowsePage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, selected_charity_id")
    .eq("id", user.id)
    .single();

  const { q } = await searchParams;
  const charities = q
    ? await searchCharities(q)
    : await getFeaturedCharities();

  return (
    <div className="min-h-screen bg-brand-cream">
      <DashboardNav fullName={profile?.full_name} />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          
           <a href="/dashboard"
            className="font-body text-sm text-brand-charcoal/50 hover:text-brand-charcoal mb-4 inline-block"
          >
            &larr; Back to dashboard
          </a>
          <h1 className="font-display text-3xl text-brand-charcoal mb-2">
            Choose your cause.
          </h1>
          <p className="font-body text-sm text-brand-charcoal/50">
            Search over 1.5 million verified nonprofits. You can change this anytime.
          </p>
        </div>

        <div className="mb-8">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>

        {!q && (
          <p className="font-body text-sm text-brand-charcoal/50 mb-6">
            Featured charities — or search for any cause above.
          </p>
        )}

        {q && (
          <p className="font-body text-sm text-brand-charcoal/50 mb-6">
            Showing results for <span className="text-brand-charcoal font-medium">"{q}"</span>
          </p>
        )}

        <Suspense fallback={
          <div className="text-center py-16">
            <p className="font-body text-brand-charcoal/50">Loading charities...</p>
          </div>
        }>
          <CharityGrid
            charities={charities}
            currentCharityId={profile?.selected_charity_id ?? null}
          />
        </Suspense>
      </main>
    </div>
  );
}