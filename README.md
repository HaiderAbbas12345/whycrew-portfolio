# WhyCrew — Next.js

A premium, CISO-grade rebuild of the WhyCrew marketing site: owned, multi-tenant, AI-native
SOC platforms for MSSPs. Same concept and copy as the original static site, re-engineered with a
proper design system and motion.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (custom dark design system, gold = own / blue = rent)
- **Framer Motion** (scroll reveals, animated cost chart, count-up stats, scroll progress bar)
- **next/font** (Bricolage Grotesque · IBM Plex Sans · IBM Plex Mono)
- **lucide-react** icons

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

## Structure

```
app/
  layout.tsx            # fonts, metadata, ambient background, nav + footer
  page.tsx              # home (hero + cost chart, services, why, CTA)
  for-mssps/            # flagship: problem → shift → math → why → regions → how
  ai-workflows/
  integrations/
  workflow-automation/
  security-products/
  case-studies/
components/              # Nav, Footer, Logo, CostChart, Counter, Reveal, Primitives
lib/site.ts             # nav + services content (single source of truth)
public/logo.jpeg        # brand mark (also favicon / OG)
```

## Design notes

- **Gold (`own`)** = the asset you own. **Cool blue (`rent`)** = the meter you rent. This semantic
  runs through the whole site, anchored by the animated "rent climbs vs own stays flat" chart.
- Ambient layered background: radial brand glows + faint grid + grain, all behind a `-z` layer.
- Respects `prefers-reduced-motion`.
- The case-studies featured block keeps the original "replace with real client numbers" placeholder
  intentionally — swap it once a reference figure is approved.
