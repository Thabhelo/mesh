import PageLayout from '../components/PageLayout';

export default function Terms() {
  return (
    <PageLayout>
      <section className="container py-24">
        <div className="max-w-3xl space-y-8">
          <header className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Terms of Service</h1>
            <p className="text-sm text-muted-foreground">
              Last updated: November 25, 2025
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              These Terms of Service (&quot;Terms&quot;) govern your use of the Mesh website and
              your interactions with us about the Mesh platform. By accessing this site or
              contacting us, you agree to these Terms.
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">1. Who Mesh Is For</h2>
            <p className="text-muted-foreground leading-relaxed">
              Mesh is designed for public safety stakeholders, including agencies, policymakers,
              and technology partners. The site is informational and does not provide emergency
              response services or 911 handling.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">2. Website Use</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to use this website only for lawful purposes and in a manner that does not:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Misrepresent your identity or affiliation.</li>
              <li>Attempt to gain unauthorized access to Mesh systems or data.</li>
              <li>Interfere with the security, availability, or performance of the site.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">3. No Emergency Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Mesh is not a replacement for 911 or any emergency dispatch system. If you are
              experiencing an emergency, call your local emergency number immediately. Information
              on this site is for planning, evaluation, and partnership discussions only.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">4. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this site, including text, visuals, logos, and layouts, is owned by
              Mesh or its licensors and is protected by applicable intellectual property laws. You
              may not copy, modify, or redistribute this content without prior written permission,
              except for limited, non-commercial use such as internal evaluation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">5. Feedback</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you choose to share feedback, ideas, or suggestions about Mesh, you agree that we
              may use that input without restriction or obligation to you, including to improve the
              platform and our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">6. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Mesh site may reference third-party tools, data sources, or integrations. Those
              services are governed by their own terms and privacy policies. Mesh is not responsible
              for third-party content or practices.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">7. Disclaimers</h2>
            <p className="text-muted-foreground leading-relaxed">
              The website and its content are provided &quot;as is&quot; without warranties of any
              kind, whether express or implied. To the maximum extent permitted by law, Mesh
              disclaims all warranties, including implied warranties of merchantability, fitness for
              a particular purpose, and non-infringement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by law, Mesh and its team will not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising out of or
              related to your use of this website or reliance on its content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">9. Changes to These Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms from time to time. When we do, we will update the
              &quot;Last updated&quot; date at the top of this page. Continued use of the site
              after changes become effective constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">10. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms or about Mesh, contact us at:
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


