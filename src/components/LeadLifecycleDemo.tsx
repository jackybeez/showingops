import { useEffect, useMemo, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Phone,
  MessageSquare,
  Calendar,
  CheckCircle2,
  UserPlus,
  Zap,
  PhoneOff,
  FileText,
  Sparkles,
  Database,
  type LucideIcon,
} from "lucide-react";

type Step = {
  id: string;
  icon: LucideIcon;
  title: string;
  meta: string;
};

const STEPS: Step[] = [
  { id: "assigned", icon: UserPlus, title: "New lead assigned in Follow Up Boss", meta: "John Smith · buyer · Denver, CO" },
  { id: "detected", icon: Zap, title: "Showing Ops detects the assignment instantly", meta: "Speed-to-Lead engaged" },
  { id: "prompt", icon: Phone, title: "Agent prompted: call John now?", meta: "Interactive · you decide" },
  { id: "call", icon: Phone, title: "Call initiated to John", meta: "Ringing…" },
  { id: "noanswer", icon: PhoneOff, title: "No answer", meta: "Voicemail left · automatic follow-up begins" },
  { id: "draft", icon: FileText, title: "Personalized follow-up text drafted", meta: "Waiting on your approval" },
  { id: "approved", icon: CheckCircle2, title: "Approved with one tap", meta: "Message sent to John" },
  { id: "reply", icon: MessageSquare, title: "John replies", meta: '"Yes — tomorrow afternoon works."' },
  { id: "schedule", icon: Calendar, title: "Showing times suggested from your calendar", meta: "Thu 1:30 · 3:00 · 4:30 PM" },
  { id: "fub", icon: Database, title: "Follow Up Boss updated automatically", meta: "Notes · activity · next task logged" },
  { id: "done", icon: Sparkles, title: "Workflow complete", meta: "Showing on the calendar · nothing dropped" },
];

const LeadLifecycleDemo = () => {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [branch, setBranch] = useState<"yes" | "no" | null>(null);

  useEffect(() => {
    if (!playing) return;
    if (index >= STEPS.length - 1) return;
    // Pause at the interactive prompt until user chooses
    if (index === 2 && branch === null) return;
    const t = setTimeout(() => setIndex((i) => i + 1), 1800);
    return () => clearTimeout(t);
  }, [index, playing, branch]);

  const restart = () => {
    setIndex(0);
    setBranch(null);
    setPlaying(true);
  };

  const active = STEPS[index];

  const preview = useMemo(() => {
    switch (active.id) {
      case "assigned":
        return (
          <MockCard title="New Lead" tag="Follow Up Boss">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-accent/15 text-accent grid place-items-center font-semibold">JS</div>
              <div>
                <p className="text-sm font-semibold text-foreground">John Smith</p>
                <p className="text-xs text-muted-foreground">Buyer · Denver, CO · Zillow</p>
              </div>
            </div>
          </MockCard>
        );
      case "detected":
        return (
          <MockCard title="Speed-to-Lead" tag="Live">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Zap size={16} className="text-accent" />
              Detected in <span className="font-semibold">0.4s</span>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full w-2/3 bg-accent animate-pulse" />
            </div>
          </MockCard>
        );
      case "prompt":
        return (
          <MockCard title="Action Required" tag="Approval">
            <p className="text-sm text-foreground">
              New lead: <span className="font-semibold">John Smith</span>. Would you like to call now?
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => { setBranch("yes"); setIndex(3); }}
                className="flex-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition"
              >
                Yes, call now
              </button>
              <button
                onClick={() => { setBranch("no"); setIndex(5); }}
                className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted transition"
              >
                No, text instead
              </button>
            </div>
          </MockCard>
        );
      case "call":
        return (
          <MockCard title="Calling…" tag="Voice">
            <div className="flex flex-col items-center py-4">
              <div className="h-14 w-14 rounded-full bg-accent/15 text-accent grid place-items-center animate-pulse">
                <Phone size={22} />
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">John Smith</p>
              <p className="text-xs text-muted-foreground">Ringing…</p>
            </div>
          </MockCard>
        );
      case "noanswer":
        return (
          <MockCard title="No Answer" tag="Auto follow-up">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <PhoneOff size={16} className="text-muted-foreground" />
              Voicemail left · drafting follow-up
            </div>
          </MockCard>
        );
      case "draft":
        return (
          <MockCard title="Draft ready for approval" tag="SMS">
            <div className="rounded-lg bg-muted/60 p-3 text-[0.8rem] leading-6 text-foreground">
              Hi John — this is Sarah with Acme Realty. Just tried you about
              the Denver listings you saved. Happy to line up a couple of
              showings this week — what evenings work best?
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
                Approve &amp; send
              </button>
              <button className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground">
                Edit
              </button>
            </div>
          </MockCard>
        );
      case "approved":
        return (
          <MockCard title="Sent" tag="SMS">
            <div className="flex items-center gap-2 text-sm text-accent">
              <CheckCircle2 size={16} /> Approved &amp; delivered
            </div>
          </MockCard>
        );
      case "reply":
        return (
          <MockCard title="Reply from John" tag="SMS">
            <div className="rounded-lg bg-accent/10 p-3 text-[0.8rem] leading-6 text-foreground">
              Yes — tomorrow afternoon works. Around 3?
            </div>
          </MockCard>
        );
      case "schedule":
        return (
          <MockCard title="Suggest showing times" tag="Calendar">
            <div className="grid grid-cols-3 gap-2">
              {["Thu 1:30", "Thu 3:00", "Thu 4:30"].map((t) => (
                <div key={t} className="rounded-lg border border-border bg-card px-2 py-2 text-center text-xs font-medium text-foreground">
                  {t}
                </div>
              ))}
            </div>
            <p className="mt-3 text-[0.7rem] text-muted-foreground">Pulled from your live calendar availability</p>
          </MockCard>
        );
      case "fub":
        return (
          <MockCard title="Follow Up Boss" tag="CRM sync">
            <ul className="space-y-1.5 text-xs text-foreground">
              <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-accent" /> Call logged</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-accent" /> SMS thread saved</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-accent" /> Note added</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-accent" /> Next task scheduled</li>
            </ul>
          </MockCard>
        );
      case "done":
        return (
          <MockCard title="Done" tag="Workflow complete">
            <div className="flex flex-col items-center py-3">
              <div className="h-12 w-12 rounded-full bg-accent/15 text-accent grid place-items-center">
                <Sparkles size={22} />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">Showing on the calendar</p>
              <p className="text-xs text-muted-foreground">Nothing dropped. You closed the loop.</p>
            </div>
          </MockCard>
        );
    }
  }, [active.id]);

  return (
    <section id="in-action" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">See it in action</span>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
            Watch a real lead lifecycle, step by step.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            This is what happens the moment a new lead is assigned to you in
            Follow Up Boss. Click through, or let it play.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr] items-start">
          {/* Step rail */}
          <div className="rounded-2xl border border-border bg-card p-4 md:p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between px-1 pb-3 border-b border-border">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Lead lifecycle</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPlaying((p) => !p)}
                  className="rounded-md border border-border bg-background p-1.5 text-foreground hover:bg-muted transition"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button
                  onClick={restart}
                  className="rounded-md border border-border bg-background p-1.5 text-foreground hover:bg-muted transition"
                  aria-label="Restart"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
            <ol className="mt-4 space-y-1.5">
              {STEPS.map((s, i) => {
                const state = i < index ? "done" : i === index ? "active" : "pending";
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => { setIndex(i); if (i <= 2) setBranch(null); }}
                      className={`w-full flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition ${
                        state === "active"
                          ? "border-accent/50 bg-accent/5"
                          : state === "done"
                          ? "border-border bg-background"
                          : "border-border/60 bg-background opacity-60 hover:opacity-100"
                      }`}
                    >
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.72rem] font-semibold ${
                        state === "done"
                          ? "bg-accent text-accent-foreground"
                          : state === "active"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {state === "done" ? <CheckCircle2 size={14} /> : i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{s.title}</p>
                        <p className="text-[0.72rem] text-muted-foreground truncate">{s.meta}</p>
                      </div>
                      <s.icon size={16} className={state === "pending" ? "text-muted-foreground" : "text-accent"} />
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-24">
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-accent/15 via-secondary/10 to-transparent blur-2xl" aria-hidden />
              <div key={active.id} className="relative animate-fade-in">{preview}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MockCard = ({ title, tag, children }: { title: string; tag: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
    <div className="flex items-center justify-between pb-3 border-b border-border">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent">{tag}</span>
    </div>
    <div className="pt-4">{children}</div>
  </div>
);

export default LeadLifecycleDemo;
