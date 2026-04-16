"use client";
import { createClient } from "@/lib/supabase/client";

export default function AdminNav() {
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <nav className="bg-brand-charcoal px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">🌱</span>
          <span className="font-display text-lg text-white">cheerful</span>
          <span className="font-body text-xs text-white/40 bg-white/10 px-2 py-1 rounded-full ml-2">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="/admin" className="font-body text-sm text-white/60 hover:text-white transition-colors">
            Overview
          </a>
          <a href="/admin/users" className="font-body text-sm text-white/60 hover:text-white transition-colors">
            Users
          </a>
          <a href="/admin/donations" className="font-body text-sm text-white/60 hover:text-white transition-colors">
            Donations
          </a>
          <a href="/dashboard" className="font-body text-sm text-white/40 hover:text-white transition-colors">
            Back to app
          </a>
          <button
            onClick={handleSignOut}
            className="font-body text-sm text-white/40 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}