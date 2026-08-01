import {
  ArrowRight,
  Zap,
  Brain,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ClipboardX,
  PhoneOff,
  TrendingDown,
  Database,
  CalendarClock,
  BellRing,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import LeadLifecycleDemo from "@/components/LeadLifecycleDemo";
import OperationsFeed from "@/components/OperationsFeed";
import FoundingMember from "@/components/FoundingMember";

const problems = [
  { icon: PhoneOff, title: "Follow-up gets delayed", desc: "A new lead sits for hours because you were mid-showing, not because you didn't care." },
  { icon: ClipboardX, title: "Conversations get forgotten", desc: "Context lives in scattered threads and someone's memory instead of one place." },
  { icon: AlertTriangle, title: "CRM data goes stale", desc: "Notes, activity, and next steps never get logged, so your pipeline stops reflecting reality." },
  { icon: TrendingDown, title: "Tasks fall through the cracks", desc: "There aren't enough hours in the day, so the next step quietly never gets taken." },
];

const capabilities = [
  {
    icon: Zap,
    title: "Response and follow-up",
    desc: "Newly assigned leads get a reply in under a minute, and warm leads keep hearing from you until someone responds.",
  },
  {
    icon: Brain,
    title: "Conversation memory and context",
    desc: "Every preference, commitment, and timeline is remembered and ready before you pick up the phone.",
  },
  {
    icon: Database,
    title: "CRM accuracy",
    desc: "Calls, texts, notes, tasks, and activity are written back to Follow Up Boss, so your pipeline stays true.",
    highlight: true,
  },
  {
    icon: CalendarClock,
    title: "Scheduling and preparation",
    desc: "Showings are coordinated against your real calendar, and you arrive with the background already gathered.",
  },
  {
    icon: BellRing,
    title: "Reminders and task management",
    desc: "The right next step is prepared and surfaced at the right moment, instead of living on a sticky note.",
  },
  {
    icon: ShieldCheck,
    title: "Decisions that need you",
    desc: "Routine operational work runs quietly. Anything requiring your judgment pauses for a one-tap decision.",
  },
];

const outcomes = [
  "You stop holding your entire pipeline in your head",
  "Nothing waits on you to remember it",
  "Your CRM reflects reality without you maintaining it",
  "Every conversation carries its full history forward",
  "You're pulled in only when your expertise matters",
  "More hours with clients, fewer hours inside software",
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
  "Keeping conversations moving forward",
  "Keeping your CRM current",
  "Preparing communications for your review",
  "Coordinating appointments and showings",
  "Holding the full history of every conversation",
  "Watching for opportunities that have gone quiet",
  "Surfacing only the decisions that need your judgment",
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
            <a href="#operations-manager" className="hover:text-foreground transition">The Platform</a>
            <Link to="/roi-calculator" className="hover:text-foreground transition">ROI Calculator</Link>
          </nav>
          <a
            href="#beta"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary/90"
          >
            Get early access <ArrowRight size={14} />
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
                The AI Operations Platform for Real Estate
              </span>
              <h1 className="mt-6 font-serif text-[2.75rem] md:text-[4.25rem] leading-[1.02] tracking-[-0.02em] text-foreground">
                No lead ever slips<br />
                <em className="text-accent not-italic italic">through the cracks.</em>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                Showing Ops is the always-on AI operations platform for real
                estate. It continuously manages the operational work happening
                behind every transaction — leads, conversations, CRM activity,
                tasks, and approvals — and only involves you when your
                expertise is actually needed.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#beta"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary/90"
                >
                  Get early access <ArrowRight size={16} />
                </a>
                <a
                  href="#workflow"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  See how it works
                </a>
              </div>
              <p className="mt-5 text-xs text-muted-foreground">
                Free during private beta · Locked-in founding pricing · No credit card
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

        {/* Interactive walkthrough */}
        <LeadLifecycleDemo />

        {/* Operations feed */}
        <OperationsFeed />

        {/* Problem */}
        <section id="problem" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">The Problem</span>
              <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
                Deals aren't lost because you can't sell.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                They're lost in the operational gaps — the follow-up that ran
                late, the note that never got written, the context that got
                lost, the task that no one had time for.
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
                CRM. From that moment on, Showing Ops runs the operational
                work in the background — and brings you in at every step that
                genuinely needs a person.
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
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">What Showing Ops handles</span>
              <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
                Six kinds of operational work you stop carrying.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Showing Ops takes over the moment a lead is assigned to you —
                and stays with the opportunity until it closes or is
                intentionally released.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* The platform — narrative */}
        <section id="operations-manager" className="border-b border-border bg-primary text-primary-foreground">
          <div className="mx-auto max-w-4xl px-6 py-28 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Your operations teammate</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight">
              While you're showing homes…
            </h2>
            <p className="mt-5 text-lg leading-8 text-primary-foreground/70 max-w-2xl mx-auto">
              Showing Ops keeps the operational side of your business running
              in the background — without being asked, and without needing to
              be managed.
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
              You build the relationships and close the deals.
              <br className="hidden md:block" />
              Showing Ops runs the operations.
            </p>
          </div>
        </section>

        {/* Outcomes */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24 grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">What changes for you</span>
              <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
                You don't have to manage everything anymore.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Showing Ops isn't another tool to keep up with. It's the
                operational layer your business has been trying to hire for —
                always on, always accurate, always in the background.
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
              The operating system that quietly runs a real estate business.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Today Showing Ops handles lead operations, approvals, and CRM
              accuracy. Next on the roadmap: conversation and call
              intelligence, daily operational summaries, showing preparation,
              task creation, team visibility, and brokerage-level insight —
              one operational layer for the whole business, from first
              conversation to closed transaction.
            </p>
            <p className="mt-4 text-sm text-muted-foreground/80">
              We only ship what we've built. Roadmap items are clearly marked.
            </p>
          </div>
        </section>

        {/* ROI calculator teaser — full tool lives on /roi-calculator */}
        <section id="roi" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="rounded-2xl border border-accent/40 bg-card p-8 md:p-10 shadow-[var(--shadow-card)] ring-1 ring-accent/20 md:flex md:items-center md:justify-between md:gap-10">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">ROI</span>
                <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-[1.08] tracking-tight text-foreground">
                  What is operational work costing you?
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  A typical agent taking 12 leads a month with a 45-minute average
                  response is leaving <span className="font-semibold text-foreground">1–3 closings</span> and{" "}
                  <span className="font-semibold text-foreground">4+ hours a week</span> on the table.
                  Run your own numbers in about 20 seconds.
                </p>
              </div>
              <Link
                to="/roi-calculator"
                className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary/90 md:mt-0"
              >
                Open the ROI calculator <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Founding Member perks + beta waitlist (SMS opt-in / A2P compliance untouched) */}
        <FoundingMember />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
