# Website Fix Checklist — from the WhyCrew Growth, SEO & AEO Plan

Working checklist for the **on-site** items in Sections 1, 2.1 and 2.5 of the growth
plan. Off-platform work (Reddit, G2, backlink outreach) lives in
`OFF-PLATFORM-TASKS.md`.

Status as of this pass: **all code-side audit findings are fixed.** What remains
needs information or accounts only you have.

---

## ✅ Done in code

### Critical bugs (Plan §1.4)
- [x] Removed the internal instruction block visible on `/case-studies`
      ("Replace this block with the real client's numbers once approved…").
      Replaced with an honest line about figures being withheld at the client's
      request, plus a link into the calculator. The instruction now lives as a
      code comment in `app/case-studies/page.tsx`.
- [x] Fixed the three dead `href="#"` links. They now point at the sections that
      genuinely cover those topics (`/for-mssps#how`, `#calculator`, `#regions`),
      and three more real cards were added — so the grid is six working internal
      links instead of three dead ones and three drafts.
- [x] Removed the public "Coming soon" / "In progress" draft labels.
- [x] Replaced the mailto-only CTA. `mailto:` now appears **only** as a fallback
      next to the form, never as a primary CTA.

### Lead capture (Plan §2.5 — "single highest-leverage fix on the entire site")
- [x] New `POST /api/contact` — validation, honeypot, length caps, and pluggable
      delivery (CRM webhook and/or Resend). Fails loudly rather than silently
      dropping a lead.
- [x] `ContactForm` now really submits, with sending / success / error states and
      an email fallback if delivery fails.
- [x] Fires a `generate_lead` event to GA4 / GTM on success — the conversion
      event the audit said didn't exist.
- [x] New `/contact` page so there is one canonical conversion destination.
      Nav, footer, all CTA bands and all service heroes now point there.
- [x] `NEXT_PUBLIC_BOOKING_URL` — set it and every "Book a call" goes straight to
      the calendar instead. Nothing else needs changing.

### Technical SEO (Plan §1.2)
- [x] `sitemap.xml` — all 10 routes, prioritised, generated from `lib/routes.ts`.
- [x] `robots.txt` — open to crawlers (AI crawlers included), points at sitemap.
- [x] Unique canonical on all 10 pages.
- [x] Unique `og:title` / `og:description` / `og:url` per page. Previously every
      page shared the homepage's, so every shared link rendered as the homepage.
- [x] `max-image-preview:large` and `max-snippet:-1` for richer SERP treatment.
- [x] Optional Search Console verification via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.

### AEO (Plan §1.3)
- [x] **FAQ answers now render server-side.** This was the biggest AEO defect:
      only the open accordion item existed in the HTML, so crawlers that don't
      run JavaScript saw one answer out of six. Answers are now always in the
      DOM, collapsed with CSS.
- [x] `Organization` + `WebSite` JSON-LD sitewide, with `knowsAbout`, `areaServed`
      and a sales `contactPoint`.
- [x] `Service` JSON-LD on all five service pages.
- [x] `BreadcrumbList` on every subpage.
- [x] `FAQPage` JSON-LD on seven pages, up from one.
- [x] Two duplicate FAQ implementations folded into one crawlable component.

### Thin content (Plan §1.2)
- [x] `/ai-workflows`, `/integrations`, `/workflow-automation`, `/security-products`
      each gained a concrete use-case section, five FAQs, and a related-links
      block — up from ~150–250 words with no FAQ, proof, or internal links.

### E-E-A-T & internal linking
- [x] New `/about` page — story, principles, regional positioning, FAQs. Wired
      into nav, footer, sitemap and breadcrumbs.
- [x] **Named leadership.** Yasir Abbas (Founder) on `/about` with portrait, bio,
      a "Before WhyCrew" background summary, focus areas, and three proof stats.
      Backed by `Person` JSON-LD (`knowsAbout`, `image`) and `founder` on the
      Organization schema. This closes the audit's "no named founders or staff"
      finding.
- [x] **No third-party employer names**, on the page or in the structured data.
      Prior experience is described by what the work was, not who it was for.
      (`alumniOf` was deliberately dropped from the Person schema for the same
      reason — it would have listed those names in machine-readable form.)
- [x] The "built by malware-research & threat-intel engineers" badges on the
      homepage and `/for-mssps` now link through to `/about`, so the claim and
      its evidence are one click apart.
- [x] Portrait optimised from the 6000×6000 source to 1000×1000 (~80 KB) at
      `public/team/yasir-abbas.jpg`. The deep-blue alternate background is at
      `yasir-abbas-alt.jpg` — swap the `photo` path in `app/about/page.tsx` to
      use it.
- [x] The pillar guide is now linked from the homepage and `/for-mssps`, not just
      the footer.
- [x] All service pages cross-link to each other and to the flagship.
- [x] LinkedIn icon in the footer, and `sameAs` in Organization schema — both
      activate the moment `NEXT_PUBLIC_LINKEDIN_URL` is set.

---

## 🔲 Needs you — cannot be done from code

### Blocking, highest value first
- [ ] **Configure lead delivery.** Copy `.env.example` → `.env.local` and set
      `LEAD_WEBHOOK_URL` (Zoho Flow / Make / n8n) and/or `RESEND_API_KEY` +
      `LEAD_FROM_EMAIL`. **Until one is set, `/api/contact` returns 503 in
      production and the form shows its email fallback.** This is deliberate —
      better a visible fallback than a silently dropped lead.
- [ ] **Real client numbers on `/case-studies`.** Prior vendor spend, tenant
      count, specific saving. See the TODO comment in the file. The plan is right
      that this is the strongest sentence available to you, and it's the thing an
      AI answer engine would quote.
- [ ] **Set `NEXT_PUBLIC_FOUNDER_LINKEDIN`** to Yasir's public profile URL. The
      leadership card and Person `sameAs` both light up automatically. Without an
      off-site profile to point at, the named-founder work is only half of the
      corroboration signal AI engines look for.
- [ ] **Review the leadership copy.** The bio, background, and proof stats were
      written from the LinkedIn material supplied — check the framing reads how
      you want it to, particularly the "70%+ IOC enrichment" stat, which is now a
      public claim on the site rather than a line on a profile.

### Then
- [ ] Add the rest of the team to the `LEADERSHIP` array in `app/about/page.tsx`
      as people join — same shape, and the section scales to them.
- [ ] Set `NEXT_PUBLIC_BOOKING_URL` once Zoho Bookings / Calendly exists.
- [ ] Set `NEXT_PUBLIC_LINKEDIN_URL` once the company page exists (Plan §6.2).
- [ ] Install GA4 + GTM. The `generate_lead` event already fires; nothing is
      listening for it yet.
- [ ] **Request reindexing in Search Console.** Google's cached homepage still
      shows the pre-rebuild site — the single fastest visibility win available,
      and no code change will trigger it.
- [ ] Submit the sitemap in Search Console.
- [ ] Run the live URLs through the Rich Results Test to confirm the new schema.
- [ ] Measure Core Web Vitals (PageSpeed Insights / Lighthouse) — never measured.
- [ ] Publish the field-notes articles (Plan §2.1), including the Europe-focused
      GDPR/data-residency piece. The `/case-studies` cards currently point at
      relevant on-site sections; repoint them at the articles as they land.

---

## Notes

- `npm run build` passes; `npx tsc --noEmit` is clean; all 10 routes return 200.
- No dependencies were added.
- Everything configurable is env-driven, so nothing here needs a code change to
  go live — see `.env.example`.
