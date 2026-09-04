"use client";

import Script from "next/script";
import { useConsent } from "@/components/cookie-consent";
import {
  CLARITY_PROJECT_ID,
  GA_MEASUREMENT_ID,
  GTM_CONTAINER_ID,
} from "@/lib/site";

/**
 * GA4, carried over from the previous deployment so historical reporting stays
 * on one property. Loads after hydration so it never blocks first paint.
 */
function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}

/**
 * Microsoft Clarity — session recordings and heatmaps, which GA4 does not do.
 *
 * This is Clarity's own bootstrap snippet, unchanged apart from the project id
 * coming from lib/site.ts. It appends the real tag itself, so `afterInteractive`
 * is doing the same job here as it does for GA4: keep it off the critical path.
 *
 * Clarity's domains have to be in the CSP or the browser blocks all of this
 * silently — the dashboard just stays empty. See the script-src and connect-src
 * directives in next.config.ts.
 */
function Clarity() {
  if (!CLARITY_PROJECT_ID) return null;

  return (
    <Script id="clarity-init" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
      `}
    </Script>
  );
}

/**
 * Google Tag Manager — the container, so tags can be added from the GTM UI
 * without a deploy.
 *
 * GTM's own <head> snippet, unchanged apart from the container id coming from
 * lib/site.ts. `afterInteractive` is what Next's own GTM component uses as
 * well: the container still loads on every page, just off the critical path.
 */
function GoogleTagManager() {
  if (!GTM_CONTAINER_ID) return null;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
      `}
    </Script>
  );
}

/**
 * Measurement, gated on consent.
 *
 * Nothing here renders until the visitor has actively accepted analytics
 * cookies. That is stricter than PIPEDA requires in Ontario, and it is what
 * the Cookie Policy promises: "you'll be shown a cookie banner where you can
 * accept or decline non-essential cookies". A tag that fired before the
 * banner was answered would make that sentence untrue.
 *
 * `ready` matters as much as the answer itself. Before the stored choice has
 * been read, consent is not "denied" — it is unknown, and an unknown answer
 * must not load a tag.
 *
 * Note there is no GTM <noscript> fallback any more. It was an iframe in the
 * server-rendered body, so it fired the container for anyone without
 * JavaScript — who by definition cannot be shown a consent banner, and so can
 * never have agreed to it.
 */
export function Analytics() {
  const { consent, ready } = useConsent();

  if (!ready || !consent?.analytics) return null;

  return (
    <>
      <GoogleTagManager />
      <GoogleAnalytics />
      <Clarity />
    </>
  );
}
