import LegalLayout from "@/components/layout/LegalLayout";

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="April 1, 2026">
      <div className="space-y-8 font-body text-brand-charcoal/80 leading-relaxed">

        <section>
          <h2 className="font-display text-2xl text-brand-charcoal mb-3">Agreement</h2>
          <p>
            By creating a Cheerful account you agree to these Terms of Service.
            Cheerful is a registered 501(c)(3) nonprofit organization. Our platform
            rounds up your everyday purchases and donates the spare change to a
            nonprofit of your choice.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-brand-charcoal mb-3">Your Account</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must be at least 18 years old to create an account</li>
            <li>You are responsible for maintaining the security of your account</li>
            <li>You must provide accurate information when creating your account</li>
            <li>One account per person</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl text-brand-charcoal mb-3">How Round-Ups Work</h2>
          <p className="mb-3">
            When you link a bank account, Cheerful reads your transaction amounts
            through Plaid and calculates the difference between each transaction and
            the next whole dollar. These round-ups accumulate throughout the month.
          </p>
          <p>
            On the 1st of each month, 92% of your accumulated round-ups are sent to
            your chosen charity via Every.org. Cheerful retains 8% to cover operating
            costs including payment processing, platform maintenance, and compliance.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-brand-charcoal mb-3">Fees</h2>
          <p>
            Cheerful retains 8% of each monthly round-up total to cover operating
            expenses. There are no other fees. We will always be transparent about
            our fee structure.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-brand-charcoal mb-3">Donations</h2>
          <p className="mb-3">
            Donations are processed through Every.org, a registered 501(c)(3)
            nonprofit. Donations are generally tax-deductible to the extent permitted
            by law — consult your tax advisor for specifics.
          </p>
          <p>
            Cheerful does not guarantee the availability of any specific charity.
            If your chosen charity becomes unavailable, we will notify you and ask
            you to select a new one before the next payout.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-brand-charcoal mb-3">Termination</h2>
          <p>
            You may delete your account at any time. Any pending round-ups at the
            time of deletion will be forfeited. We reserve the right to suspend
            accounts that violate these terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-brand-charcoal mb-3">Contact</h2>
          <p>
            Questions about these terms? Reach us at{" "}
            <a href="mailto:legal@cheerful.org" className="text-brand-green hover:underline">
              legal@cheerful.org
            </a>
            .
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}