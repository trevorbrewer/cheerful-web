import LegalLayout from "@/components/layout/LegalLayout";

const SECURITY_ITEMS = [
  {
    icon: "🔒",
    title: "Bank-level encryption",
    description:
      "All data is encrypted in transit using TLS 1.2+ and at rest using AES-256 encryption. Your information is never stored unencrypted.",
  },
  {
    icon: "🏦",
    title: "Powered by Plaid",
    description:
      "Bank connections are handled by Plaid, a SOC 2 Type II certified platform trusted by thousands of financial apps. Cheerful never sees your banking credentials.",
  },
  {
    icon: "👁️",
    title: "Read-only access",
    description:
      "Cheerful only reads transaction amounts. We cannot move money, view your balance, or access any account details beyond what's needed to calculate round-ups.",
  },
  {
    icon: "🛡️",
    title: "Row-level security",
    description:
      "Your data is isolated in our database using row-level security policies. No user can ever access another user's data — not even our team without explicit access.",
  },
  {
    icon: "📧",
    title: "Secure authentication",
    description:
      "Accounts are protected with secure password hashing and email verification. We support multi-factor authentication and session management.",
  },
  {
    icon: "🔍",
    title: "Regular security reviews",
    description:
      "We conduct regular reviews of our security practices and dependencies. Critical vulnerabilities are patched within 24 hours of discovery.",
  },
];

export default function SecurityPage() {
  return (
    <LegalLayout title="Security" lastUpdated="April 1, 2026">
      <div className="space-y-8 font-body text-brand-charcoal/80 leading-relaxed">

        <section>
          <p className="text-lg">
            Cheerful handles sensitive financial data. Security is not an afterthought —
            it is built into every layer of our platform.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-6 not-prose">
          {SECURITY_ITEMS.map((item) => (
            <div key={item.title} className="flex items-start gap-4 p-5 bg-brand-cream rounded-xl">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <h3 className="font-display text-lg text-brand-charcoal mb-1">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-brand-charcoal/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2 className="font-display text-2xl text-brand-charcoal mb-3">
            Report a Vulnerability
          </h2>
          <p>
            If you discover a security vulnerability, please report it responsibly
            to{" "}
            <a href="mailto:security@cheerful.org" className="text-brand-green hover:underline">
              security@cheerful.org
            </a>
            . We take all reports seriously and will respond within 48 hours.
            Please do not publicly disclose vulnerabilities before we have had a
            chance to address them.
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}