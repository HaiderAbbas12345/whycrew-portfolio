# WhyCrew — whycrew.com

Marketing site for WhyCrew: custom SIEM/SOAR development, on-premise AI SOC
automation, white-label MSSP platforms, and NIS2/DORA compliance automation.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Site structure

Hub-and-spoke, per the approved architecture diagram: the homepage links to the
service cluster, the service pages carry the conversion intent, and everything
funnels to `/contact`.

| Route | Source content |
|---|---|
| `/` | Whycrew Final Content (Homepage).pdf |
| `/services` | Service index (hub) |
| `/services/custom-siem-soar-development` | Custom SIEM & SOAR Development Service Page.pdf |
| `/services/ai-powered-soc-automation` | AI-Powered SOC Automation Service Page.pdf |
| `/services/mssp-engineering-partner` | MSSP Engineering Partner Service Page.pdf |
| `/services/nis2-dora-compliance-automation` | NIS2 & DORA Compliance Automation Service Page.pdf *(marked "Not Final")* |
| `/contact` | whycrew-contact-page-design.png |

Slugs follow the one explicitly specified in the source docs
(`/services/mssp-engineering-partner`), so all four services sit flat under
`/services/`.

## SEO

Meta titles and descriptions are taken verbatim from the content docs where they
were specified. Everything is statically prerendered.

- Per-page `title`, `description`, canonical URL, OpenGraph and Twitter cards
- One `<h1>` per page, semantic heading order below it
- JSON-LD: `Organization`, `WebSite`, `Service`, `FAQPage`, `BreadcrumbList`, `ItemList`
- `app/sitemap.ts` → `/sitemap.xml`, `app/robots.ts` → `/robots.txt`
- Visible breadcrumbs on `/services` and every service page

Set the production origin in `lib/site.ts` (`SITE.url`) before deploying —
canonicals, OG URLs, and the sitemap all derive from it.

## Contact form & email

`POST /api/contact` validates the submission, then delivers it over two
independent channels — email (primary) and an optional webhook mirror. They run
concurrently; one failing does not block the other, and the request only errors
if every configured channel failed.

Copy `.env.example` → `.env.local` and fill it in.

### 1. Email via Resend (recommended)

1. Sign up at [resend.com](https://resend.com) and create an API key →
   `RESEND_API_KEY`
2. Set `CONTACT_TO_EMAIL` to the inbox that should receive enquiries
   (comma-separate for several)
3. **Add your domain** in Resend → Domains, and add the DNS records it gives
   you at your registrar:
   - `MX` + `TXT` on a `send.` subdomain (bounce handling)
   - `TXT` — SPF
   - `TXT` — DKIM
   - Optional but recommended: a `DMARC` `TXT` record on `_dmarc`
4. Once the domain shows **Verified**, set
   `CONTACT_FROM_EMAIL="WhyCrew <hello@whycrew.com>"`
5. Optionally set `CONTACT_AUTOREPLY="true"` to send the submitter a
   confirmation

Until the domain is verified, leave `CONTACT_FROM_EMAIL` unset — it falls back
to Resend's sandbox sender, which only delivers to the account owner's address.
Good enough to prove the wiring works, not for production.

**Reply-To is set to the submitter**, so hitting reply in your inbox goes
straight back to the prospect rather than to Resend.

No SDK is used — `lib/email.ts` calls the REST API over `fetch`, so there is
nothing to keep updated and swapping providers is a single function.

### 2. Webhook mirror (optional)

`CONTACT_WEBHOOK_URL` posts the same JSON payload to a Slack/Teams incoming
webhook, a Zapier/Make hook, or your CRM. Useful as a second copy so a mail
outage can't lose a lead.

### Swapping providers

If you'd rather keep lead data in the EU to match the site's own positioning,
replace the `resendSend` function in `lib/email.ts` — it's one `fetch` call.
Mailgun (EU region), Brevo, and Scaleway TEM all take a comparable JSON POST;
Postmark and AWS SES are US-hosted like Resend. Verify each provider's current
data-residency terms yourself before committing.

### Abuse protection

- Honeypot field (`website`) — filled submissions are accepted and discarded
- In-memory rate limit: 5 submissions per IP per minute. Single-instance only —
  if this ever runs on multiple nodes, move the limit to Redis or the CDN edge.
- All fields length-capped and HTML-escaped before templating

## Theme

Palette is keyed to `logo.jpeg` — electric royal blue (`--color-brand: #2f5cff`)
on a deep navy ground, with the teal from the approved page designs
(`--color-accent: #2dd4a8`) as the secondary accent. All tokens live in the
`@theme` block at the top of `app/globals.css`.

## Motion

Reusable primitives in `components/motion/`: scroll reveals, staggered grids,
word-by-word headline reveals, count-up stats, mouse-tracked card spotlights,
animated conic borders, magnetic buttons, decrypt-style eyebrow text, scroll
progress, parallax, and an infinite trust marquee.

Everything decorative is disabled under `prefers-reduced-motion: reduce` — see
the media query at the bottom of `app/globals.css`.

### Performance rules for this codebase

Scroll animation holds 60fps (measured: 16.7ms median frame, 0 dropped frames
over a full-page scroll). Four rules keep it there — breaking any of them
reintroduces stutter:

1. **Never animate `filter: blur()`.** The GPU composites `opacity` and
   `transform` for free; a changing blur radius forces a full re-rasterise of
   the subtree every frame. Reveal/Stagger animate transform + opacity only.
2. **`backdrop-blur` on the fixed nav only.** On cards it re-blurs the
   background on every scroll frame, once per card. Use a more opaque `bg-*`.
3. **No animated gradients.** Static gradient, fade it in with `opacity`.
   Driving a conic angle via `@property` regenerates the gradient on the CPU
   each frame. Infinite background-position animations are `paused` until hover.
4. **Frame-rate updates bypass React.** `CountUp` and `Scramble` write to
   `node.textContent` through a ref; `setState` at 60fps re-renders the tree.
   `Spotlight` coalesces mousemove into one write per `requestAnimationFrame`.

Large soft glows use a radial alpha **mask** on a solid element rather than
`filter: blur(90px)` — visually identical, rasterised once instead of per frame.

## Still to do

- `SITE.url` currently points at `https://whycrew.com`; update if the origin differs
- Replace `logo.jpeg` with a transparent SVG/PNG mark if one exists, and add a
  dedicated 1200×630 OG image (the square logo is the current fallback)
- The NIS2 & DORA copy is from the doc marked "Not Final" — refresh when signed off
- Fill in the real EU hub city on `/contact` (the design left it as `[City, Country]`)
- Careers currently routes to the contact form preselected to "Careers"; swap in a
  real `/careers` page when there are roles to list
