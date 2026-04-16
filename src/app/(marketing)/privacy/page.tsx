import LegalLayout from "@/components/layout/LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="April 1, 2026">
      <div className="space-y-8 font-body text-brand-charcoal/80 leading-relaxed">

        <section>
          <h2 className="font-display text-2xl text-brand-charcoal mb-3">Overview</h2>
          <p>
            Cheerful ("we," "us," or "our") is a registered 501(c)(3) nonprofit that helps
            people donate spare change from everyday purchases to the causes they love.
            This Privacy Policy explains how we collect, use, and protect your information
            when you use our platform.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-brand-charcoal mb-3">Information We Collect</h2>
          <p className="mb-3">We collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Account information</strong> — your name and email address when
              you create an account.
            </li>
            <li>
              <strong>Financial data</strong> — transaction amounts from your linked
              bank account, accessed read-only through Plaid. We never see your full
              account number, balance, or personal banking credentials.
            </li>
            <li>
              <strong>Giving preferences</strong> — the charity you select and your
              round-up history.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl text-brand-charcoal mb-3">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To calculate and process your monthly round-up donations</li>
            <li>To send you donation receipts and account notifications</li>
            <li>To improve the Cheerful platform and user experience</li>
            <li>To comply with legal and regulatory requirements</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl text-brand-charcoal mb-3">How We Protect Your Data</h2>
          <p>
            We use industry-standard encryption to protect your data in transit and at
            rest. Bank connections are handled by Plaid, a SOC 2 Type II certified
            financial data platform used by thousands of apps including Venmo, Robinhood,
            and Coinbase. We never store your banking credentials.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-brand-charcoal mb-3">Data Sharing</h2>
          <p className="mb-3">
            We do not sell your personal information. We share data only with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Plaid</strong> — to connect your bank account and read
              transaction amounts
            </li>
            <li>
              <strong>Every.org</strong> — to process donations to your chosen charity
            </li>
            <li>
              <strong>Resend</strong> — to send you email receipts
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl text-brand-charcoal mb-3">Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal data
            at any time by contacting us at{" "}
            <a href="mailto:privacy@cheerful.org" className="text-brand-green hover:underline">
              privacy@cheerful.org
            </a>
            . You may also disconnect your bank account or delete your account at any
            time from your dashboard.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-brand-charcoal mb-3">Contact</h2>
          <p>
            Questions about this policy? Reach us at{" "}
            <a href="mailto:privacy@cheerful.org" className="text-brand-green hover:underline">
              privacy@cheerful.org
            </a>
            .
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}