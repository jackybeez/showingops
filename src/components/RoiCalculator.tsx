import { useMemo, useState } from "react";
import { TrendingUp, Clock, DollarSign, CalendarCheck, ArrowRight, type LucideIcon } from "lucide-react";

const Field = ({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
  onChange: (n: number) => void;
}) => (
  <div>
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <span className="text-sm font-semibold text-accent">{format(value)}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="mt-2 w-full accent-accent"
    />
    <div className="mt-1 flex justify-between text-[0.68rem] text-muted-foreground">
      <span>{format(min)}</span>
      <span>{format(max)}</span>
    </div>
  </div>
);

const currency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

const RoiCalculator = () => {
  const [leads, setLeads] = useState(12);
  const [commission, setCommission] = useState(9000);
  const [responseMin, setResponseMin] = useState(60);
  const [coldPct, setColdPct] = useState(45);

  const results = useMemo(() => {
    const recoveredRate = clamp(responseMin / 120, 0.1, 0.6);
    const recoveredLeads = leads * (coldPct / 100) * recoveredRate;
    const appts = recoveredLeads * 0.45;
    const closeRate = 0.22;
    const revenueMonthly = appts * closeRate * commission;
    // ~45 min of follow-up work per lead + ~6 hrs/mo baseline weekly ops
    const hoursMonthly = leads * 0.75 + 6;
    const annual = revenueMonthly * 12;
    return {
      appts: Math.max(0, Math.round(appts * 10) / 10),
      revenue: Math.max(0, Math.round(revenueMonthly)),
      hours: Math.round(hoursMonthly),
      annual: Math.max(0, Math.round(annual)),
    };
  }, [leads, commission, responseMin, coldPct]);

  return (
    <section id="roi" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">ROI</span>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
            What could faster follow-up be worth?
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Move the sliders to match your business. See what one dropped
            lead per week is actually costing you.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Inputs */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-[var(--shadow-card)] space-y-6">
            <Field label="Leads per month" value={leads} min={2} max={25} step={1} format={(n) => `${n}`} onChange={setLeads} />
            <Field label="Average commission" value={commission} min={4000} max={20000} step={500} format={currency} onChange={setCommission} />
            <Field label="Current avg response time" value={responseMin} min={5} max={180} step={5} format={(n) => `${n} min`} onChange={setResponseMin} />
            <Field label="Leads that go cold today" value={coldPct} min={10} max={70} step={1} format={(n) => `${n}%`} onChange={setColdPct} />
          </div>

          {/* Outputs */}
          <div className="rounded-2xl border border-accent/40 bg-card p-6 md:p-8 shadow-[var(--shadow-card)] ring-1 ring-accent/20">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Estimated impact</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Metric icon={CalendarCheck} label="Extra appointments / month" value={String(results.appts)} />
              <Metric icon={DollarSign} label="Revenue you're leaving on the table" value={currency(results.revenue)} />
              <Metric icon={Clock} label="Hours back every month" value={`${results.hours} hrs`} />
              <Metric icon={TrendingUp} label="Recovered revenue / year" value={currency(results.annual)} highlight />
            </div>
            <details className="mt-5 rounded-lg border border-border bg-background/60 px-3 py-2">
              <summary className="cursor-pointer text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                How we calculate this
              </summary>
              <p className="mt-2 text-[0.72rem] leading-5 text-muted-foreground">
                Faster follow-up recovers up to 60% of leads that would go
                cold. Recovered leads book showings at ~45%, and ~22% of
                those close. Hours saved assume ~45 min of follow-up work
                per lead plus ~6 hrs/mo of baseline weekly ops.
              </p>
            </details>
            <p className="mt-4 text-[0.7rem] leading-5 text-muted-foreground">
              Based on industry benchmarks. Conservative estimates for
              illustration only — not a guarantee of results.
            </p>
            <a
              href="#beta"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary/90"
            >
              Get my hours back <ArrowRight size={16} />
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
  highlight,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className={`rounded-xl border p-4 ${highlight ? "border-accent/50 bg-accent/5" : "border-border bg-background"}`}>
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon size={14} className="text-accent" />
      <span className="text-[0.72rem] uppercase tracking-[0.12em]">{label}</span>
    </div>
    <p className={`mt-2 font-serif text-2xl md:text-3xl tracking-tight ${highlight ? "text-accent" : "text-foreground"}`}>
      {value}
    </p>
  </div>
);

export default RoiCalculator;
