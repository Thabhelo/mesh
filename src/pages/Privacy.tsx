import PageLayout from '../components/PageLayout';

export default function Privacy() {
  return (
    <PageLayout>
      <section className="container py-24">
        <div className="max-w-3xl space-y-8">
          <header className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">
              Last updated: November 25, 2025
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mesh is built for public safety agencies. We focus on operational intelligence, not
              surveillance. This Privacy Policy explains how we handle information when you visit
              our website or contact us about the Mesh platform.
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              We collect only the information we need to respond to you and improve the Mesh
              platform:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Contact details you provide (name, email, organization, phone number).</li>
              <li>Message content you send through our contact form or email.</li>
              <li>Basic usage information about visits to our site (such as pages viewed and time spent).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the information we collect solely to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Respond to demo requests, partnership outreach, and general questions.</li>
              <li>Operate, maintain, and improve the Mesh website and platform.</li>
              <li>Communicate updates about Mesh when you have asked us to.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">3. How We Do <span className="italic">Not</span> Use Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              Consistent with our values, we do <span className="font-semibold">not</span>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Use facial recognition or biometric identifiers.</li>
              <li>Build individual-level predictive profiles for policing or enforcement.</li>
              <li>Sell your personal information to third parties.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">4. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may share limited information with:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>
                <span className="font-semibold">Service providers</span> who help us host, maintain, or support the website and
                communications, under confidentiality obligations.
              </li>
              <li>
                <span className="font-semibold">Agencies or partners</span> when you explicitly ask us to coordinate a follow-up
                conversation.
              </li>
              <li>
                <span className="font-semibold">Authorities</span> when required to comply with applicable law, regulation, or
                legal process.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">5. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We keep contact and inquiry information only as long as needed to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Respond to your request and maintain a record of our conversation, and</li>
              <li>Comply with legal, regulatory, or contractual obligations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">6. Your Choices</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can contact us at any time to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Request access to, or a copy of, the information you have provided.</li>
              <li>Ask us to correct or delete your contact information where appropriate.</li>
              <li>Opt out of non-essential communications.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">7. Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use reasonable technical and organizational measures to protect the information we
              collect. No system can be perfectly secure, but we design Mesh&apos;s architecture to
              minimize unnecessary data collection and access.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">8. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. When we do, we will update the
              &quot;Last updated&quot; date at the top of this page. Significant changes will be
              communicated through the site or directly when appropriate.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">9. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or how Mesh handles information,
              please contact us at:
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <span className="block">Email: <span className="font-medium">thabheloduve@gmail.com</span></span>
              <span className="block">Phone: <span className="font-medium">+1 (256) 375-4207</span></span>
              <span className="block">Location: Birmingham, Alabama, United States</span>
            </p>
          </section>
        </div>
      </section>
    </PageLayout>
  );
}


