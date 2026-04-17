"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function handleSignUp() {
  const sanitizedEmail = email.trim().toLowerCase();
  const sanitizedPassword = password.trim();

  if (!sanitizedEmail || !sanitizedEmail.includes("@")) {
    setMessage("Please enter a valid email address.");
    return;
  }

  if (sanitizedPassword.length < 8) {
    setMessage("Password must be at least 8 characters.");
    return;
  }

  setLoading(true);
  const { error } = await supabase.auth.signUp({
    email: sanitizedEmail,
    password: sanitizedPassword,
  });

  if (error) {
    setMessage(error.message);
  } else {
    setMessage("Check your email to confirm your account, then log in to continue setup.");
  }
  setLoading(false);
}

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-sm">
        <div className="text-center mb-8">
          <span className="text-4xl">🌱</span>
          <h1 className="font-display text-3xl text-brand-green mt-3 mb-1">Join Cheerful</h1>
          <p className="font-body text-sm text-brand-charcoal/60">Make life full, one purchase at a time.</p>
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
              placeholder="at least 8 characters"
              className="w-full border border-brand-mint/40 rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-green"
            />
          </div>

          {message && (
            <p className="font-body text-sm text-brand-green bg-brand-mint/20 rounded-xl px-4 py-3">
              {message}
            </p>
          )}

          <Button
            variant="primary"
            className="w-full justify-center"
            onClick={handleSignUp}
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </div>

        <p className="font-body text-sm text-center text-brand-charcoal/50 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-brand-green hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
}