import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArticleShell, type TocEntry } from "@/components/blog/article-shell";
import { Bullets, H2, H3, P } from "@/components/blog/prose";
import { Button } from "@/components/ui/button";
import { FaqAccordion, type FaqItem } from "@/components/ui/faq";
import { breadcrumbLd, faqLd } from "@/lib/jsonld";
import { breadcrumbLabel, postBySlug, postPath } from "@/lib/blog";
import { ROBOTS, SITE } from "@/lib/site";
import { ogImage, ogImageLd } from "@/lib/og";
import { authorLd } from "@/lib/authors";

const post = postBySlug("self-hosted-siem-system")!;
const PATH = postPath(post);
const IMG = "/blog/self-hosted-siem-system";

export const metadata: Metadata = {
  // `absolute` keeps the title exactly as specified in the content doc — the
  // root layout's "%s | WhyCrew" template would push it past the SERP cutoff.
  title: { absolute: post.metaTitle },
  description: post.metaDescription,
  alternates: { canonical: PATH },
  robots: ROBOTS,
  openGraph: {
    type: "article",
    title: post.metaTitle,
    description: post.metaDescription,
    url: `${SITE.url}${PATH}`,
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified ?? post.datePublished,
    images: ogImage(PATH),
  },
  twitter: {
    card: "summary_large_image",
    title: post.metaTitle,
    description: post.metaDescription,
    images: ogImage(PATH),
  },
};

const TOC: TocEntry[] = [
  { id: "tools", label: "Which Tools Can You Use For A Self-Hosted SIEM?" },
  { id: "step-by-step", label: "How To Build A Self-Hosted SIEM Step By Step" },
  { id: "how-it-works", label: "How Does A Self-Hosted SIEM Work?" },
  { id: "final-thoughts", label: "Final Thoughts" },
  { id: "faq", label: "Frequently Asked Questions About Self-Hosted SIEM" },
];

const FAQS: FaqItem[] = [
  {
    q: "Can I Build My Own SIEM?",
    a: "Yes. You can build your own SIEM by installing a platform such as Wazuh on a 64-bit Linux server or virtual machine, enrolling agents on the machines you want to monitor, and turning on detection rules. A basic single-server setup is realistic for one person with Linux skills.",
  },
  {
    q: "Can I Install A Self-Hosted SIEM With Docker?",
    a: "Yes. Wazuh publishes official Docker images with two ready-made stacks: a single-node stack with one indexer, manager and dashboard container, and a multi-node stack for clusters. Wazuh's Docker documentation asks for at least 8 GB of RAM on the host for the single-node stack and 16 GB for the multi-node stack, and you must raise the host's vm.max_map_count setting to 262144. Agents are still installed on each endpoint the same way.",
  },
];

function articleLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE.url}${PATH}#article`,
    headline: post.title,
    name: post.metaTitle,
    description: post.metaDescription,
    url: `${SITE.url}${PATH}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}${PATH}` },
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE.url}/#website` },
    author: authorLd(post.author),
    publisher: { "@id": `${SITE.url}/#organization` },
    about: [
      { "@type": "Thing", name: "Security information and event management" },
      { "@type": "SoftwareApplication", name: "Wazuh" },
    ],
    image: ogImageLd(PATH),
    articleSection: post.cluster,
    keywords: post.topics.join(", "),
  };
}

/* ------------------------------------------------- page-local design blocks */

/** In-body link to a site route. */
function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
    >
      {children}
    </Link>
  );
}

/** Fourth-level heading for the sub-steps inside Phases 4 and 5. */
function H4({ children }: { children: ReactNode }) {
  return (
    <h4 className="pt-6 text-[15.5px] font-semibold leading-snug text-bright">
      {children}
    </h4>
  );
}

/** Inline file path, command or setting name. */
function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded border border-line/70 bg-surface-2 px-1.5 py-px font-mono text-[0.88em] font-medium text-bright">
      {children}
    </code>
  );
}

/** Multi-line command or config snippet, copied verbatim from the doc. */
function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <pre
      aria-label={label}
      className="mt-4 overflow-x-auto rounded-lg border border-line/70 bg-surface px-5 py-[18px] font-mono text-[13.5px] font-medium leading-[1.85] text-body"
    >
      <code>{code}</code>
    </pre>
  );
}

/** Diagram from the doc: its label line, then its caption sentence. */
function Fig({
  file,
  height,
  label,
  children,
}: {
  file: string;
  height: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <figure className="mt-8 mb-2">
      <Image
        src={`${IMG}/${file}`}
        alt={label}
        width={1344}
        height={height}
        sizes="(min-width: 768px) 48rem, 100vw"
        className="block h-auto w-full rounded-lg border border-line/70 bg-white"
      />
      <figcaption className="mt-3 text-[13.5px] leading-relaxed text-faint">
        <span className="block font-medium text-body">{label}</span>
        <span className="mt-1 block">{children}</span>
      </figcaption>
    </figure>
  );
}

/** Inline CTA card, same frame as the other posts, titled with the doc's lead-in. */
function CtaCard({
  title,
  body,
  children,
}: {
  title: string;
  body: ReactNode;
  children: ReactNode;
}) {
  return (
    <aside
      aria-label={title}
      className="relative mt-10 rounded-lg border border-accent/30 bg-gradient-to-br from-accent/8 via-surface/60 to-surface/60 p-6 sm:p-7"
    >
      <span aria-hidden className="absolute -top-px left-7 h-0.5 w-14 bg-accent" />
      <h3 className="text-[1.4rem] font-semibold leading-tight tracking-tight text-bright">
        {title}
      </h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-body">{body}</p>
      <div className="mt-5 flex flex-wrap gap-2.5">{children}</div>
    </aside>
  );
}

/* ---------------------------------------------------------------- snippets */

const INSTALL_CMD =
  "curl -sO https://packages.wazuh.com/4.14/wazuh-install.sh && sudo bash ./wazuh-install.sh -a";

const AGENT_START = `# Linux (as root)
systemctl daemon-reload
systemctl enable wazuh-agent
systemctl start wazuh-agent

# Windows (Command Prompt as Administrator)
NET START WazuhSvc`;

const SYSMON_LOCALFILE = `<localfile>
  <location>Microsoft-Windows-Sysmon/Operational</location>
  <log_format>eventchannel</log_format>
</localfile>`;

const SYSLOG_REMOTE = `<remote>
  <connection>syslog</connection>
  <port>514</port>
  <protocol>udp</protocol>
  <allowed-ips>192.168.1.0/24</allowed-ips>
  <local_ip>192.168.1.50</local_ip>
</remote>`;

const SURICATA_LOCALFILE = `<localfile>
  <log_format>json</log_format>
  <location>/var/log/suricata/eve.json</location>
</localfile>`;

const SYSCHECK = `<syscheck>
  <directories realtime="yes">/etc,/usr/bin,/usr/sbin</directories>
</syscheck>`;

const WIN_AGENT_CONF = "C:\\Program Files (x86)\\ossec-agent\\ossec.conf";

/* ------------------------------------------------------------------- page */

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: breadcrumbLabel(post.slug), path: PATH },
            ])
          ),
        }}
      />

      <ArticleShell post={post} toc={TOC}>
        <P>
          A self-hosted SIEM (Security Information and Event Management) is a
          security monitoring platform you install and run on your own servers,
          virtual machines or private cloud instead of renting it from a vendor.
          It collects logs from endpoints, servers, firewalls and cloud
          services, normalizes them, runs detection rules and raises alerts,
          while all of that data stays on infrastructure you control.
        </P>
        <P>
          Building a self-hosted SIEM with an open-source platform such as Wazuh
          gives you centralized log collection, threat detection and file
          integrity monitoring across your network. You set it up in five
          phases: prepare the hardware and a Linux server, install the SIEM
          platform, deploy agents on your endpoints, configure log parsing, file
          integrity monitoring and detection rules, and then test and tune it.
        </P>

        <H2 id="tools">Which Tools Can You Use For A Self-Hosted SIEM?</H2>
        <P>
          You can build a self-hosted SIEM on any{" "}
          <A href="/blog/open-source-siem">open source SIEM</A> such as Wazuh,
          Security Onion, Elastic Security or OpenSearch. This guide uses Wazuh
          because it installs the agent, manager, indexer and dashboard
          together, which makes it the simplest path for a first build.
        </P>

        <H2 id="step-by-step">How To Build A Self-Hosted SIEM Step By Step</H2>
        <P>
          Building a self-hosted SIEM takes five phases: hardware and
          environment, platform install, endpoint agents, log parsing with file
          integrity monitoring and rules, and finally testing and tuning. The
          examples below use Wazuh.
        </P>

        {/* ------------------------------------------------------- Phase 1 */}
        <H3>Phase 1: Hardware And Environment Requirements</H3>
        <P>
          For a home lab or small test environment of up to 25 agents with 90
          days of data, Wazuh&apos;s official documentation calls for a server
          like this:
        </P>
        <Bullets
          items={[
            "Hypervisor: VMware Workstation Pro, VirtualBox or Proxmox, or a bare-metal server",
            "CPU: 4 vCPUs",
            "RAM: 8 GiB",
            "Storage: 50 GB, rising to 100 GB for 26 to 50 agents and 200 GB for 51 to 100 agents",
            "OS: a 64-bit Ubuntu Server LTS release such as 22.04 or 24.04 (Red Hat Enterprise Linux and Amazon Linux are also supported)",
          ]}
        />
        <P>
          Give the VM a static IP address or a bridged network adapter so your
          endpoints can reach it, and turn on time sync. Then take a snapshot. A
          clean snapshot turns a broken install into a quick rollback instead of
          an evening of troubleshooting.
        </P>
        <P>
          This is a single-node build, with every component on one server. Once
          your data outgrows one machine, the indexer can be split across a
          cluster of several nodes.
        </P>
        <Fig
          file="home-siem-lab-layout.png"
          height={636}
          label="Phase 1 · home SIEM lab layout, 3 VMs on one host + router"
        >
          A typical home lab puts the SIEM server between two endpoints on one
          hypervisor, with the home router sending its logs in from outside.
        </Fig>
        <Fig
          file="vm-settings-snapshot.png"
          height={494}
          label="Phase 1 · VM settings for up to 25 agents, plus the snapshot safety net"
        >
          The settings match Wazuh&apos;s documented minimum for up to 25
          agents; the dashed line is the rollback the snapshot gives you.
        </Fig>

        {/* ------------------------------------------------------- Phase 2 */}
        <H3>Phase 2: Install The SIEM Platform</H3>
        <P>
          Wazuh&apos;s quickstart installs the manager, indexer and dashboard on
          one host with a single script. The manager (also called the Wazuh
          server) receives and analyzes events, the indexer stores them so you
          can search them, and the dashboard is the web page where you see
          alerts. On a supported Linux system, the documented command is:
        </P>
        <CodeBlock label="Wazuh all-in-one install command" code={INSTALL_CMD} />
        <P>
          The script prints the admin password when it finishes, and all
          generated passwords are also saved in <Code>wazuh-passwords.txt</Code>{" "}
          inside the <Code>wazuh-install-files.tar</Code> archive. Save it, then
          open <Code>https://your-server-ip</Code> in a browser and log in with
          the username <Code>admin</Code> and that password. Your browser will
          warn about a self-signed certificate; accept it for now, and replace
          the certificate before anyone else uses the system.
        </P>
        <Fig
          file="all-in-one-install.png"
          height={650}
          label="Phase 2 · all-in-one install, simplified output"
        >
          The <Code>-a</Code> flag puts all three components on the same
          machine, and you reach the result from any browser on your network.
        </Fig>

        {/* ------------------------------------------------------- Phase 3 */}
        <H3>Phase 3: Deploy Endpoint Agents</H3>
        <P>
          A SIEM is only useful once data flows into it, and agents are how
          endpoints send that data. In the Wazuh dashboard, go to Agents
          management &gt; Summary and click Deploy new agent. Pick the operating
          system (Windows, Linux or macOS), enter the server&apos;s IP address,
          and the dashboard generates the exact install and enrollment command
          for that endpoint.
        </P>
        <P>
          Run that command on the endpoint, then start the agent service so it
          begins streaming system logs, authentication events and file changes
          to the manager:
        </P>
        <CodeBlock label="Start the Wazuh agent on Linux and Windows" code={AGENT_START} />
        <P>
          On Windows, install Sysmon first. Sysmon is a free Microsoft
          Sysinternals tool that logs process starts, network connections and
          file creation in detail. Then add the Sysmon event channel to the
          agent&apos;s configuration, because default Windows logging misses
          most of what attackers do after they get in.
        </P>
        <P>
          To do that, open <Code>{WIN_AGENT_CONF}</Code> on the Windows
          endpoint, add this block inside the <Code>ossec_config</Code> section,
          and save the file:
        </P>
        <CodeBlock label="Sysmon event channel block for ossec.conf" code={SYSMON_LOCALFILE} />
        <P>
          Then restart the agent in PowerShell with{" "}
          <Code>Restart-Service -Name wazuh</Code>, and Sysmon events will start
          showing up in the dashboard.
        </P>
        <Fig
          file="agent-data-flow-ports.png"
          height={522}
          label="Phase 3 · agent data flow and the two Wazuh 4.x ports"
        >
          Open TCP ports 1514 and 1515 on the server&apos;s firewall, or agents
          will install fine but never show up as connected.
        </Fig>

        {/* ------------------------------------------------------- Phase 4 */}
        <H3>Phase 4: Configure Log Parsing, FIM And Rules</H3>
        <P>
          Phase 4 turns raw logs into alerts you can act on. Decide what you
          want to catch, bring in every log source that reveals it, switch on
          file integrity monitoring, check that fields are parsed, and then
          enable detection rules.
        </P>

        <H4>Decide What You Want To Detect</H4>
        <P>
          Before you switch on any rules, write down the attacks you care about.
          Brute-force logins, new admin accounts, malware launched from a
          user&apos;s Downloads folder and changes to critical files are
          sensible first targets. Each target tells you which log you need, and
          logs you don&apos;t need just cost you disk.
        </P>
        <Fig
          file="attack-targets-log-sources.png"
          height={622}
          label="Phase 4 · attack targets mapped to the logs that reveal them"
        >
          Windows event 4625 is a failed logon, 4720 a new user account and 4732
          a user added to a local security group, such as Administrators.
        </Fig>

        <H4>Bring In Network And Firewall Logs</H4>
        <P>
          The Wazuh server&apos;s syslog listener is turned off by default, so
          switch it on first. On the server, add this block inside the{" "}
          <Code>ossec_config</Code> section of{" "}
          <Code>/var/ossec/etc/ossec.conf</Code>, replacing the two addresses
          with your firewall&apos;s network and your server&apos;s own IP:
        </P>
        <CodeBlock label="Syslog listener block for the Wazuh server" code={SYSLOG_REMOTE} />
        <P>
          The <Code>allowed-ips</Code> line is mandatory; without it the setting
          doesn&apos;t take effect. Use <Code>tcp</Code> instead of{" "}
          <Code>udp</Code> if your firewall sends syslog over TCP. Then restart
          the manager with <Code>systemctl restart wazuh-manager</Code>.
        </P>
        <P>
          Configure your firewall or router to send syslog (the standard way
          network devices ship their logs) to the SIEM server, then confirm the
          events arrive and parse into named fields rather than one long text
          string. Optional for a first build: if you want network intrusion
          alerts, run Suricata (an engine that inspects network traffic for
          attacks) on a machine connected to a mirrored switch port, then
          install a Wazuh agent on that machine and add this block to its{" "}
          <Code>/var/ossec/etc/ossec.conf</Code> file so it reads
          Suricata&apos;s alert log:
        </P>
        <CodeBlock label="Suricata alert log block for ossec.conf" code={SURICATA_LOCALFILE} />
        <P>
          Restart the agent, and Wazuh parses Suricata&apos;s alerts
          automatically.
        </P>
        <Fig
          file="network-feeds-into-siem.png"
          height={508}
          label="Phase 4 · two network feeds into the SIEM"
        >
          The firewall talks to the SIEM directly over syslog; Suricata only
          sees a copy of the traffic, so it can&apos;t slow your network down.
        </Fig>

        <H4>Turn On File Integrity Monitoring</H4>
        <P>
          File integrity monitoring (FIM) alerts you when a watched file is
          created, changed or deleted. In Wazuh the FIM module is called
          syscheck, and you set it in the agent&apos;s <Code>ossec.conf</Code>{" "}
          file (<Code>/var/ossec/etc/ossec.conf</Code> on Linux,{" "}
          <Code>{WIN_AGENT_CONF}</Code> on Windows). To watch key Linux system
          folders in real time, add:
        </P>
        <CodeBlock label="Real-time FIM block for Linux system folders" code={SYSCHECK} />
        <P>
          On Windows, Wazuh&apos;s default configuration already watches key
          system folders such as{" "}
          <Code>{"C:\\Windows\\System32\\drivers\\etc"}</Code>. To add your
          own, use the same syntax with a Windows path, for example{" "}
          <Code>{"C:\\Users\\*\\Downloads"}</Code> to watch every user&apos;s
          Downloads folder. Each watched folder must exist before you restart
          the agent, and you need to restart the agent after every change to{" "}
          <Code>ossec.conf</Code> so the new settings load.
        </P>

        <H4>Check That Fields Are Parsed</H4>
        <P>
          Wazuh decoders, small parsing rules that know how to read each log
          format, pull fields such as <Code>srcip</Code>, <Code>srcuser</Code>{" "}
          and <Code>action</Code> out of each log line, which is what lets one
          rule work across many log sources. Open a few events from each source
          in the dashboard and confirm those fields are filled. A log that shows
          only one long <Code>full_log</Code> string needs a custom decoder
          before rules can use it.
        </P>

        <H4>Enable Detection Rules And Map Them To MITRE ATT&amp;CK</H4>
        <P>
          Enable the built-in rule sets, then open Threat intelligence &gt;
          MITRE ATT&amp;CK in the dashboard to see which techniques your current
          logs can cover. Gaps usually point to a missing log source, not a
          missing rule. If nothing covers credential theft, for example, you
          probably aren&apos;t collecting the right Windows process events yet.
        </P>
        <Fig
          file="wazuh-rule-5763-brute-force.png"
          height={400}
          label="Phase 4 · how Wazuh rule 5763 turns failed SSH logins into one alert"
        >
          Eight failed-login lines mean little on their own. Wazuh&apos;s
          built-in rule 5763 counts them per source IP and raises one level 10
          alert tagged with MITRE ATT&amp;CK T1110 (Brute Force), so the analyst
          knows what to look at first.
        </Fig>
        <P>
          If you want longer log pipelines or custom dashboards later, Graylog
          or Grafana can run alongside Wazuh, but neither is needed for a first
          build.
        </P>

        {/* ------------------------------------------------------- Phase 5 */}
        <H3>Phase 5: Test, Tune And Lock It Down</H3>
        <P>
          A SIEM that has never caught a test attack is a guess. This phase
          proves your rules fire, cuts the noise and secures the server itself.
        </P>

        <H4>Run Simulated Attacks</H4>
        <P>
          Run a few tests from Atomic Red Team, an open library of small attack
          simulations mapped to MITRE ATT&amp;CK, on your test machine, one
          technique at a time. Then try eight or more failed SSH logins from one
          machine against your Linux endpoint; Wazuh&apos;s rule 5763 should
          fire. Every test that doesn&apos;t produce an alert is a detection gap
          you&apos;ve found before a real attacker does.
        </P>
        <Fig
          file="detection-test-loop.png"
          height={516}
          label="Phase 5 · the detection test loop"
        >
          T1110.001 is the ATT&amp;CK ID for password guessing; repeat the loop
          for each technique on your detection list until every one ends in a
          working rule.
        </Fig>

        <H4>Tune Alerts, Set Retention And Harden The Server</H4>
        <P>
          Expect noise in the first week. Lower the level of rules that fire on
          normal admin activity instead of deleting them, so you keep the
          record. Create an Index State Management (ISM) retention policy under
          Indexer management &gt; Index Management, a rule that deletes old
          indices automatically once they pass the age you set, back up your
          configuration and custom rules, replace the self-signed certificate,
          change default passwords and limit dashboard access to your own
          network or a VPN.
        </P>
        <Fig
          file="tuning-retention-hardening.png"
          height={714}
          label="Phase 5 · tuning, retention and hardening"
        >
          Hot data sits in the searchable index; archived data is stored more
          cheaply and restored when you need it. The three-month and
          twelve-month split comes from PCI DSS 10.5.1, the payment card
          security standard. If no regulation applies to you, keep as much hot
          data as you realistically need for investigations. Retention is also
          the main reason storage keeps growing, so it shapes{" "}
          <A href="/blog/siem-cost-licensing-vs-custom-built">
            what a SIEM costs over time
          </A>
          .
        </Fig>
        <P>
          As the build grows, match it to what you plan to monitor: Windows and
          Linux endpoints need agents, firewalls and switches need syslog, and
          cloud services need their audit logs pulled in. Once the core
          detections work, teams often add Velociraptor for endpoint forensics
          and Shuffle for SOAR (security orchestration, automation and
          response), which runs response steps automatically when an alert
          fires.
        </P>

        <CtaCard
          title="Own your platform"
          body="Tired of a SIEM bill that grows with every new client? WhyCrew builds your SIEM and SOC platform for one fixed price, then hands you full ownership."
        >
          <Button href="/contact">Get a fixed-price estimate</Button>
          <Button href="/services/custom-siem-development" variant="ghost">
            Custom SIEM Build
          </Button>
        </CtaCard>

        <H2 id="how-it-works">How Does A Self-Hosted SIEM Work?</H2>
        <P>
          Like any <A href="/blog/what-is-siem">SIEM</A>, a self-hosted SIEM
          works as a pipeline: agents and log shippers collect events, a server
          parses and normalizes them, an indexer stores them, a rules engine
          checks them for attack patterns, and a dashboard shows the resulting
          alerts to an analyst. Every stage runs on hardware you manage.
        </P>
        <Fig
          file="self-hosted-siem-pipeline.png"
          height={728}
          label="Self-hosted SIEM pipeline · 4 sources, 4 stages"
        >
          Every source feeds the same four stages on your server, and only the
          detection stage turns raw logs into alerts an analyst sees.
        </Fig>

        <H3>Collection</H3>
        <P>
          Small programs called agents sit on each monitored machine and forward
          its logs: Windows event logs, Linux authentication logs, file changes
          and running processes. Network devices such as firewalls can&apos;t
          run an agent, so they send logs over syslog, the standard protocol for
          shipping log lines across a network.
        </P>

        <H3>Parsing And Normalization</H3>
        <P>
          Raw logs arrive in dozens of formats. The SIEM parses each one with a
          decoder, then normalizes it, which means mapping the fields into one
          shared schema. That way &quot;source IP&quot; means the same thing
          whether it came from a firewall or a Windows server, and one rule can
          work across every log source.
        </P>

        <H3>Storage And Indexing</H3>
        <P>
          Normalized events are written to an indexer, a search database
          (usually built on OpenSearch or Elasticsearch) that makes huge volumes
          of records searchable in seconds. This is the part that eats disk
          space, so it&apos;s the part you size most carefully.
        </P>

        <H3>Detection And Correlation</H3>
        <P>
          A rules engine compares incoming events against detection rules. Some
          rules match a single event, like a new local admin account.
          Correlation rules link several events, such as eight failed logins
          from the same address within a short time. Good platforms tag each
          rule with a technique from MITRE ATT&amp;CK, a public catalog of real
          attacker behavior.
        </P>

        <H3>Alerting And Investigation</H3>
        <P>
          When a rule fires, the SIEM creates an alert with a severity level and
          shows it on a dashboard. An analyst opens the alert, looks at the
          surrounding logs and decides whether it&apos;s a real incident. Some
          platforms can also run an automatic response, such as blocking an IP
          address on the affected host.
        </P>

        <CtaCard
          title="For MSSPs"
          body={
            <>
              Running SIEM for many clients, not just one network? WhyCrew
              builds a multi-tenant SIEM platform for your{" "}
              <A href="/blog/what-is-an-mssp">MSSP</A>. You pay once, you own
              it, and there is no per-GB license.
            </>
          }
        >
          <Button href="/contact">Get a fixed-price estimate</Button>
          <Button href="/services/custom-siem-development" variant="ghost">
            Custom SIEM Platform
          </Button>
        </CtaCard>

        <H2 id="final-thoughts">Final Thoughts</H2>
        <P>
          Building a self-hosted SIEM is very doable. A single Linux server and
          a few agents will get you real alerts. The install is the easy part,
          though.
        </P>
        <P>
          What makes a SIEM useful is everything after it: the right log
          sources, rules tested against real techniques, retention planned
          around your requirements, and a person who reads the alerts every day.
          Start small, prove each detection works, and grow the build only as
          fast as you can keep it tuned.
        </P>

        <CtaCard
          title="Build with WhyCrew"
          body="Ready to give your MSSP its own SIEM platform? Tell us how many clients and how much data you handle, and we'll send a fixed-price plan for a platform you own outright."
        >
          <Button href="/contact">Talk to an engineer</Button>
          <Button href="/services/custom-siem-development" variant="ghost">
            Custom SIEM Development
          </Button>
        </CtaCard>

        <H2 id="faq">Frequently Asked Questions About Self-Hosted SIEM</H2>
        <div className="mt-6">
          <FaqAccordion faqs={FAQS} columns={1} />
        </div>
      </ArticleShell>
    </>
  );
}
