import { useEffect, useState } from "react";
import {
  UserPlus,
  Zap,
  Phone,
  FileText,
  CheckCircle2,
  MessageSquare,
  Calendar,
  Database,
  Sparkles,
} from "lucide-react";

const EVENTS = [
  { time: "11:02 AM", icon: UserPlus, label: "Lead assigned", meta: "Follow Up Boss · John Smith" },
  { time: "11:02 AM", icon: Zap, label: "Speed-to-Lead started", meta: "Detected in 0.4s" },
  { time: "11:03 AM", icon: Phone, label: "Call attempted", meta: "Voicemail left" },
  { time: "11:04 AM", icon: FileText, label: "Personalized follow-up drafted", meta: "Awaiting approval" },
  { time: "11:05 AM", icon: CheckCircle2, label: "Approved & sent", meta: "SMS delivered" },
  { time: "11:17 AM", icon: MessageSquare, label: "Lead replied", meta: '"Tomorrow afternoon works"' },
  { time: "11:18 AM", icon: Calendar, label: "Showing times suggested", meta: "3 slots from calendar" },
  { time: "11:19 AM", icon: Database, label: "Follow Up Boss updated", meta: "Notes · activity · next task" },
  { time: "11:20 AM", icon: Sparkles, label: "Workflow complete", meta: "Nothing dropped" },
];

const OperationsFeed = () => {
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible((v) => (v >= EVENTS.length ? 1 : v + 1));
    }, 900);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="ops-feed" className="border-b border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-24 grid gap-12 lg:grid-cols-[1fr_1.2fr] items-start">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Meet your operations feed</span>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
            See exactly what's being handled for you.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Every action Showing Ops takes appears on a real, timestamped
            operational record. No black box. No guesswork. Just a clear
            account of the work happening in the background.
          </p>

          <ul className="mt-8 space-y-2.5 text-sm text-foreground/80">
            <li className="flex items-start gap-2.5"><CheckCircle2 className="mt-0.5 text-accent shrink-0" size={16} /> Every call, text, and note logged automatically</li>
            <li className="flex items-start gap-2.5"><CheckCircle2 className="mt-0.5 text-accent shrink-0" size={16} /> Timestamped so you always know what happened when</li>
            <li className="flex items-start gap-2.5"><CheckCircle2 className="mt-0.5 text-accent shrink-0" size={16} /> Nothing changes in your CRM without a record</li>
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-accent/10 via-secondary/10 to-transparent blur-2xl" aria-hidden />
          <div className="relative rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <p className="text-sm font-semibold text-foreground">Operations feed</p>
              <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Live
              </span>
            </div>
            <ol className="mt-3 space-y-1.5 max-h-[420px] overflow-hidden">
              {EVENTS.slice(0, visible).map((e, i) => (
                <li
                  key={`${e.time}-${i}`}
                  className="flex items-start gap-3 rounded-xl border border-border/70 bg-background px-3.5 py-3 animate-fade-in"
                >
                  <span className="text-[0.7rem] font-mono text-muted-foreground w-16 shrink-0 pt-0.5">{e.time}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <e.icon size={14} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{e.label}</p>
                    <p className="text-[0.72rem] text-muted-foreground truncate">{e.meta}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperationsFeed;
