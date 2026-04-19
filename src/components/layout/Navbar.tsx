"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/90 backdrop-blur-sm border-b border-brand-mint/30">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="/" className="flex items-center gap-2">
        <span className="text-2xl">🌱</span>
        <span className="font-display text-xl text-brand-green font-bold">cheerful</span>
      </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="font-body text-sm text-brand-charcoal hover:text-brand-green transition-colors">How it works</a>
          <a href="#charities" className="font-body text-sm text-brand-charcoal hover:text-brand-green transition-colors">Charities</a>
          <a href="#impact" className="font-body text-sm text-brand-charcoal hover:text-brand-green transition-colors">Impact</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="/login">
            <Button variant="ghost" className="text-sm">Log in</Button>
          </a>
          <a href="/signup">
            <Button variant="primary" className="text-sm">Get started</Button>
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-brand-charcoal transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-brand-charcoal transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-brand-charcoal transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-brand-cream border-t border-brand-mint/30 px-6 py-6 flex flex-col gap-4">
          <a href="#how-it-works" className="font-body text-sm text-brand-charcoal" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#charities" className="font-body text-sm text-brand-charcoal" onClick={() => setMenuOpen(false)}>Charities</a>
          <a href="#impact" className="font-body text-sm text-brand-charcoal" onClick={() => setMenuOpen(false)}>Impact</a>
          <div className="flex flex-col gap-3 pt-4 border-t border-brand-mint/30">
            <a href="/login">
              <Button variant="ghost" className="w-full justify-center">Log in</Button>
            </a>
            <a href="/signup">
              <Button variant="primary" className="w-full justify-center">Get started</Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}