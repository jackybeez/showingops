import { useEffect, useMemo, useRef, useState } from "react";
import { TrendingUp, Clock, DollarSign, CalendarCheck, ArrowRight, Zap, type LucideIcon } from "lucide-react";

const Field = ({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
  onChange: (n: number) => void;
  hint?: string;
}) => (
  <div>
    <div className="flex items-center justify-between gap-3">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <span className="text-sm font-semibold text-accent tabular-nums">{format(value)}</span>
    </div>
    {hint && <p className="mt-0.5 text-[0.7rem] leading-4 text-muted-foreground">{hint}</p>}
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="mt-2 w-full accent-accent"
    />
    <div className="mt-1 flex justify-between text-[0.68rem] text-muted-foreground tabular-nums">
      <span>{format(min)}</span>
      <span>{format(max)}</span>
    </div>
  </div>
);

const currency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

const formatResponseTime = (min: number) => {
  if (min < 60) return `${min} min`;
  const h = min / 60;
  return h % 1 === 0 ? `${h} hr` : `${h.toFixed(1)} hr`;
};

const roundToNearest = (n: number, nearest: number) => Math.round(n / nearest) * nearest;

// Smooth count-up hook
const useAnimatedNumber = (target: number, duration = 500) => {
  const [value, setValue] = useState(target);
  const rafRef = useRef<number>();
  const startRef = useRef<{ from: number; to: number; t0: number }>();

  useEffect(() => {
    startRef.current = { from: value, to: target, t0: performance.now() };
    const tick = (now: number) => {
      const { from, to, t0 } = startRef.current!;
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(from + (to - from) * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return value;
};

// Business-impact estimator (not a linear math calculator).
// Returns a conservative low/high range of additional closings a realtor can
// realistically recover per year through faster response, consistent follow-up,
// and operational execution.
const estimateRecoveredClosings = (
  leads: number,
  responseMin: number,
  coldPct: number,
) => {
  const annualLeads = leads * 12;
  const coldShare = coldPct / 100;

  // How much of the leaky pipeline is realistically recoverable through
  // operational execution. Bounded so it never looks magical.
  const responseFactor = clamp((responseMin - 5) / 175, 0, 1); // 0 at instant, 1 at 3hr
  const recoverableLow = 0.06 + 0.07 * responseFactor;  // 6%–13% of cold leads
  const recoverableHigh = 0.12 + 0.15 * responseFactor; // 12%–27% of cold leads

  // Recovered lead → closed deal (conservative blended rate).
  const closeRate = 0.15;

  const rawLow = annualLeads * coldShare * recoverableLow * closeRate;
  const rawHigh = annualLeads * coldShare * recoverableHigh * closeRate;

  // Round to whole deals. Guarantee at least 1 on the high end when there's
  // any meaningful pipeline — realtors don't think in half-closings.
  let low = Math.floor(rawLow);
  let high = Math.ceil(rawHigh);

  if (annualLeads * coldShare < 12) {
    // Small pipelines: honest 0–1 messaging.
    low = 0;
    high = Math.max(1, high);
  } else {
    low = Math.max(1, low);
    high = Math.max(low + 1, high);
  }

  // Cap upper end so the tool never over-promises.
  high = Math.min(high, Math.max(3, Math.round(leads * 0.4)));
  if (high < low) high = low;

  return { low, high };
};

const RoiCalculator = () => {
  const [leads, setLeads] = useState(8);
  const [commission, setCommission] = useState(9000);
  const [responseMin, setResponseMin] = useState(45);
  const [coldPct, setColdPct] = useState(35);

  const results = useMemo(() => {
    const { low, high } = estimateRecoveredClosings(leads, responseMin, coldPct);

    const commissionLow = low * commission;
    const commissionHigh = high * commission;

    // Time: ~45 min per lead of follow-up + baseline weekly ops (~2 hrs/wk).
    // ShowingOps automates the majority of that repetitive coordination.
    const followUpHoursWeekly = (leads * 0.75) / 4.33 + 2;
    const hoursSavedWeekly = followUpHoursWeekly * 0.65;

    return {
      closingsLow: low,
      closingsHigh: high,
      commissionLow,
      commissionHigh,
      hoursSavedWeekly,
    };
  }, [leads, commission, responseMin, coldPct]);

  const animCommissionLow = useAnimatedNumber(results.commissionLow);
  const animCommissionHigh = useAnimatedNumber(results.commissionHigh);
  const animHours = useAnimatedNumber(results.hoursSavedWeekly);

  const closingsLabel =
    results.closingsLow === results.closingsHigh
      ? `${results.closingsHigh}`
      : `${results.closingsLow}–${results.closingsHigh}`;

  const commissionLabel = useMemo(() => {
    const lo = currency(roundToNearest(animCommissionLow, 500));
    const hi = currency(roundToNearest(animCommissionHigh, 500));
    if (results.closingsLow === results.closingsHigh) return hi;
    return `${lo}–${hi}`;
  }, [animCommissionLow, animCommissionHigh, results.closingsLow, results.closingsHigh]);

  const summary = useMemo(() => {
    const dealCopy =
      results.closingsLow === results.closingsHigh
        ? `${results.closingsHigh} additional ${results.closingsHigh === 1 ? "closing" : "closings"}`
        : `${results.closingsLow}–${results.closingsHigh} additional closings`;
    return `At ${leads} new leads a month with a ${formatResponseTime(
      responseMin,
    )} average response, consistent follow-up and faster first contact realistically recover ${dealCopy} a year — roughly ${commissionLabel} in commission, and about ${animHours.toFixed(
      1,
    )} hours back every week.`;
  }, [results, leads, responseMin, commissionLabel, animHours]);

  return (
    <section id="roi" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">ROI</span>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
            What is inconsistent follow-up costing you?
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            A conservative estimate of what faster response and consistent follow-up
            can recover over a full year — in whole deals, real commission, and
            hours off your plate.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Inputs */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-[var(--shadow-card)] space-y-6">
            <Field
              label="New leads per month"
              value={leads}
              min={1}
              max={30}
              step={1}
              format={(n) => `${n}`}
              onChange={setLeads}
            />
            <Field
              label="Average commission per closing"
              value={commission}
              min={4000}
              max={20000}
              step={500}
              format={currency}
              onChange={setCommission}
            />
            <Field
              label="Average first response time"
              value={responseMin}
              min={5}
              max={180}
              step={1}
              format={formatResponseTime}
              onChange={setResponseMin}
            />
            <Field
              label="Leads that go cold before meaningful follow-up"
              value={coldPct}
              min={10}
              max={70}
              step={1}
              format={(n) => `${n}%`}
              onChange={setColdPct}
              hint="Leads who needed a faster response, another touch, or easier scheduling."
            />
          </div>

          {/* Outputs */}
          <div className="rounded-2xl border border-accent/40 bg-card p-6 md:p-8 shadow-[var(--shadow-card)] ring-1 ring-accent/20">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Estimated annual impact with ShowingOps
            </p>

            {/* Primary metric */}
            <div className="mt-5 rounded-xl border border-accent/50 bg-accent/5 p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarCheck size={14} className="text-accent" />
                <span className="text-[0.7rem] uppercase tracking-[0.12em]">
                  Potential additional closings per year
                </span>
              </div>
              <p className="mt-2 font-serif text-4xl md:text-5xl tracking-tight text-accent tabular-nums">
                {closingsLabel}
              </p>
              <p className="mt-1 text-[0.72rem] uppercase tracking-[0.12em] text-muted-foreground">
                {results.closingsHigh === 1 ? "deal recovered" : "deals recovered"}
              </p>
              <p className="mt-2 text-[0.78rem] leading-5 text-foreground/80">
                Recovering even a single transaction typically pays for ShowingOps many times over.
              </p>
            </div>

            {/* Supporting metrics */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Metric
                icon={DollarSign}
                label="Commission potential"
                value={commissionLabel}
                suffix="per year"
                sub="From faster response, persistent follow-up, and operational consistency — not magic."
                highlight
              />
              <Metric
                icon={Clock}
                label="Hours saved"
                value={`${animHours.toFixed(1)} hrs`}
                suffix="every week"
                sub="Repetitive follow-up, scheduling, and coordination handled automatically."
              />
            </div>

            {/* Speed-to-lead visual */}
            <div className="mt-4 rounded-xl border border-border bg-background p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap size={14} className="text-accent" />
                <span className="text-[0.7rem] uppercase tracking-[0.12em]">Speed-to-lead</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 rounded-lg border border-border bg-background/60 px-3 py-2">
                  <p className="text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">Today</p>
                  <p className="mt-1 font-serif text-xl text-foreground tabular-nums">
                    {formatResponseTime(responseMin)}
                  </p>
                </div>
                <ArrowRight size={18} className="shrink-0 text-accent" />
                <div className="flex-1 rounded-lg border border-accent/40 bg-accent/5 px-3 py-2">
                  <p className="text-[0.62rem] uppercase tracking-[0.12em] text-accent">With ShowingOps</p>
                  <p className="mt-1 font-serif text-xl text-accent tabular-nums">Under 1 min</p>
                </div>
              </div>
            </div>

            {/* Personalized summary */}
            <div className="mt-5 rounded-xl border border-border bg-background/60 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp size={14} className="text-accent" />
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em]">
                  Your personalized assessment
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-foreground/90">{summary}</p>
            </div>

            <details className="mt-4 rounded-lg border border-border bg-background/60 px-3 py-2">
              <summary className="cursor-pointer text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                How we calculate this
              </summary>
              <div className="mt-2 space-y-2 text-[0.75rem] leading-5 text-muted-foreground">
                <p>
                  This is a conservative business-impact estimator, not a mathematical model.
                  It's built to reflect what consistent operational execution recovers over
                  a full year — never to over-promise.
                </p>
                <ul className="list-disc space-y-1 pl-4">
                  <li>Only a small share of cold leads (roughly 6–27%) are treated as realistically recoverable, based on how fast today's response is.</li>
                  <li>Recovered leads convert to closings at a conservative blended rate.</li>
                  <li>Outcomes are rounded to whole deals — you either close the house or you don't.</li>
                  <li>Time saved reflects follow-up, scheduling, and coordination that gets automated (~45 min per lead plus baseline weekly ops).</li>
                  <li>Commission at risk is rounded to the nearest $500.</li>
                </ul>
                <p className="text-foreground/70">
                  These are estimates, not guarantees. Actual results vary by market, lead source, and business.
                </p>
              </div>
            </details>

            <a
              href="#beta"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary/90"
            >
              Get early access <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Metric = ({
  icon: Icon,
  label,
  value,
  suffix,
  sub,
  highlight,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  suffix?: string;
  sub?: string;
  highlight?: boolean;
}) => (
  <div
    className={`rounded-xl border p-4 ${
      highlight ? "border-accent/50 bg-accent/5" : "border-border bg-background"
    }`}
  >
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon size={14} className="text-accent" />
      <span className="text-[0.7rem] uppercase tracking-[0.12em]">{label}</span>
    </div>
    <p
      className={`mt-2 font-serif text-2xl md:text-3xl tracking-tight tabular-nums ${
        highlight ? "text-accent" : "text-foreground"
      }`}
    >
      {value}
    </p>
    {suffix && <p className="mt-1 text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">{suffix}</p>}
    {sub && <p className="mt-1.5 text-[0.7rem] leading-4 text-muted-foreground">{sub}</p>}
  </div>
);

export default RoiCalculator;
