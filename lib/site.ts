export const SITE = {
  name: "WhyCrew",
  email: "hello@whycrew.com",
  tagline: "Security, AI, and integrations for systems you can't get wrong.",
  domain: "whycrew.com",
};

export const NAV = [
  { label: "Home", href: "/" },
  { label: "For MSSPs", href: "/for-mssps" },
  { label: "Services", href: "/#services" },
  { label: "Case studies", href: "/case-studies" },
];

export type Service = {
  slug: string;
  href: string;
  cat: string;
  title: string;
  blurb: string;
  flagship?: boolean;
};

export const SERVICES: Service[] = [
  {
    slug: "for-mssps",
    href: "/for-mssps",
    cat: "Flagship · For MSSPs",
    title: "Owned SOC platforms for MSSPs",
    blurb:
      "Stop renting Splunk, Sentinel, or QRadar. We build MSSPs their own multi-tenant, AI-native security platform — so growth stops raising your costs and every new client becomes margin.",
    flagship: true,
  },
  {
    slug: "ai-workflows",
    href: "/ai-workflows",
    cat: "AI & Agentic",
    title: "AI & agentic workflows",
    blurb:
      "AI and agents built into your product or operations, with the data controls that make them safe to ship in production.",
  },
  {
    slug: "integrations",
    href: "/integrations",
    cat: "Integrations",
    title: "Integrations",
    blurb:
      "Connect your tools, systems, and APIs into one clean flow, so data moves instead of being copied by hand.",
  },
  {
    slug: "workflow-automation",
    href: "/workflow-automation",
    cat: "Automation",
    title: "Workflow automation",
    blurb:
      "Automate the repetitive, rule-based work with deterministic playbooks, so your team's time goes to what needs a human.",
  },
  {
    slug: "security-products",
    href: "/security-products",
    cat: "Product Development",
    title: "Cybersecurity product development",
    blurb:
      "Security tooling and products, from detection engines to dashboards, built by people who understand threats.",
  },
];
