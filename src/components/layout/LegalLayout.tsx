import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-10">
          <p className="font-body text-sm text-brand-green uppercase tracking-widest mb-3">
            Legal
          </p>
          <h1 className="font-display text-4xl text-brand-charcoal mb-3">{title}</h1>
          <p className="font-body text-sm text-brand-charcoal/40">
            Last updated: {lastUpdated}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-10 prose prose-sm max-w-none">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}