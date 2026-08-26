import Script from "next/script";
import { CLARITY_PROJECT_ID, GA_MEASUREMENT_ID } from "@/lib/site";

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

export function Analytics() {
  return (
    <>
      <GoogleAnalytics />
      <Clarity />
    </>
  );
}
