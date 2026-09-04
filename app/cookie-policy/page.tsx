import type { Metadata } from "next";
import { CookiePreferencesButton } from "@/components/cookie-consent";
import { LegalContact, LegalShell } from "@/components/legal/legal-shell";
import { Bullets, H2, H3, P, Strong } from "@/components/blog/prose";
import { legalBySlug } from "@/lib/legal";
import { OG_IMAGE, SITE } from "@/lib/site";

const page = legalBySlug("cookie-policy")!;

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

/** Shared styling for the inline "cookie preferences" control in the prose. */
const INLINE_BUTTON =
  "text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent";

export default function Page() {
  return (
    <LegalShell
      page={page}
      intro={
        <p>
          This Cookie Policy explains what cookies are, which ones whycrew.com
          uses, why we use them, and how you can control them. It should be
          read alongside our Privacy Policy.
        </p>
      }
    >
      <H2 id="what-is-a-cookie">1. What Is a Cookie?</H2>
      <P>
        A cookie is a small text file placed on your device when you visit a
        website. Cookies help the site remember information about your visit,
        like your preferences or how you interact with the pages, which can
        make your next visit easier and the site more useful, or help us
        understand how the site is used.
      </P>

      <H2 id="categories">2. Categories of Cookies We Use</H2>
      <P>
        We group the cookies on whycrew.com into four categories, in line with
        standard industry practice:
      </P>

      <H3>Strictly necessary cookies</H3>
      <P>
        These are required for the Site to function properly, such as
        maintaining basic security, load balancing, and remembering your cookie
        preferences themselves. They don&apos;t require consent under
        GDPR/ePrivacy because the Site cannot work properly without them, and
        they can&apos;t be switched off.
      </P>

      <H3>Performance and analytics cookies</H3>
      <P>
        These help us understand how visitors use the Site, such as which pages
        are most visited, how long people stay, and whether pages load
        correctly, so we can find and fix problems and improve the experience.
        These cookies are not strictly necessary and are only set with your
        consent.
      </P>

      <H3>Functional cookies</H3>
      <P>
        These remember choices you&apos;ve made on the Site, such as language or
        display preferences, to make your next visit more convenient. Also not
        strictly necessary, and only set with consent.
      </P>

      <H3>Targeting and advertising cookies</H3>
      <P>
        These would be used to make marketing more relevant to you and measure
        the effectiveness of campaigns.{" "}
        <Strong>
          We do not currently use this category of cookie on whycrew.com.
        </Strong>{" "}
        If that changes, we&apos;ll update this policy and our consent options
        accordingly before any such cookie is set.
      </P>

      <H2 id="cookies-used">3. Cookies Used on This Site</H2>
      <P>
        The specific cookies active on whycrew.com at any given time, along with
        their name, provider, purpose, and expiry, are listed in our{" "}
        <CookiePreferencesButton className={INLINE_BUTTON}>
          cookie preference centre
        </CookiePreferencesButton>
        , accessible from the link in the site footer. We keep that list there
        rather than in this document so it always reflects what&apos;s actually
        running on the Site, rather than going out of date here every time a
        tool changes.
      </P>

      <H2 id="your-consent">4. Your Consent</H2>
      <P>
        WhyCrew is based in Ontario, Canada, where PIPEDA generally allows
        implied consent for non-sensitive analytics cookies as long as we give
        you clear notice, which this policy does. However, because our visitors
        and clients include people located in the EU, and EU law (GDPR and the
        ePrivacy Directive) requires opt-in consent before any non-essential
        cookie is set, we apply that stricter standard site-wide rather than
        running two different experiences depending on where a visitor is
        located. When you first visit whycrew.com, you&apos;ll be shown a cookie
        banner where you can accept or decline non-essential cookies, and change
        your choice at any time.
      </P>
      <P>
        If you decline non-essential cookies, the Site will still function
        normally, we simply won&apos;t collect performance data from your visit
        or apply any saved preferences.
      </P>

      <H2 id="manage-cookies">5. How to Manage Cookies</H2>
      <P>You can manage or withdraw your cookie consent at any time:</P>
      <Bullets
        items={[
          <>
            <Strong>On this Site:</Strong> use the{" "}
            <CookiePreferencesButton className={INLINE_BUTTON}>
              cookie preferences
            </CookiePreferencesButton>{" "}
            link in the site footer to update your choices.
          </>,
          <>
            <Strong>In your browser:</Strong> most browsers let you block or
            delete cookies through their settings. Note that blocking all
            cookies, including strictly necessary ones, may affect how parts of
            the Site function.
          </>,
          <>
            <Strong>General opt-out resources:</Strong> independent sites like
            Your Online Choices and About Cookies explain how to manage cookies
            across the websites you visit, not just this one.
          </>,
        ]}
      />

      <H2 id="changes">6. Changes to This Policy</H2>
      <P>
        We may update this Cookie Policy if the cookies or tracking tools we use
        change. We will post the updated version here with a revised &ldquo;Last
        updated&rdquo; date, and where the change is material, we&apos;ll prompt
        you to review your cookie preferences again.
      </P>

      <H2 id="contact">7. Contact Us</H2>
      <P>If you have questions about our use of cookies, contact us at:</P>
      <LegalContact />
    </LegalShell>
  );
}
