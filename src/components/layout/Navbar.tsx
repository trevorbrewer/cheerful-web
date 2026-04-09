import Button from "@/components/ui/Button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/90 backdrop-blur-sm border-b border-brand-mint/30">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          <span className="font-display text-xl text-brand-green font-bold">cheerful</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="font-body text-sm text-brand-charcoal hover:text-brand-green transition-colors">How it works</a>
          <a href="#charities" className="font-body text-sm text-brand-charcoal hover:text-brand-green transition-colors">Charities</a>
          <a href="#impact" className="font-body text-sm text-brand-charcoal hover:text-brand-green transition-colors">Impact</a>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-sm">Log in</Button>
          <Button variant="primary" className="text-sm">Get started</Button>
        </div>
      </div>
    </nav>
  );
}