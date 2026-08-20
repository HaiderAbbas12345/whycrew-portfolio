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

`POST /api/contact` validates the submission, then delivers it over three
independent channels — the lead database (the durable record, readable at
`/admin`), email, and an optional webhook mirror. They run concurrently; one
failing does not block the others, and the request only errors if every
configured channel failed.

On success the form opens a confirmation modal
(`components/ui/thank-you-modal.tsx`) quoting the lead's reference number, and
leaves an inline confirmation behind when it is dismissed. The modal traps
focus, closes on `Escape` or a backdrop click, restores focus to the Submit
button, and honours `prefers-reduced-motion`.

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
- In-memory rate limit: 10 submissions per IP per minute. Single-instance only —
  if this ever runs on multiple nodes, move the limit to Redis or the CDN edge.
- All fields length-capped and HTML-escaped before templating

## Admin lead dashboard

Contact-form submissions are written to the lead database and managed at `/admin`:
pipeline stage (New → Contacted → Qualified → Proposal → Won/Lost), free-text
notes per lead, stage filtering, and search across name, email, company, and
interest.

This is a third capture channel alongside email and the webhook. All three run
concurrently and independently — **a lead is stored even when email is not
configured**, and the request only fails if every configured channel failed.

### Setup

Sign-in is a single user stored in MongoDB. Create it once:

```bash
npm run seed:admin
# or non-interactively:
npm run seed:admin -- --username admin --password 'a long passphrase'
```

The script reads `.env.local` when present, so it needs no arguments locally.
Against a deployed database, pass the same `MONGODB_URI` in the environment.
**Re-running it is how the password is rotated** — it replaces the single user
rather than adding a second one.

```bash
ADMIN_USERNAME="admin"      # seed input; defaults to "admin"
ADMIN_PASSWORD="…"          # seed input ONLY — delete it after seeding
ADMIN_SESSION_SECRET="…"    # signs the session cookie; openssl rand -hex 32
```

Because the admin user lives in the database, **`/admin` requires
`MONGODB_URI`.** Leads still work on any backend, but there is no
file-database fallback for sign-in — a plaintext password in an env var is
exactly what this replaces.

### Storage

Three interchangeable backends. `MONGODB_URI` wins if set; otherwise
`LEADS_DB_URL` picks between the two SQLite ones:

| Env | Backend | Use for |
|---|---|---|
| `MONGODB_URI` set | MongoDB (`lib/leads-mongo.ts`) | **production / Vercel** |
| both unset | `node:sqlite`, a real local `.db` file | local dev, self-hosted (VPS/Docker) |
| `LEADS_DB_URL=https://…` | Turso (libSQL) over its HTTP API | serverless, if you prefer SQL |

All three are reached through the exported functions in `lib/leads.ts` and
return the same shapes, so nothing above that file — the contact route,
`/admin` — changes when the engine does.

**Local dev needs no database at all.** Leave `MONGODB_URI` empty and leads go
to `.data/leads.db` via `node:sqlite`, which is built into Node 22+.

#### MongoDB (Atlas)

```bash
MONGODB_URI="mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority"
MONGODB_DB="whycrew"   # optional, defaults to "whycrew"
```

Get the string from Atlas → **Database → Connect → Drivers**. URL-encode any
special characters in the password. Under **Network Access**, allow the
deploying host — Vercel's egress IPs are not fixed, so in practice that means
`0.0.0.0/0` with a strong database password, or a private endpoint on a paid
tier.

Three collections, created automatically on first write along with their
indexes:

| Collection | Holds |
|---|---|
| `leads` | one document per submission; `_id` is the lead number |
| `lead_notes` | notes, `leadId` → `leads._id` |
| `counters` | one document per sequence, for the lead numbers |
| `admin_users` | the single sign-in user; password as a scrypt hash |

Ids are sequential integers rather than ObjectIds, handed out by an atomic
`$inc` on the `counters` document. That keeps `Lead.id` a number on every
backend — the admin routes are `/admin/[id]` guarded by `Number.isInteger` —
and reads better in the dashboard than a 24-character hex string.

**Why not a file database on Vercel?** The filesystem there is ephemeral: a
file database is wiped on every deploy and is not shared between lambda
instances. Rather than lose leads silently, a file-backed database on a
serverless host is treated as *unconfigured* — `/admin` shows an explicit
warning and `/api/contact` returns `503` so the form falls back to its
`mailto:`.

#### Turso (SQLite alternative)

```bash
turso db create whycrew-leads
turso db show whycrew-leads --url      # → LEADS_DB_URL
turso db tokens create whycrew-leads   # → LEADS_DB_TOKEN
```

The schema is created automatically on first use.

### Access control

One user, held at a fixed `_id` in the `admin_users` collection so a second
account cannot be created by accident. Its password is stored only as a salted
**scrypt** hash (`scrypt$N$r$p$salt$hash`, N=16384 — roughly 16MB and ~200ms
per attempt). Anyone who reads the database still cannot sign in, and cannot
recover a password that may be reused elsewhere. scrypt is memory-hard and
built into Node, so this adds no dependency and no native build step.

A correct pair is exchanged for an HMAC-signed, httpOnly session cookie (12h)
carrying the username and expiry. Tampering with either invalidates the
signature.

Hardening beyond the hash:

- **No user enumeration.** A missing user is verified against a decoy hash, so
  a wrong username and a wrong password cost the same ~200ms and return the
  same message.
- **Constant-time comparison** on both the username digest and the password
  hash — no early return on the first differing byte.
- **Login throttling**: 8 failed attempts per IP per 10 minutes. In-memory, so
  it is per-instance — move it to Redis or the CDN edge if this ever runs on
  more than one node.
- Every server action re-checks the session independently of the page guard,
  since actions are reachable as POST endpoints in their own right.
- `/admin` is `noindex, nofollow` and disallowed in `robots.txt`.
- A misconfiguration reason is shown only in development; in production it goes
  to the server log, so the page never reveals whether a user is seeded.

## Theme

Palette is keyed to `WhyCrew.jpeg` — electric royal blue (`--color-brand: #2f5cff`)
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
- Replace `WhyCrew.jpeg` with a transparent SVG/PNG mark if one exists, and add a
  dedicated 1200×630 OG image (the square logo is the current fallback)
- The NIS2 & DORA copy is from the doc marked "Not Final" — refresh when signed off
- Fill in the real EU hub city on `/contact` (the design left it as `[City, Country]`)
- Careers currently routes to the contact form preselected to "Careers"; swap in a
  real `/careers` page when there are roles to list
