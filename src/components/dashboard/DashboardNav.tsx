"use client";
import { createClient } from "@/lib/supabase/client";

interface DashboardNavProps {
  fullName: string | null;
}

export default function DashboardNav({ fullName }: DashboardNavProps) {
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <nav className="bg-white border-b border-brand-mint/20 px-4 md:px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌱</span>
          <span className="font-display text-lg text-brand-green">cheerful</span>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center gap-2 bg-brand-cream rounded-full px-3 md:px-4 py-2">
            <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
              {fullName ? fullName[0].toUpperCase() : "?"}
            </div>
            <span className="font-body text-sm text-brand-charcoal hidden sm:block">
              {fullName ?? "Welcome"}
            </span>
          </div>
          <button
            onClick={handleSignOut}
            className="font-body text-sm text-brand-charcoal/50 hover:text-brand-charcoal transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}