export type FaqItem = { q: string; a: string };

/**
 * FAQ copy lives here rather than beside the page that renders it because the
 * FAQPage JSON-LD is emitted from each route group's root layout — the only
 * place that can write into <head> — while the accordion is rendered by the
 * page. Both read this one array, so the markup and the visible questions
 * cannot drift apart.
 */
export const HOME_FAQS: FaqItem[] = [
  {
    q: "What is the difference between WhyCrew and a subscription SIEM vendor?",
    a: "Subscription vendors sell access to their platform under per-GB licensing. WhyCrew builds a custom platform and transfers full ownership to you. You control the roadmap, the data, and the economics. We're an engineering partner, not a SaaS provider.",
  },
  {
    q: "Do you only work with European MSSPs?",
    a: "No. Our strongest track record is in Europe, across NIS2, DORA, and GDPR, but the same architecture and ownership model applies to MSSPs and regulated operators everywhere.",
  },
  {
    q: "How much does a typical SIEM migration cost?",
    a: "Projects are scoped and priced individually based on log volume, retention requirements, and integration complexity. Most clients see a 40 to 70 percent reduction in total SIEM cost within the first 12 months. You receive a fixed-price proposal after the initial architecture audit.",
  },
  {
    q: "Do you own the platform WhyCrew builds for you?",
    a: "Yes. Everything we build is yours — the platform, the source code, and all underlying components. We provide the engineering, you own the output outright. That means you control the infrastructure, the roadmap, and the data, with no ongoing licensing and no vendor dependency. Every engagement includes API documentation, deployment runbooks, and hands-on engineering training so your team can run and evolve it independently.",
  },
  {
    q: "Is the AI SOC automation truly on-premise?",
    a: "Yes. We deploy open-weight LLMs directly on your infrastructure or your own cloud tenant. No external AI services. No data leaves your perimeter — ever.",
  },
  {
    q: "Can you help us meet NIS2 Article 21 requirements?",
    a: "Yes. We implement NIS2 Article 21 as a structured engineering service — covering incident detection, 24-hour reporting, evidence collection, and supervisory notification. One French financial services client was fully audit-ready in three weeks.",
  },
  {
    q: "How long does implementation take?",
    a: "Standard SIEM migration and platform builds take 8 to 12 weeks from kickoff to production. White-label MSSP platforms deploy in 8 weeks. NIS2 compliance automation typically takes 4 to 6 weeks depending on integration depth.",
  },
];

export const SOC_FAQS: FaqItem[] = [
  {
    q: "What is a custom SOC platform builder?",
    a: "A custom SOC platform builder is an engineering partner that designs and builds a security operations platform your MSSP owns outright — multi-tenant SIEM, detection, and AI-assisted investigation — instead of selling you a subscription to their own tool. You keep the platform, the data, and the code.",
  },
  {
    q: "Why would an MSSP build a custom SOC platform instead of using Splunk or Sentinel?",
    a: "Rented SIEMs like Splunk, Sentinel, and QRadar are priced per gigabyte and raise rates every year, so your biggest cost climbs every time you win a client. A custom, owned platform turns that climbing rental into a flat asset you control — every new tenant becomes margin instead of another license fee — while keeping client data inside your own boundary.",
  },
  {
    q: "What should MSSPs look for in a SOC platform builder in 2025?",
    a: "Look for six things: true ownership with source code in escrow, multi-tenancy built into the core, AI-native and auditable investigation, data that stays inside your boundary (on-prem or in-country where required), economics that don't climb per client, and a builder with a real security-engineering background and a platform already live in production.",
  },
  {
    q: "How is WhyCrew different from an MDR provider like UnderDefense?",
    a: "MDR and SOC-as-a-service providers run a managed service on their own stack — you rent their people and their platform. WhyCrew builds you your own multi-tenant, AI-native SOC platform that you own perpetually, with your client data inside your boundary and source code held in escrow. You are buying an asset, not a subscription to someone else's operation.",
  },
  {
    q: "Is switching to a custom-built SOC platform risky?",
    a: "It doesn't have to be. WhyCrew never does a big-bang cutover — your existing SIEM keeps running while we migrate tenant by tenant, highest-cost first, proving each client on the new platform before anything is switched off. Savings start during the migration, not a year after it.",
  },
  {
    q: "How much does a custom SOC platform cost to build?",
    a: "A standard build is priced from reuse of a proven core engine, so it is far less than building from scratch — and typically lower than a single year of what you would keep paying a rented SIEM forever. WhyCrew structures payment against delivery milestones and sizes the number against your real vendor invoice on a call.",
  },
];
