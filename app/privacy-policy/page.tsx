import type { Metadata } from "next";
import Link from "next/link";
import { LegalContact, LegalShell } from "@/components/legal/legal-shell";
import { Bullets, DataTable, H2, H3, P, Strong } from "@/components/blog/prose";
import { legalBySlug } from "@/lib/legal";
import { ADDRESS, OG_IMAGE, SITE } from "@/lib/site";

const page = legalBySlug("privacy-policy")!;

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

/**
 * Section 3's purpose table. Four columns, so it scrolls sideways on a phone
 * rather than crushing the two legal-basis columns into single words.
 */
const PURPOSE_ROWS = [
  [
    "Respond to your inquiry",
    "Reply to contact form submissions, schedule consultations, answer questions about our SIEM/SOC services",
    "Consent implied by your request",
    "Legitimate interest (responding to a request you initiated)",
  ],
  [
    "Provide our services",
    "Deliver the custom SIEM/SOAR development or consulting services you've engaged us for",
    "Consent, necessary to fulfill the engagement",
    "Performance of a contract",
  ],
  [
    "Improve our website",
    "Analyze aggregated traffic and usage patterns via our analytics tools",
    "Consent, via our cookie banner",
    "Consent (for non-essential analytics cookies)",
  ],
  [
    "Send marketing communications",
    "Share relevant updates, content, or service information, only if you've opted in",
    "Express consent, per Canada's Anti-Spam Legislation (CASL)",
    "Consent",
  ],
  [
    "Comply with legal obligations",
    "Retain records where required by law, respond to lawful requests from authorities",
    "Permitted without consent under PIPEDA",
    "Legal obligation",
  ],
];

export default function Page() {
  return (
    <LegalShell
      page={page}
      intro={
        <>
          <p>
            WhyCrew (&ldquo;WhyCrew,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
            or &ldquo;our&rdquo;) respects your privacy and is committed to
            protecting the personal data of everyone who visits whycrew.com or
            uses our services. WhyCrew is headquartered in Ontario, Canada, and
            works with clients and visitors around the world, including a proven
            client base in the EU, so this Privacy Policy is built primarily
            around Canada&apos;s Personal Information Protection and Electronic
            Documents Act (PIPEDA), with additional rights explained for
            visitors covered by the EU General Data Protection Regulation
            (GDPR). If you&apos;re located somewhere else entirely, Section 7
            explains how we handle that too.
          </p>
          <p className="mt-4">
            If you do not agree with this policy, please do not use our website
            or services.
          </p>
        </>
      }
    >
      <H2 id="who-we-are">1. Who We Are</H2>
      <P>
        WhyCrew is the organization responsible for your personal data collected
        through whycrew.com.
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
            <Strong>Privacy contact:</Strong> {SITE.legalEmail}
          </>,
          <>
            <Strong>EU representative:</Strong> WhyCrew has not appointed a
            formal EU representative under GDPR Article 27. Our engagements with
            EU-based clients arise from individual projects sourced through
            third-party platforms rather than systematic, ongoing solicitation
            in the EU. See the note below for why this may qualify for an
            exemption, and why that determination still needs to be confirmed
            with legal counsel.
          </>,
        ]}
      />
      <P>
        If you have any questions about this policy or how we handle your data,
        contact us at the email address above.
      </P>

      <H2 id="what-we-collect">2. What Personal Data We Collect</H2>
      <P>
        We collect personal data in a few different ways, depending on how you
        interact with our site.
      </P>

      <H3>Data you give us directly</H3>
      <P>
        When you fill out a contact form, request a consultation, subscribe to
        updates, or otherwise reach out to us, we collect what you provide: your
        name, email address, company name, job title, phone number (if given),
        and the content of your message.
      </P>

      <H3>Data we collect automatically</H3>
      <P>
        When you browse whycrew.com, our analytics tools automatically collect
        certain technical and usage data, including your IP address (anonymized
        where configured), browser type and version, device type, pages visited,
        time spent on the site, referring website, and general location data
        derived from your IP address. See our{" "}
        <Link href="/cookie-policy" className={LINK}>
          Cookie Policy
        </Link>{" "}
        for full details on the cookies this involves and the specific tools
        currently in use.
      </P>

      <H3>Data from third parties</H3>
      <P>
        We do not currently purchase or receive personal data about you from
        third-party data brokers. If this changes, we will update this policy.
      </P>
      <P>
        We do not knowingly collect any special category data (such as health
        information, political opinions, or religious beliefs) through our
        website.
      </P>

      <H2 id="why-we-collect">
        3. Why We Collect Your Data (Purpose and Legal Basis)
      </H2>
      <P>
        Under PIPEDA, we collect, use, and disclose personal data only for
        purposes a reasonable person would consider appropriate, and only with
        your knowledge and consent. If you are in the EU, we also identify the
        specific GDPR legal basis for each purpose, since GDPR requires that in
        addition to consent. Here is how each purpose breaks down:
      </P>
      <DataTable
        caption="Purposes for processing personal data, with the PIPEDA basis and the GDPR legal basis for each"
        head={[
          "Purpose",
          "What we do with the data",
          "PIPEDA basis",
          "GDPR legal basis (if you're in the EU)",
        ]}
        rows={PURPOSE_ROWS}
      />
      <P>
        You can withdraw consent at any time (see Section 7,{" "}
        <Link href="#your-rights" className={LINK}>
          Your Rights
        </Link>
        ). Marketing emails are also subject to CASL, so every message we send
        includes a way to unsubscribe, and we won&apos;t email you commercially
        without your prior express or implied consent.
      </P>

      <H2 id="how-we-share">4. How We Share Your Data</H2>
      <P>We do not sell your personal data. We share data only with:</P>
      <Bullets
        items={[
          <>
            <Strong>Service providers (processors)</Strong> who help us run our
            website and business, such as our hosting provider, analytics tools,
            and any email or CRM tools we use to manage inquiries. These
            providers only process data on our instructions and are bound by
            data processing agreements. Our{" "}
            <Link href="/cookie-policy" className={LINK}>
              Cookie Policy
            </Link>{" "}
            lists the specific tools active on the Site at any given time.
          </>,
          <>
            <Strong>Legal and regulatory authorities,</Strong> where required to
            comply with a legal obligation, court order, or to protect our
            rights, property, or safety, or that of our users.
          </>,
          <>
            <Strong>A successor entity,</Strong> in the event of a merger,
            acquisition, or sale of assets, subject to the same protections
            described in this policy.
          </>,
        ]}
      />

      <H2 id="international-transfers">5. International Data Transfers</H2>
      <P>
        WhyCrew is based in Canada, so personal data we collect is generally
        processed and stored in Canada or by service providers operating there.
        Some of our service providers, including the analytics and business
        tools we rely on to run the Site, may process data outside Canada,
        including in the United States or elsewhere, where those providers
        operate. Data may therefore be accessible to, and subject to the laws
        of, other jurisdictions.
      </P>
      <P>
        If you are located in the EEA or UK, this means your data is transferred
        outside the EEA/UK when it comes to us or to our service providers.
        Where this happens, we rely on appropriate safeguards recognized under
        GDPR, such as the European Commission&apos;s Standard Contractual
        Clauses, to ensure your data receives an equivalent level of protection
        regardless of where it&apos;s processed.
      </P>

      <H2 id="retention">6. How Long We Keep Your Data</H2>
      <P>
        We retain personal data only for as long as necessary to fulfill the
        purposes described in this policy, unless a longer retention period is
        required or permitted by law.
      </P>
      <Bullets
        items={[
          <>
            <Strong>Contact form and inquiry data:</Strong> retained for 24
            months after your last interaction with us, if it doesn&apos;t lead
            to a client relationship, or as needed to maintain business records.
          </>,
          <>
            <Strong>Analytics data:</Strong> retained according to our analytics
            provider&apos;s default settings, typically 14 to 26 months
            depending on configuration; see our{" "}
            <Link href="/cookie-policy" className={LINK}>
              Cookie Policy
            </Link>{" "}
            and cookie preference centre for the current setting.
          </>,
          <>
            <Strong>Client and contract data:</Strong> retained for the duration
            of our engagement plus any period required by applicable tax,
            accounting, or contractual record-keeping obligations.
          </>,
        ]}
      />

      <H2 id="your-rights">7. Your Rights</H2>
      <P>If you are located in Canada, PIPEDA gives you the right to:</P>
      <Bullets
        items={[
          "Access the personal data we hold about you and know how it's being used",
          "Correct inaccurate or incomplete data",
          "Withdraw consent at any time, subject to legal or contractual restrictions, though this may limit our ability to provide certain services to you",
          "Challenge our compliance with PIPEDA and file a complaint with the Office of the Privacy Commissioner of Canada (OPC) if you believe we have not handled your data properly",
        ]}
      />
      <P>
        If you are located in the EEA, UK, or another jurisdiction with
        GDPR-equivalent protections, you additionally have the right to:
      </P>
      <Bullets
        items={[
          "Rectify inaccurate or incomplete data",
          'Erase your data ("right to be forgotten"), subject to certain exceptions',
          "Restrict how we process your data",
          "Object to processing based on legitimate interest, including for direct marketing",
          "Data portability, to receive your data in a structured, machine-readable format",
          "Lodge a complaint with your national data protection supervisory authority if you believe we have not handled your data properly",
        ]}
      />
      <P>
        If you are located elsewhere in the world, outside Canada and the
        EEA/UK, local privacy law may give you similar or additional rights
        depending on where you live. We honor requests to access, correct, or
        delete your personal data to the extent required by the law that applies
        to you, regardless of your location, contact us using the details below
        and we&apos;ll confirm what applies and assist accordingly.
      </P>
      <P>
        To exercise any of these rights, contact us at{" "}
        <a href={`mailto:${SITE.legalEmail}`} className={LINK}>
          {SITE.legalEmail}
        </a>
        . We will respond within the timeframe required by applicable law,
        generally within 30 days under PIPEDA or one month under GDPR of a
        verified request.
      </P>

      <H2 id="how-we-protect">8. How We Protect Your Data</H2>
      <P>
        We use appropriate technical and organizational measures to protect
        personal data against unauthorized access, alteration, disclosure, or
        destruction, including encrypted connections (HTTPS), access controls,
        and regular review of the third-party tools we rely on. No system is
        completely secure, and we cannot guarantee absolute security, but we
        work to minimize risk at every stage.
      </P>

      <H2 id="childrens-privacy">9. Children&apos;s Privacy</H2>
      <P>
        Our website and services are intended for business use and are not
        directed at, nor knowingly collect data from, individuals under the age
        of 16. If we become aware that we have inadvertently collected data from
        a child, we will delete it promptly.
      </P>

      <H2 id="changes">10. Changes to This Policy</H2>
      <P>
        We may update this Privacy Policy from time to time to reflect changes
        in our practices or legal requirements. We will post the updated version
        here with a revised &ldquo;Last updated&rdquo; date. Material changes
        will be communicated more prominently where appropriate.
      </P>

      <H2 id="contact">11. Contact Us</H2>
      <P>
        If you have questions, concerns, or requests regarding this Privacy
        Policy or how we handle your data, contact us at:
      </P>
      <LegalContact />
    </LegalShell>
  );
}
