# Off-Platform Marketing Tasks — SOC Platform Builders Campaign

Follow-up tasks from the **Okara.ai** gap analysis for the query
_"Best custom SOC platform builders for MSSPs in 2025"_.

The **codeable fixes are done and live** (see bottom). Everything below is
off-platform work that has to be done by hand in external accounts — do these
at your own pace.

**Live page:** https://whycrew.com/best-soc-platform-builders-mssps-2025

---

## ✅ Done (in code, already deployed)

- [x] Dedicated landing page for the buyer-intent query
- [x] FAQ schema markup (`FAQPage` JSON-LD) + Article + Breadcrumb schema
- [x] Optimized title, meta description, keywords, canonical URL
- [x] Competitor comparison section (WhyCrew vs UnderDefense vs rented SIEMs)
- [x] Internal link from the footer for crawlability

---

## 🔲 To do (off-platform — your turn)

### 0. Post-launch verification — do this first (~10 min)
- [ ] Run the live URL through Google's [Rich Results Test](https://search.google.com/test/rich-results) — confirm the **FAQ** markup is detected with no errors.
- [ ] In [Google Search Console](https://search.google.com/search-console), use **URL Inspection** → **Request Indexing** on the new page so it gets crawled fast.
- [ ] Confirm the page renders correctly on mobile.

### 1. Publish / index the article — **High priority**
- [ ] Article is on-site already. Make sure it's linked from at least one high-traffic page (homepage or `/for-mssps`) beyond the footer, so it accrues internal link equity.
- [ ] Add it to your XML sitemap if you maintain one manually.

### 2. Share on relevant subreddits — **Medium priority**
Read each sub's self-promo rules first — most require you to be a contributing
member, not just drop a link. Lead with value, not a pitch.
- [ ] **r/MSSP** — frame as "how we think about own-vs-rent for a SOC platform in 2025"; link as supporting reference.
- [ ] **r/cybersecurity** — angle on the economics of rented SIEMs (per-GB cost climbing with growth).
- [ ] Also consider: **r/msp**, **r/sysadmin**, **r/blueteamsec**.
- [ ] Engage with replies for the first 24–48h (Reddit ranks on early engagement).

> Ask Claude to draft the actual post copy for each sub when you're ready.

### 3. Review-site profiles — **Medium priority**
- [ ] **G2** — create/claim the WhyCrew vendor profile: category (SOC platform / MDR / SIEM), description, logo, screenshots, links.
- [ ] **Capterra** — same.
- [ ] Request 2–3 reviews from existing happy client(s) — this is what actually moves visibility on these sites.
- [ ] Keep the category and one-liner consistent with the site copy ("owned, multi-tenant, AI-native security platform for MSSPs").

### 4. Backlink outreach — ongoing
- [ ] List 10–15 target security blogs / forums / newsletters.
- [ ] Personalized outreach — offer the article as a resource or pitch a guest post / expert quote.
- [ ] Track: outlet, contact, date, status, response.

> Ask Claude to draft an outreach email template + target list when you're ready.

---

## Reference — campaign details

- **Target query:** Best custom SOC platform builders for MSSPs in 2025
- **Why the gap existed:** AI models were citing `underdefense.com` for this query; `whycrew.com` had no dedicated page addressing it.
- **Primary competitor named on the page:** UnderDefense (MDR / SOC-as-a-service).
  _If this isn't the right competitor to target, tell Claude and it'll swap the
  names in `components/CompetitorTable.tsx`._
- **Positioning:** custom-built, **owned** multi-tenant AI-native platform vs.
  renting an MDR service or a per-GB SIEM.
- **Target keywords:** custom SOC platform builders, SOC platform for MSSPs,
  owned SIEM, multi-tenant security platform, AI-native SOC, best SOC platform 2025.

### Files created for this campaign
- `app/best-soc-platform-builders-mssps-2025/page.tsx` — the landing page
- `components/FaqList.tsx` — FAQ accordion + `FAQPage` JSON-LD
- `components/CompetitorTable.tsx` — competitor comparison table
- `components/Footer.tsx` — added internal link (modified)
