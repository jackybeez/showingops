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
      // easeOutCubic
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

const RoiCalculator = () => {
  const [leads, setLeads] = useState(20);
  const [commission, setCommission] = useState(8000);
  const [responseMin, setResponseMin] = useState(45);
  const [weeklyHours, setWeeklyHours] = useState(8);
  const [coldPct, setColdPct] = useState(20);

  const results = useMemo(() => {
    // Speed-to-lead: faster follow-up recovers a share of leads that would go cold.
    // Scale: response ≤5min recovers ~15%; response ≥120min recovers ~55%. Capped.
    const recoveryShare = clamp((responseMin - 5) / 115, 0, 1) * 0.4 + 0.15;
    const recoveredLeads = leads * (coldPct / 100) * recoveryShare;

    // Recovered leads → appointments (~40%) → closings (industry ~18–22%, use 20%)
    const apptRate = 0.4;
    const closeRate = 0.2;
    const closingsPerMonth = recoveredLeads * apptRate * closeRate;
    const closingsPerYear = closingsPerMonth * 12;
    const commissionPerYear = closingsPerYear * commission;

    // Hours saved / week: ~40% of the ops hours agent currently spends
    // (follow-up + CRM + scheduling + admin), scales gently with lead volume.
    const volumeFactor = clamp(0.35 + leads / 200, 0.35, 0.7);
    const hoursSavedPerWeek = weeklyHours * volumeFactor;

    return {
      closingsPerYear,
      commissionPerYear,
      hoursSavedPerWeek,
    };
  }, [leads, commission, responseMin, coldPct, weeklyHours]);

  const animClosings = useAnimatedNumber(results.closingsPerYear);
  const animCommission = useAnimatedNumber(results.commissionPerYear);
  const animHours = useAnimatedNumber(results.hoursSavedPerWeek);

  const summary = useMemo(() => {
    const hrs = results.hoursSavedPerWeek.toFixed(1);
    const closingsLow = Math.max(0, Math.floor(results.closingsPerYear));
    const closingsHigh = Math.max(1, Math.ceil(results.closingsPerYear));
    const closingsRange =
      closingsLow === closingsHigh ? `${closingsHigh}` : `${closingsLow}–${closingsHigh}`;
    return `Based on your current business, ShowingOps could save approximately ${hrs} hours every week, reduce your average first response time from ${formatResponseTime(
      responseMin,
    )} to under one minute, and help recover roughly ${closingsRange} additional ${
      closingsHigh === 1 ? "transaction" : "transactions"
    } each year through more consistent follow-up and operational automation.`;
  }, [results, responseMin]);

  return (
    <section id="roi" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">ROI</span>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
            What is inconsistent follow-up costing you?
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Adjust the sliders below to estimate how much time, revenue, and
            opportunity ShowingOps could realistically help you recover.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Inputs */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-[var(--shadow-card)] space-y-6">
            <Field
              label="New leads per month"
              value={leads}
              min={5}
              max={150}
              step={1}
              format={(n) => `${n}`}
              onChange={setLeads}
            />
            <Field
              label="Average commission per closing"
              value={commission}
              min={2000}
              max={25000}
              step={500}
              format={currency}
              onChange={setCommission}
            />
            <Field
              label="Average first response time"
              value={responseMin}
              min={1}
              max={180}
              step={1}
              format={formatResponseTime}
              onChange={setResponseMin}
            />
            <Field
              label="Hours per week on follow-up, CRM, scheduling & admin"
              value={weeklyHours}
              min={1}
              max={40}
              step={1}
              format={(n) => `${n} hrs`}
              onChange={setWeeklyHours}
              hint="Following up, updating the CRM, scheduling showings, admin work."
            />
            <Field
              label="Leads that go cold before meaningful follow-up"
              value={coldPct}
              min={5}
              max={60}
              step={1}
              format={(n) => `${n}%`}
              onChange={setColdPct}
            />
          </div>

          {/* Outputs */}
          <div className="rounded-2xl border border-accent/40 bg-card p-6 md:p-8 shadow-[var(--shadow-card)] ring-1 ring-accent/20">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Estimated impact with ShowingOps
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Metric
                icon={CalendarCheck}
                label="Potential additional closings / year"
                value={`+${animClosings.toFixed(1)}`}
                sub="Based on recovering leads that would otherwise go cold."
              />
              <Metric
                icon={DollarSign}
                label="Estimated additional commission / year"
                value={`+${currency(Math.round(animCommission))}`}
                sub="Conservative estimate using your average commission."
                highlight
              />
              <Metric
                icon={Clock}
                label="Hours saved every week"
                value={`${animHours.toFixed(1)} hrs`}
                sub="From automated follow-up, CRM updates, scheduling, reminders, and ops work."
              />
              <ResponseCompare current={responseMin} />
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
                  These numbers are intentionally conservative estimates built
                  from a blend of industry research and operational benchmarks:
                </p>
                <ul className="list-disc space-y-1 pl-4">
                  <li>Speed-to-lead research on response time vs. conversion</li>
                  <li>Follow-up consistency and multi-touch cadence data</li>
                  <li>Operational automation and CRM hygiene benchmarks</li>
                  <li>Scheduling automation and showing coordination</li>
                  <li>Industry lead-to-appointment and appointment-to-close rates</li>
                </ul>
                <p>
                  Recovered leads convert to appointments at ~40% and close at
                  ~20%. Hours saved reflect a portion of the follow-up, CRM,
                  scheduling, and admin work you already do each week.
                </p>
                <p className="text-foreground/70">
                  These are estimates, not guarantees. Actual results vary by
                  market, lead source, and business.
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
  sub,
  highlight,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
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
    {sub && <p className="mt-1.5 text-[0.7rem] leading-4 text-muted-foreground">{sub}</p>}
  </div>
);

const ResponseCompare = ({ current }: { current: number }) => (
  <div className="rounded-xl border border-border bg-background p-4 sm:col-span-2">
    <div className="flex items-center gap-2 text-muted-foreground">
      <Zap size={14} className="text-accent" />
      <span className="text-[0.7rem] uppercase tracking-[0.12em]">
        Average first response improvement
      </span>
    </div>
    <div className="mt-3 flex items-center gap-3 sm:gap-4">
      <div className="flex-1 rounded-lg border border-border bg-card px-3 py-2.5">
        <p className="text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">Current</p>
        <p className="mt-1 font-serif text-xl md:text-2xl tracking-tight text-foreground tabular-nums">
          {formatResponseTime(current)}
        </p>
      </div>
      <ArrowRight size={18} className="shrink-0 text-accent" />
      <div className="flex-1 rounded-lg border border-accent/50 bg-accent/5 px-3 py-2.5">
        <p className="text-[0.62rem] uppercase tracking-[0.14em] text-accent">With ShowingOps</p>
        <p className="mt-1 font-serif text-xl md:text-2xl tracking-tight text-accent tabular-nums">
          Under 1 min
        </p>
      </div>
    </div>
  </div>
);

export default RoiCalculator;
