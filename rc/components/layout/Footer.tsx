export default function Footer() {
  return (
    <footer className="bg-brand-charcoal py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌱</span>
          <span className="font-display text-lg text-white">cheerful</span>
          <span className="font-body text-sm text-white/40 ml-4">Make life full.</span>
        </div>
        <div className="flex gap-8">
          <a href="/privacy" className="font-body text-sm text-white/40 hover:text-white transition-colors">
            Privacy
          </a>
          <a href="/terms" className="font-body text-sm text-white/40 hover:text-white transition-colors">
            Terms
          </a>
          <a href="/security" className="font-body text-sm text-white/40 hover:text-white transition-colors">
            Security
          </a>
          <a href="mailto:hello@cheerful.org" className="font-body text-sm text-white/40 hover:text-white transition-colors">
            Contact
          </a>
        </div>
        <p className="font-body text-xs text-white/30">
          © 2026 Cheerful. A registered 501(c)(3).
        </p>
      </div>
    </footer>
  );
}