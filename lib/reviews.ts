/**
 * Client reviews, quoted word for word from WhyCrew's Upwork profile.
 *
 * The text is the clients' own, typos included ("has a an"): these are
 * published as quotes, so correcting them would misquote the reviewer. The
 * curly quote marks are added where the text is rendered, not stored here.
 */

export interface Review {
  id: "ciso" | "essome" | "uzair" | "research";
  quote: string;
  name: string;
  role: string;
  /** Kicker above the quote when it is shown on its own (service pages). */
  context: string;
  /** A shorter cut of the same words, for tight spots like the contact panel. */
  excerpt?: string;
  /**
   * Quote size on the desktop slider. The design sizes each one so the
   * longest and the shortest still fill the same card.
   */
  size: string;
}

export const REVIEWS: Review[] = [
  {
    id: "ciso",
    quote:
      "They engineered and executed the full migration of our MSSP platform from public cloud to an air-gapped, on-premises architecture. Handling national security-grade telemetry requires rare precision and deep low-level engineering expertise—they delivered on every front, flawlessly ensuring compliance and total data isolation.",
    name: "Confidential Client",
    role: "Chief Information Security Officer (CISO)",
    context: "From an MSSP platform client",
    size: "lg:text-[22px]",
  },
  {
    id: "essome",
    quote:
      "Exceptional threat hunting and SOC architecture expertise. They uncovered evasive threats within our network that existing controls missed and implemented robust, scalable SOC processes. A world-class cybersecurity delivery partner.",
    name: "Essome Mbu",
    role: "Enterprise Security Client, USA",
    context: "From an enterprise security client",
    excerpt:
      "They uncovered evasive threats within our network that existing controls missed and implemented robust, scalable SOC processes.",
    size: "lg:text-[24px]",
  },
  {
    id: "uzair",
    quote:
      "Yasir served as a specialized security engineering partner to advance our machine learning architecture for advanced threat detection and behavioral analysis. I highly recommend Yasir Abbas and WhyCrew for strategic implementation, custom security engineering, or advanced platform architecture initiatives.",
    name: "Uzair Javaid",
    role: "CEO & Co-Founder, BetterData",
    context: "From a security engineering client",
    size: "lg:text-[22px]",
  },
  {
    id: "research",
    quote:
      "Yasir is very knowledgeable researcher who has a an experimental mindset to make the project results better.",
    name: "Confidential Client",
    role: "Research Client",
    context: "From a research client",
    size: "lg:text-[28px]",
  },
];

export const reviewById = (id: Review["id"]): Review => {
  const r = REVIEWS.find((x) => x.id === id);
  if (!r) throw new Error(`Unknown review: ${id}`);
  return r;
};

/** Every review on the profile is five stars. */
export const RATING_LABEL = "5.0 on Upwork";

export const REVIEW_PROFILES = [
  { name: "Clutch", href: "https://clutch.co/profile/whycrew-0" },
  { name: "G2", href: "https://www.g2.com/products/whycrew/reviews" },
] as const;
