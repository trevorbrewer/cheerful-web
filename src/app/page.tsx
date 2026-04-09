import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-cream p-12 space-y-8">
      <h1 className="font-display text-5xl text-brand-green">Make life full.</h1>
      <p className="font-body text-brand-charcoal text-lg">Cheerful design system preview.</p>

      <div className="flex gap-4 flex-wrap">
        <Button variant="primary">Get Started</Button>
        <Button variant="secondary">Explore Charities</Button>
        <Button variant="ghost">Learn More</Button>
      </div>

      <Card className="max-w-sm">
        <h2 className="font-display text-2xl text-brand-green mb-2">Your Impact</h2>
        <p className="text-brand-charcoal">$12.47 donated this month to Atlanta Food Bank.</p>
      </Card>
    </main>
  );
}