import type { Metadata } from "next";
import Link from "next/link";
import { LegalContact, LegalShell } from "@/components/legal/legal-shell";
import { Bullets, H2, P, Strong } from "@/components/blog/prose";
import { legalBySlug } from "@/lib/legal";
import { ADDRESS, OG_IMAGE, SITE } from "@/lib/site";

const page = legalBySlug("terms-of-use")!;

export const metadata: Metadata = {
  title: { absolute: page.metaTitle },
  description: page.metaDescription,
  alternates: { canonical: `/${page.slug}` },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: `${SITE.url}/${page.slug}`,
    type: "website",
    images: OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: page.metaTitle,
    description: page.metaDescription,
  },
};

const LINK =
  "text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent";

export default function Page() {
  return (
    <LegalShell
      page={page}
      intro={
        <>
          <p>
            These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and
            use of whycrew.com (the &ldquo;Site&rdquo;) and any related services
            offered by WhyCrew (&ldquo;WhyCrew,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using the
            Site, you agree to be bound by these Terms. If you do not agree,
            please do not use the Site.
          </p>
          <p className="mt-4">
            These Terms cover use of the Site itself. Any custom SIEM, SOAR, or
            SOC development work WhyCrew performs for a client is separately
            governed by a signed statement of work or services agreement between
            WhyCrew and that client, which takes precedence over these Terms for
            that engagement.
          </p>
        </>
      }
    >
      <H2 id="who-we-are">1. Who We Are</H2>
      <P>
        WhyCrew is a cybersecurity engineering company headquartered in Ontario,
        Canada, that builds custom SIEM and SOC platforms for managed security
        service providers (MSSPs) and regulated enterprises around the world,
        including a proven client base in the EU.
      </P>
      <Bullets
        items={[
          <>
            <Strong>Legal entity name:</Strong> {SITE.legalName}
          </>,
          <>
            <Strong>Registered address:</Strong> {ADDRESS.street},{" "}
            {ADDRESS.locality}, {ADDRESS.region} {ADDRESS.postalCode},{" "}
            {ADDRESS.countryName}
          </>,
          <>
            <Strong>Phone:</Strong> {SITE.phoneDisplay}
          </>,
          <>
            <Strong>Contact:</Strong> {SITE.legalEmail}
          </>,
        ]}
      />

      <H2 id="use-of-the-site">2. Use of the Site</H2>
      <P>You may use the Site for lawful purposes only. You agree not to:</P>
      <Bullets
        items={[
          "Use the Site in any way that violates applicable law or regulation",
          "Attempt to gain unauthorized access to the Site, our systems, or any connected network",
          "Interfere with or disrupt the Site's functionality, including through malware, excessive automated requests, or denial-of-service attempts",
          "Scrape, copy, or reproduce substantial portions of the Site's content for commercial redistribution without our written permission",
          "Misrepresent your identity or affiliation when submitting a contact form or requesting a consultation",
        ]}
      />
      <P>
        We reserve the right to restrict or terminate access to the Site for
        anyone who violates these Terms.
      </P>

      <H2 id="intellectual-property">3. Intellectual Property</H2>
      <P>
        All content on the Site, including text, graphics, logos, diagrams, and
        the underlying code, is owned by WhyCrew or its licensors and is
        protected by copyright, trademark, and other intellectual property laws.
      </P>
      <P>
        You may view, download, and print content from the Site for your own
        personal or internal business reference. You may not modify, republish,
        distribute, or create derivative works from Site content without our
        prior written consent, except as permitted by standard fair use.
      </P>
      <P>
        The WhyCrew name and logo are trademarks of WhyCrew. You may not use
        them without our prior written permission.
      </P>

      <H2 id="submitted-information">4. Submitted Information</H2>
      <P>
        When you submit information through a contact form, consultation
        request, or similar feature on the Site, you confirm that the
        information you provide is accurate and that you have the right to share
        it. Submitting information through the Site does not create a client
        relationship or any obligation on our part until a separate services
        agreement is signed by both parties.
      </P>
      <P>
        Please review our{" "}
        <Link href="/privacy-policy" className={LINK}>
          Privacy Policy
        </Link>{" "}
        for how we handle any personal data you submit.
      </P>

      <H2 id="third-party-links">5. Third-Party Links</H2>
      <P>
        The Site may link to third-party websites, including sources we cite
        (such as official EU regulatory text) and resources we reference. These
        links are provided for convenience only. We do not control, endorse, or
        take responsibility for the content, accuracy, or practices of any
        third-party site, and your use of those sites is at your own risk.
      </P>

      <H2 id="disclaimers">6. Disclaimers</H2>
      <P>
        The Site and its content are provided &ldquo;as is&rdquo; and &ldquo;as
        available,&rdquo; without warranties of any kind, express or implied,
        including warranties of accuracy, completeness, merchantability, fitness
        for a particular purpose, or non-infringement.
      </P>
      <P>
        Content on the Site, including our blog posts and explainer articles, is
        provided for general informational purposes only and does not constitute
        legal, compliance, or professional advice. Reading an article on NIS2,
        DORA, or GDPR on this Site does not substitute for advice from a
        qualified professional about your specific compliance obligations.
      </P>
      <P>
        We do not guarantee that the Site will be uninterrupted, error-free, or
        secure at all times.
      </P>

      <H2 id="limitation-of-liability">7. Limitation of Liability</H2>
      <P>
        To the maximum extent permitted by applicable law, WhyCrew and its
        officers, employees, and agents will not be liable for any indirect,
        incidental, special, consequential, or punitive damages, or any loss of
        profits, revenue, data, or business opportunity, arising from your use
        of, or inability to use, the Site, even if we have been advised of the
        possibility of such damages.
      </P>
      <P>
        Nothing in these Terms limits liability that cannot be excluded or
        limited under applicable law, including liability for death, personal
        injury, or fraud.
      </P>

      <H2 id="indemnification">8. Indemnification</H2>
      <P>
        You agree to indemnify and hold WhyCrew harmless from any claims,
        damages, liabilities, and expenses (including reasonable legal fees)
        arising from your misuse of the Site or your violation of these Terms.
      </P>

      <H2 id="governing-law">9. Governing Law and Jurisdiction</H2>
      <P>
        These Terms are governed by the laws of the Province of Ontario and the
        federal laws of Canada applicable therein, without regard to
        conflict-of-law principles. Any disputes arising from these Terms or
        your use of the Site will be subject to the exclusive jurisdiction of
        the courts located in Ontario, Canada, except where mandatory consumer
        protection law in your own jurisdiction provides otherwise.
      </P>

      <H2 id="changes">10. Changes to These Terms</H2>
      <P>
        We may revise these Terms from time to time. The updated version will be
        posted here with a revised &ldquo;Last updated&rdquo; date. Your
        continued use of the Site after changes are posted constitutes
        acceptance of the revised Terms.
      </P>

      <H2 id="contact">11. Contact Us</H2>
      <P>If you have questions about these Terms, contact us at:</P>
      <LegalContact />
    </LegalShell>
  );
}
