import {
  ArrowRight,
  Zap,
  MessageSquare,
  Database,
  Calendar,
  Brain,
  Inbox,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ClipboardX,
  PhoneOff,
  TrendingDown,
  Phone,
  FileText,
  Mail,
  Clock,
  Repeat,
  ListChecks,
} from "lucide-react";
import Footer from "@/components/Footer";
import LeadLifecycleDemo from "@/components/LeadLifecycleDemo";
import OperationsFeed from "@/components/OperationsFeed";
import RoiCalculator from "@/components/RoiCalculator";
import FoundingMember from "@/components/FoundingMember";

const problems = [
  { icon: PhoneOff, title: "Missed follow-up", desc: "Newly assigned leads sit for hours while competitors are already on the phone." },
  { icon: ClipboardX, title: "Forgotten conversations", desc: "Context lives in scattered texts, emails, and someone's memory — never the CRM." },
  { icon: AlertTriangle, title: "Stale CRM data", desc: "Notes, activities, and next steps never get logged, so pipeline reporting is fiction." },
  { icon: TrendingDown, title: "Dropped opportunities", desc: "Warm leads go cold because the next step never gets taken." },
];

const capabilities = [
  { icon: Zap, title: "Speed-to-Lead", desc: "Engage newly assigned leads in under a minute — even while you're with another client." },
  { icon: Phone, title: "Guided calling workflow", desc: "Get prompted to call the right lead at the right moment, with context already loaded." },
  { icon: FileText, title: "AI-generated follow-up drafts", desc: "Personalized texts and emails written for you — you just approve and send." },
  { icon: Mail, title: "SMS & email coordination", desc: "One conversation, across channels, without you copy-pasting between apps." },
  { icon: Brain, title: "Conversation memory", desc: "Every preference, commitment, and timeline remembered — forever." },
  { icon: Calendar, title: "Showing scheduling", desc: "Coordinates showings against your real calendar availability, no back-and-forth." },
  { icon: Database, title: "Automatic Follow Up Boss updates", desc: "Calls, texts, notes, tasks, and activity written back so your CRM stays clean.", highlight: true },
  { icon: ListChecks, title: "Activity timeline", desc: "A clear, timestamped record of every operational action taken on your behalf." },
  { icon: Repeat, title: "Intelligent follow-up sequences", desc: "Keeps warm leads warm until someone responds — without sounding automated." },
  { icon: Clock, title: "Quiet hours & compliance", desc: "Respects local hours, opt-outs, and SMS regulations by default." },
  { icon: ShieldCheck, title: "Human approval", desc: "Sensitive messages pause for your one-tap approval. Automation never goes rogue." },
  { icon: Inbox, title: "Inbox management", desc: "Routine work stays automated. Only important conversations interrupt you." },
];

const outcomes = [
  "Never let another lead slip through the cracks",
  "AI that works continuously in the background",
  "Human approval whenever it actually matters",
  "A CRM that always reflects reality",
  "Every conversation remembered — forever",
  "More time selling, less time managing software",
];

const workflowSteps = [
  { label: "A new lead is assigned to you", tag: "Through your CRM" },
  { label: "Showing Ops responds instantly", tag: "You're notified · first outreach drafted" },
  { label: "You stay in control", tag: "Call · approve a draft · or let it run" },
  { label: "Your CRM updates itself", tag: "Calls · texts · notes · tasks · timeline" },
  { label: "Appointments get coordinated", tag: "Calendar · showings · reminders" },
  { label: "Nothing gets forgotten", tag: "Until the opportunity closes or is lost" },
];

const whileYouAreOut = [
  "Responding to newly assigned leads",
  "Following up with prospects",
  "Updating your CRM",
  "Drafting messages for your review",
  "Scheduling appointments and showings",
  "Remembering every conversation",
  "Watching for stalled opportunities",
  "Surfacing only what actually needs your attention",
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-serif text-xl tracking-tight text-foreground">
            Showing Ops
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#problem" className="hover:text-foreground transition">The Problem</a>
            <a href="#workflow" className="hover:text-foreground transition">How it works</a>
            <a href="#capabilities" className="hover:text-foreground transition">Capabilities</a>
            <a href="#operations-manager" className="hover:text-foreground transition">The Manager</a>
          </nav>
          <a
            href="#beta"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary/90"
          >
            Join Beta <ArrowRight size={14} />
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
          <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32 grid gap-14 md:grid-cols-[1.05fr_1fr] md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent tracking-wide">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                AI Operations Manager for Real Estate
              </span>
              <h1 className="mt-6 font-serif text-[2.75rem] md:text-[4.25rem] leading-[1.02] tracking-[-0.02em] text-foreground">
                No lead ever slips<br />
                <em className="text-accent not-italic italic">through the cracks.</em>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                Showing Ops is an always-on AI operations manager for real
                estate agents. It continuously executes the follow-up, CRM
                updates, scheduling, and operational work required to run
                your business — so you can spend more time selling homes.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#beta"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary/90"
                >
                  Join the Private Beta <ArrowRight size={16} />
                </a>
                <a
                  href="#workflow"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  See how it works
                </a>
              </div>
              <p className="mt-5 text-xs text-muted-foreground">
                Private beta · Onboarding brokerages and top-producing teams now
              </p>
            </div>

            {/* Workflow visualization */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-accent/15 via-secondary/10 to-transparent blur-2xl" aria-hidden />
              <div className="relative rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-5">
                <div className="flex items-center justify-between px-1 pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: "hsl(var(--accent))" }} />
                    <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                  </div>
                  <span className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Live · Ops loop
                  </span>
                </div>
                <ol className="mt-4 space-y-2.5">
                  {workflowSteps.map((s, i) => (
                    <li
                      key={s.label}
                      className="flex items-center gap-3 rounded-xl border border-border/70 bg-background px-3.5 py-3"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[0.72rem] font-semibold text-primary-foreground">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{s.label}</p>
                        <p className="text-[0.72rem] text-muted-foreground truncate">{s.tag}</p>
                      </div>
                      <CheckCircle2 size={16} className="text-accent shrink-0" />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-y border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            <span>Built for modern brokerages</span>
            <span className="hidden sm:inline text-border">·</span>
            <span>Works with Follow Up Boss</span>
            <span className="hidden sm:inline text-border">·</span>
            <span>Human-in-the-loop</span>
            <span className="hidden sm:inline text-border">·</span>
            <span>Always-on operations</span>
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">The Problem</span>
              <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
                Deals aren't lost because you're bad at selling.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                They're lost in the gaps between conversations — the follow-up
                that never happened, the CRM note that never got written, the
                lead that quietly fell out of memory.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {problems.map((p) => (
                <div key={p.title} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                    <p.icon size={18} />
                  </div>
                  <h3 className="mt-4 font-sans text-base font-semibold text-foreground tracking-tight">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow / How it works */}
        <section id="workflow" className="border-b border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">How it works</span>
              <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
                From assigned lead to closed deal — nothing falls through.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Your brokerage, ISA, or team lead assigns the lead in your
                CRM. From that moment on, Showing Ops takes over the
                operational work in the background — with you in control at
                every important step.
              </p>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              {workflowSteps.map((s, i) => (
                <div key={s.label} className="relative rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Step {i + 1}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-foreground leading-snug">{s.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.tag}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Capabilities</span>
              <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
                One platform. Every operational job, handled.
              </h2>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((c) => (
                <div
                  key={c.title}
                  className={`group rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 ${
                    c.highlight ? "border-accent/50 ring-1 ring-accent/20" : "border-border hover:border-accent/40"
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <c.icon size={18} />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <h3 className="font-sans text-base font-semibold text-foreground tracking-tight">{c.title}</h3>
                    {c.highlight && (
                      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-accent">Differentiator</span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Your AI Operations Manager — narrative */}
        <section id="operations-manager" className="border-b border-border bg-primary text-primary-foreground">
          <div className="mx-auto max-w-4xl px-6 py-28 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Your AI Operations Manager</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight">
              While you're showing homes…
            </h2>
            <p className="mt-5 text-lg leading-8 text-primary-foreground/70 max-w-2xl mx-auto">
              Showing Ops is quietly doing the operational work of a full-time
              chief of staff — in the background, without being asked.
            </p>

            <ul className="mt-12 grid gap-3 sm:grid-cols-2 text-left max-w-2xl mx-auto">
              {whileYouAreOut.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.04] px-4 py-3.5"
                >
                  <CheckCircle2 className="mt-0.5 text-accent shrink-0" size={18} />
                  <span className="text-sm text-primary-foreground/90">{line}</span>
                </li>
              ))}
            </ul>

            <p className="mt-12 font-serif text-2xl md:text-3xl leading-snug tracking-tight text-primary-foreground">
              Showing Ops quietly runs the operational side of your business
              <br className="hidden md:block" />
              so you can focus on relationships and closing deals.
            </p>
          </div>
        </section>

        {/* Outcomes */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24 grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Why realtors love it</span>
              <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
                Not another CRM plugin. An AI employee.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Showing Ops is the operational layer your business has been
                trying to hire for — always on, always accurate, always in the
                background.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                  <CheckCircle2 className="mt-0.5 text-accent shrink-0" size={18} />
                  <span className="text-sm text-foreground">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Vision */}
        <section className="border-b border-border bg-muted/40">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Where we're going</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
              The operating system for residential real estate.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We're building toward a single AI operations layer that runs the
              back-office of every real estate business — from lead
              engagement to closed transaction. The beta focuses on lead
              operations today; transaction coordination, agent onboarding,
              and back-office workflows are on the near-term roadmap.
            </p>
            <p className="mt-4 text-sm text-muted-foreground/80">
              We only ship what we've built. Roadmap items are clearly marked.
            </p>
          </div>
        </section>

        {/* Beta waitlist — includes the optional SMS opt-in with full A2P compliance text */}
        <BetaWaitlist />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
