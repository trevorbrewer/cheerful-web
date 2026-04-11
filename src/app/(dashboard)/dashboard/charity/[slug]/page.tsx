import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getCharityBySlug } from "@/lib/everyorg";
import DashboardNav from "@/components/dashboard/DashboardNav";
import ChooseCharityButton from "@/components/charity/ChooseCharityButton";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CharityDetailPage({ params }: PageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, selected_charity_id")
    .eq("id", user.id)
    .single();

  const { slug } = await params;
  const charity = await getCharityBySlug(slug);

  if (!charity) redirect("/dashboard/charity");

  const isCurrentCharity = profile?.selected_charity_id === charity.ein;

  return (
    <div className="min-h-screen bg-brand-cream">
      <DashboardNav fullName={profile?.full_name} />

      <main className="max-w-3xl mx-auto px-6 py-10">
        
        <a href="/dashboard/charity"
          className="font-body text-sm text-brand-charcoal/50 hover:text-brand-charcoal mb-8 inline-block"
        >
          &larr; Back to charities
        </a>

        <div className="bg-white rounded-2xl overflow-hidden mb-6">
          {charity.coverImageUrl && (
            <div className="w-full h-48 relative">
              <Image
                src={charity.coverImageUrl}
                alt={charity.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-brand-cream flex items-center justify-center overflow-hidden flex-shrink-0">
                {charity.logoUrl ? (
                  <Image
                    src={charity.logoUrl}
                    alt={charity.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-3xl">🌱</span>
                )}
              </div>
              <div className="flex-1">
                <h1 className="font-display text-2xl text-brand-charcoal mb-1">
                  {charity.name}
                </h1>
                {charity.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {charity.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-xs bg-brand-mint/20 text-brand-green px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {charity.description && (
              <p className="font-body text-sm text-brand-charcoal/70 leading-relaxed mb-8">
                {charity.description}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 p-6 bg-brand-cream rounded-xl">
              <div>
                <p className="font-body text-xs text-brand-charcoal/50 mb-1">EIN</p>
                <p className="font-body text-sm font-medium text-brand-charcoal">
                  {charity.ein ?? "N/A"}
                </p>
              </div>
              <div>
                <p className="font-body text-xs text-brand-charcoal/50 mb-1">Your contribution</p>
                <p className="font-body text-sm font-medium text-brand-green">92% of round-ups</p>
              </div>
              <div>
                <p className="font-body text-xs text-brand-charcoal/50 mb-1">Website</p>
                {charity.websiteUrl ? (
                  
                    <a href={charity.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-brand-green hover:underline"
                  >
                    Visit site
                  </a>
                ) : (
                  <p className="font-body text-sm text-brand-charcoal/40">N/A</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ChooseCharityButton
                charityId={charity.ein}
                charityName={charity.name}
                isCurrentCharity={isCurrentCharity}
              />
              {charity.websiteUrl && (
                
                  <a href={charity.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-brand-charcoal/50 hover:text-brand-charcoal"
                >
                  Learn more &rarr;
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}