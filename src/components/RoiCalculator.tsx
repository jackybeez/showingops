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

const formatClosingRange = (closings: number) => {
  if (closings < 0.35) return "Likely 0";
  if (closings < 1) return "0–1";
  const rounded = Math.max(1, Math.round(closings));
  return `${rounded}`;
};

const formatClosingLabel = (closings: number) => {
  if (closings < 0.35) return "missed closings / year";
  if (closings < 1) return "missed closing / year";
  const rounded = Math.max(1, Math.round(closings));
  return rounded === 1 ? "likely missed closing / year" : "likely missed closings / year";
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
  const [leads, setLeads] = useState(7);
  const [commission, setCommission] = useState(9000);
  const [responseMin, setResponseMin] = useState(45);
  const [coldPct, setColdPct] = useState(30);

  const results = useMemo(() => {
    // Conservative model for a realtor's normal month.
    // Slow response makes some cold leads realistically recoverable, but not all of them.
    const coldLeadsMonthly = leads * (coldPct / 100);
    const preventableShare = clamp(responseMin / 120, 0.12, 0.55);
    const recoverableLeadsMonthly = coldLeadsMonthly * preventableShare;

    // Recovered lead → appointment → closing. These stay deliberately modest.
    const apptRate = 0.3;
    const closeRate = 0.18;
    const appointmentsPerMonth = recoverableLeadsMonthly * apptRate;
    const expectedClosingsPerYear = appointmentsPerMonth * closeRate * 12;

    // Time burden: ~45 minutes per new lead plus 1.5 hrs/week baseline ops.
    const followUpHoursMonthly = leads * 0.75 + 6;
    const commissionAtRisk = expectedClosingsPerYear * commission;

    return {
      expectedClosingsPerYear,
      appointmentsPerMonth,
      followUpHoursMonthly,
      commissionAtRisk,
      coldLeadsMonthly,
    };
  }, [leads, commission, responseMin, coldPct]);

  const animCommission = useAnimatedNumber(results.commissionAtRisk);
  const animHours = useAnimatedNumber(results.followUpHoursMonthly);
  const animAppointments = useAnimatedNumber(results.appointmentsPerMonth);

  const summary = useMemo(() => {
    const closingRange = formatClosingRange(results.expectedClosingsPerYear);
    const revenue = currency(roundToNearest(results.commissionAtRisk, 500));
    const hours = Math.round(results.followUpHoursMonthly);
    return `With ${leads} new ${leads === 1 ? "lead" : "leads"} a month and ${coldPct}% going cold, the model estimates ${closingRange.toLowerCase()} ${formatClosingLabel(
      results.expectedClosingsPerYear,
    )}, about ${revenue} in annual commission at risk, and roughly ${hours} hours a month tied up in follow-up and coordination.`;
  }, [results, leads, coldPct]);

  const responseCopy = useMemo(
    () =>
      `ShowingOps is designed to move first response from ${formatResponseTime(
      responseMin,
    )} to under one minute, then keep the lead warm with consistent follow-up.`,
    [responseMin],
  );

  return (
    <section id="roi" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">ROI</span>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
            What is inconsistent follow-up costing you?
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Use a realistic month. The estimate stays conservative, shows whole-deal outcomes,
            and focuses on what happens when a lead waits too long.
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
              Estimated impact with ShowingOps
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Metric
                icon={CalendarCheck}
                label="Missed deals"
                value={formatClosingRange(results.expectedClosingsPerYear)}
                suffix={formatClosingLabel(results.expectedClosingsPerYear)}
                sub="Real estate closes in whole deals, so this is shown as a likely range."
              />
              <Metric
                icon={DollarSign}
                label="Commission at risk"
                value={`~${currency(roundToNearest(animCommission, 500))}`}
                suffix="per year"
                sub="Rounded estimate based on your average commission."
                highlight
              />
              <Metric
                icon={Clock}
                label="Follow-up load"
                value={`${Math.round(animHours)} hrs`}
                suffix="per month"
                sub="45 minutes per lead plus baseline weekly coordination."
              />
              <Metric
                icon={Zap}
                label="Appointments protected"
                value={`${animAppointments.toFixed(1)}`}
                suffix="per month"
                sub={responseCopy}
              />
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
                  These are intentionally conservative estimates, built around how a normal
                  realtor pipeline behaves rather than inflated software benchmarks:
                </p>
                <ul className="list-disc space-y-1 pl-4">
                  <li>New leads range from 1–30 per month for solo agents and small teams.</li>
                  <li>Follow-up work assumes about 45 minutes per lead.</li>
                  <li>Baseline coordination adds about 1.5 hours per week.</li>
                  <li>Only a portion of cold leads are considered realistically recoverable.</li>
                  <li>Recovered leads become appointments at 30% and close at 18%.</li>
                </ul>
                <p>
                  Commission at risk is rounded to the nearest $500. Missed deals are shown
                  as whole-deal ranges because a realtor either closes the house or does not.
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
