import { useMemo, useState } from "react";
import { TrendingUp, Clock, DollarSign, CalendarCheck } from "lucide-react";

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

const RoiCalculator = () => {
  const [leads, setLeads] = useState(60);
  const [commission, setCommission] = useState(9000);
  const [responseMin, setResponseMin] = useState(45);
  const [coldPct, setColdPct] = useState(40);

  const results = useMemo(() => {
    const recoveredRate = Math.min(0.5, (responseMin / 60) * 0.25);
    const cold = coldPct / 100;
    const appts = leads * cold * recoveredRate * 0.4;
    const revenueMonthly = appts * commission * 0.25;
    const hoursMonthly = leads * 0.15;
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
            Move the sliders to match your business. See what's likely being
            left on the table today.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Inputs */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-[var(--shadow-card)] space-y-6">
            <Field label="Leads per month" value={leads} min={10} max={500} step={5} format={(n) => `${n}`} onChange={setLeads} />
            <Field label="Average commission" value={commission} min={2000} max={30000} step={500} format={currency} onChange={setCommission} />
            <Field label="Current avg response time" value={responseMin} min={1} max={240} step={1} format={(n) => `${n} min`} onChange={setResponseMin} />
            <Field label="Leads that go cold today" value={coldPct} min={5} max={80} step={1} format={(n) => `${n}%`} onChange={setColdPct} />
          </div>

          {/* Outputs */}
          <div className="rounded-2xl border border-accent/40 bg-card p-6 md:p-8 shadow-[var(--shadow-card)] ring-1 ring-accent/20">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Estimated impact</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Metric icon={CalendarCheck} label="Appointments recovered / mo" value={String(results.appts)} />
              <Metric icon={DollarSign} label="Revenue recovered / mo" value={currency(results.revenue)} />
              <Metric icon={Clock} label="Hours saved / mo" value={`${results.hours} hrs`} />
              <Metric icon={TrendingUp} label="Estimated annual ROI" value={currency(results.annual)} highlight />
            </div>
            <p className="mt-6 text-[0.72rem] leading-5 text-muted-foreground">
              Conservative estimates for illustration only — not a guarantee
              of results. Actual outcomes depend on your market, close rate,
              and how quickly your team engages new leads today.
            </p>
            <a
              href="#beta"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary/90"
            >
              Claim these hours back
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
  icon: React.ComponentType<{ size?: number; className?: string }>;
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
