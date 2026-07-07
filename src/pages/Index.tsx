import { Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  MessageSquare,
  Database,
  Calendar,
  Brain,
  Inbox,
  Target,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ClipboardX,
  PhoneOff,
  TrendingDown,
} from "lucide-react";
import Footer from "@/components/Footer";
import SmsOptIn from "@/components/SmsOptIn";
import BetaWaitlist from "@/components/BetaWaitlist";

const problems = [
  { icon: PhoneOff, title: "Missed follow-up", desc: "Leads sit in an inbox for hours while competitors respond in minutes." },
  { icon: ClipboardX, title: "Forgotten conversations", desc: "Context lives in scattered texts, emails, and someone's memory." },
  { icon: AlertTriangle, title: "Stale CRM data", desc: "Manual data entry never happens, so pipeline reporting is fiction." },
  { icon: TrendingDown, title: "Dropped opportunities", desc: "Warm leads go cold because the next step never gets taken." },
];

const capabilities = [
  { icon: Zap, title: "Speed-to-Lead", desc: "New leads get an intelligent first touch in under a minute, 24/7." },
  { icon: MessageSquare, title: "AI Follow-up", desc: "Persistent, personalized follow-up sequences that adapt to every reply." },
  { icon: Database, title: "CRM Automation", desc: "Every conversation, showing, and next step is written back to your CRM automatically." },
  { icon: Calendar, title: "Smart Scheduling", desc: "Books showings and calls against your live availability without back-and-forth." },
  { icon: Brain, title: "Operational Memory", desc: "Remembers every lead's preferences, timeline, and history — forever." },
  { icon: Inbox, title: "Inbox Management", desc: "Triages incoming messages and surfaces only what needs your attention." },
  { icon: Target, title: "Lead Intelligence", desc: "Scores intent and readiness so your agents focus on who's actually buying." },
  { icon: ShieldCheck, title: "Human-in-the-Loop", desc: "Sensitive replies pause for a one-tap approval. Automation never goes rogue." },
];

const outcomes = [
  "More conversations with qualified buyers",
  "Faster response times, day or night",
  "A CRM that actually reflects reality",
  "Fewer hours on administrative busywork",
  "More appointments on the calendar",
  "A better experience for every client",
];

const workflowSteps = [
  { label: "New lead arrives", tag: "Zillow · IDX · Referral" },
  { label: "AI routes to the right agent", tag: "Skills + availability" },
  { label: "AI drafts + sends first touch", tag: "Under 60 seconds" },
  { label: "CRM updated in the background", tag: "Contact + notes" },
  { label: "Showing scheduled", tag: "Calendar synced" },
  { label: "Human approval when it matters", tag: "One tap" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-serif text-xl tracking-tight text-foreground">
            ShowingOps
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#problem" className="hover:text-foreground transition">The Problem</a>
            <a href="#solution" className="hover:text-foreground transition">How it works</a>
            <a href="#capabilities" className="hover:text-foreground transition">Capabilities</a>
            <a href="#sms" className="hover:text-foreground transition">SMS</a>
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
                AI Operations Platform for Real Estate
              </span>
              <h1 className="mt-6 font-serif text-[2.75rem] md:text-[4.25rem] leading-[1.02] tracking-[-0.02em] text-foreground">
                No lead ever slips<br />
                <em className="text-accent not-italic italic">through the cracks.</em>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                ShowingOps is an always-on AI Chief of Staff for real estate
                teams. It follows up with every lead, keeps your CRM clean,
                drafts communications, and moves opportunities forward — so
                your agents can spend their time selling homes.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#beta"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary/90"
                >
                  Join the Beta <ArrowRight size={16} />
                </a>
                <a
                  href="#solution"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  See how it works
                </a>
              </div>
              <p className="mt-5 text-xs text-muted-foreground">
                Private beta · Onboarding brokerages now
              </p>
            </div>

            {/* Workflow visualization */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-accent/15 via-secondary/10 to-transparent blur-2xl" aria-hidden />
              <div className="relative rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-5">
                <div className="flex items-center justify-between px-1 pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-warning/60" style={{ background: "hsl(var(--accent))" }} />
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
            <span>CRM-agnostic</span>
            <span className="hidden sm:inline text-border">·</span>
            <span>Human-in-the-loop</span>
            <span className="hidden sm:inline text-border">·</span>
            <span>SOC-conscious infrastructure</span>
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">The Problem</span>
              <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
                Real estate teams don't lose deals because they're bad at selling.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                They lose them in the gaps between conversations — the follow-up
                that never happened, the CRM note that never got written, the
                lead that fell out of memory.
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

        {/* Solution */}
        <section id="solution" className="border-b border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">The Solution</span>
              <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
                An AI that runs your operations, continuously.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                ShowingOps watches every lead source, every conversation, and
                every commitment your team makes. It executes the operational
                work in the background so nothing gets forgotten.
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
                One platform. The entire operational surface.
              </h2>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((c) => (
                <div key={c.title} className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:border-accent/40 hover:-translate-y-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <c.icon size={18} />
                  </div>
                  <h3 className="mt-4 font-sans text-base font-semibold text-foreground tracking-tight">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b border-border bg-primary text-primary-foreground">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">How it works</span>
              <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight">
                Get up and running in an afternoon.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { n: "01", t: "Connect your CRM", d: "We plug into the tools you already use. No rip-and-replace." },
                { n: "02", t: "AI runs your operations", d: "Follow-up, scheduling, CRM hygiene, inbox triage — all handled in the background." },
                { n: "03", t: "Close more deals", d: "Your agents spend their time in front of clients, not inside spreadsheets." },
              ].map((s) => (
                <div key={s.n} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.04] p-7">
                  <div className="font-serif text-4xl text-accent">{s.n}</div>
                  <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
                  <p className="mt-2 text-sm leading-7 text-primary-foreground/70">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-24 grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Why teams choose ShowingOps</span>
              <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
                Measured in outcomes, not features.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                This isn't another chatbot or CRM plugin. It's the operational
                layer your team has been trying to hire for.
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
              back-office of every real estate team — from lead capture to
              closed transaction. The beta focuses on lead operations today;
              transaction coordination, agent onboarding, and back-office
              workflows are on the near-term roadmap.
            </p>
            <p className="mt-4 text-sm text-muted-foreground/80">
              We only ship what we've built. Roadmap items are clearly marked.
            </p>
          </div>
        </section>

        {/* Beta waitlist */}
        <BetaWaitlist />

        {/* SMS Opt-In (compliance-preserved) */}
        <SmsOptIn />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
