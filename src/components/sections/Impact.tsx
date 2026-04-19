"use client";
import { useState } from "react";

export default function Impact() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleJoin() {
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list! We'll be in touch soon. 🌱");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section id="impact" className="py-24 px-6 bg-brand-green">
      <div className="max-w-6xl mx-auto text-center">
        <p className="font-body text-sm font-medium text-brand-mint uppercase tracking-widest mb-4">Our mission</p>
        <h2 className="font-display text-4xl md:text-6xl text-white mb-6 max-w-3xl mx-auto">
          Make life full.
        </h2>
        <p className="font-body text-lg text-white/70 max-w-xl mx-auto mb-12 leading-relaxed">
          Inspired by the idea that generosity should be effortless — for everyone,
          every day. Not just on giving Tuesday.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
          {[
            { value: "100%", label: "of every round-up goes to your charity" },
            { value: "0%", label: "in fees — ever" },
            { value: "501(c)(3)", label: "registered nonprofit" },
          ].map((item) => (
            <div key={item.label} className="bg-white/10 rounded-2xl p-6">
              <p className="font-display text-3xl text-white font-bold mb-1">{item.value}</p>
              <p className="font-body text-sm text-white/60">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 max-w-lg mx-auto">
          <h3 className="font-display text-2xl text-brand-charcoal mb-2">Join the waitlist</h3>
          <p className="font-body text-sm text-brand-charcoal/60 mb-6">
            Be the first to know when we launch.
          </p>

          {status === "success" ? (
            <div className="bg-brand-mint/20 border border-brand-mint/40 rounded-xl px-4 py-4">
              <p className="font-body text-sm text-brand-green font-medium">{message}</p>
            </div>
          ) : (
            <>
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setStatus("idle");
                    setMessage("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                  placeholder="your@email.com"
                  className="flex-1 border border-brand-mint/40 rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-brand-green"
                />
                <button
                  onClick={handleJoin}
                  disabled={status === "loading"}
                  className="bg-brand-green text-white font-body text-sm px-6 py-3 rounded-xl hover:bg-brand-mint hover:text-brand-charcoal transition-all disabled:opacity-50"
                >
                  {status === "loading" ? "Joining..." : "Join"}
                </button>
              </div>
              {status === "error" && (
                <p className="font-body text-xs text-red-500 mt-2 text-left">{message}</p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}