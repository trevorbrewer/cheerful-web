"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function handleLogin() {
  const sanitizedEmail = email.trim().toLowerCase();
  const sanitizedPassword = password.trim();

  if (!sanitizedEmail || !sanitizedEmail.includes("@")) {
    setMessage("Please enter a valid email address.");
    return;
  }

  setLoading(true);
  const { error } = await supabase.auth.signInWithPassword({
    email: sanitizedEmail,
    password: sanitizedPassword,
  });

  if (error) {
    setMessage(error.message);
  } else {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_complete")
        .eq("id", user.id)
        .single();

      window.location.href = profile?.onboarding_complete
        ? "/dashboard"
        : "/onboarding";
    }
  }
  setLoading(false);
}

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-sm">
        <div className="text-center mb-8">
          <span className="text-4xl">🌱</span>
          <h1 className="font-display text-3xl text-brand-green mt-3 mb-1">Welcome back</h1>
          <p className="font-body text-sm text-brand-charcoal/60">Good to see you again.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="font-body text-sm text-brand-charcoal/70 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-brand-mint/40 rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-green"
            />
          </div>
          <div>
            <label className="font-body text-sm text-brand-charcoal/70 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="your password"
              className="w-full border border-brand-mint/40 rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-green"
            />
          </div>

          {message && (
            <p className="font-body text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">
              {message}
            </p>
          )}

          <Button
            variant="primary"
            className="w-full justify-center"
            onClick={handleLogin}
          >
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </div>

        <p className="font-body text-sm text-center text-brand-charcoal/50 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-brand-green hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}