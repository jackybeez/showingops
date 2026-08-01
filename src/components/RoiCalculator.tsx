import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Clock, Flame, Gauge, Loader2, Mail, Zap, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Showing Ops founding-member price. One place to change it.
const PRICE_MONTHLY = 35;
const PRICE_ANNUAL = PRICE_MONTHLY * 12;

// Rough hours of real work behind a single closed transaction. Used to convert
// an agent's commission into an implied hourly value for their own time.
const HOURS_PER_TRANSACTION = 80;

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
    <div className="flex items-baseline justify-between gap-3">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <span className="font-serif text-xl text-foreground tabular-nums">{format(value)}</span>
    </div>
    {hint && <p className="mt-0.5 text-[0.7rem] leading-4 text-muted-foreground">{hint}</p>}
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label={label}
      className="mt-3 w-full accent-accent"
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

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Smooth count-up hook. Snaps instantly when the visitor has asked for
// reduced motion.
const useAnimatedNumber = (target: number, duration = 500) => {
  const [value, setValue] = useState(target);
  const rafRef = useRef<number>();
  const startRef = useRef<{ from: number; to: number; t0: number }>();

  useEffect(() => {
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
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

type RoiSnapshot = {
  roi_leads: number;
  roi_commission: number;
  roi_response_min: number;
  roi_cold_pct: number;
  roi_recovered_low: number;
  roi_recovered_high: number;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/**
 * Inline lead capture that lives inside the results panel — the highest-intent
 * moment on the page. Sends the visitor's own modeled numbers along with the
 * email so we can see what pipelines people are actually running.
 */
const RoiCaptureForm = ({ snapshot }: { snapshot: RoiSnapshot }) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!isEmail(value) || value.length > 200) {
      toast({
        title: "Check that email",
        description: "Enter a valid email address so we know where to send it.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-beta", {
        body: { email: value, source: "roi-calculator", ...snapshot },
      });
      if (error) throw error;
      if (data && (data as { error?: string }).error) {
        throw new Error((data as { error?: string }).error);
      }
      setDone(true);
    } catch (err) {
      console.error("ROI capture failed", err);
      toast({
        title: "Something went wrong",
        description: "We couldn't save that just now. Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-xl border border-accent/40 bg-accent/10 p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
          <div>
            <p className="text-sm font-semibold text-panel-foreground">You&rsquo;re on the list.</p>
            <p className="mt-1 text-sm leading-6 text-panel-muted">
              We&rsquo;ll send your breakdown and your founding-member invite to{" "}
              <span className="text-panel-foreground">{email.trim().toLowerCase()}</span>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-panel-foreground/10 bg-panel-foreground/5 p-5">
      <p className="font-serif text-xl leading-tight text-panel-foreground">
        Want this breakdown in writing?
      </p>
      <p className="mt-1.5 text-sm leading-6 text-panel-muted">
        We&rsquo;ll email your numbers plus exactly how Showing Ops recovers them.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Mail
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-panel-muted"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@brokerage.com"
            maxLength={200}
            aria-label="Your email address"
            className="w-full rounded-lg border border-panel-foreground/15 bg-panel-foreground/5 py-3 pl-9 pr-3 text-sm text-panel-foreground placeholder:text-panel-muted/70 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90 disabled:opacity-60"
        >
          {sending ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />}
          {sending ? "Sending" : "Send it"}
        </button>
      </form>
      <p className="mt-3 text-[0.7rem] leading-5 text-panel-muted">
        No spam, and we never sell or share your information.{" "}
        <a href="/#beta" className="text-accent underline-offset-2 hover:underline">
          Or start free during the private beta
        </a>
        .
      </p>
    </div>
  );
};

const RoiCalculator = ({
  heading = "h2",
  showIntro = true,
}: { heading?: "h1" | "h2"; showIntro?: boolean }) => {
  const [leads, setLeads] = useState(12);
  const [commission, setCommission] = useState(9000);
  const [responseMin, setResponseMin] = useState(45);
  const [coldPct, setColdPct] = useState(35);

  const results = useMemo(() => {
    const { low, high } = estimateRecoveredClosings(leads, responseMin, coldPct);

    const commissionLow = low * commission;
    const commissionHigh = high * commission;

    // Time: ~60 min per lead of follow-up, scheduling and coordination, plus
    // baseline weekly ops (~5 hrs/wk of pipeline admin that never goes away).
    // Showing Ops automates the majority.
    const followUpHoursWeekly = leads / 4.33 + 5;
    const hoursSavedWeekly = Math.max(4, followUpHoursWeekly * 0.75);
    const hoursSavedAnnual = hoursSavedWeekly * 52;

    // Value of that reclaimed time at the agent's own implied hourly rate.
    const hourlyValue = commission / HOURS_PER_TRANSACTION;
    const timeValueAnnual = hoursSavedAnnual * hourlyValue;

    // Total upside vs. what Showing Ops costs for a year.
    const upsideLow = commissionLow + timeValueAnnual;
    const upsideHigh = commissionHigh + timeValueAnnual;
    const roiMultiple = upsideLow / PRICE_ANNUAL;

    return {
      closingsLow: low,
      closingsHigh: high,
      commissionLow,
      commissionHigh,
      hoursSavedWeekly,
      hoursSavedAnnual,
      hourlyValue,
      timeValueAnnual,
      upsideLow,
      upsideHigh,
      roiMultiple,
    };
  }, [leads, commission, responseMin, coldPct]);

  const animCommissionLow = useAnimatedNumber(results.commissionLow);
  const animCommissionHigh = useAnimatedNumber(results.commissionHigh);
  const animHours = useAnimatedNumber(results.hoursSavedWeekly);
  const animTimeValue = useAnimatedNumber(results.timeValueAnnual);
  const animRoi = useAnimatedNumber(results.roiMultiple);
  const animLossLow = useAnimatedNumber(results.upsideLow);
  const animLossHigh = useAnimatedNumber(results.upsideHigh);

  const singleOutcome = results.closingsLow === results.closingsHigh;

  const commissionLabel = useMemo(() => {
    const lo = currency(roundToNearest(animCommissionLow, 500));
    const hi = currency(roundToNearest(animCommissionHigh, 500));
    if (singleOutcome) return hi;
    return `${lo}–${hi}`;
  }, [animCommissionLow, animCommissionHigh, singleOutcome]);

  const summary = useMemo(() => {
    const dealCopy = singleOutcome
      ? `${results.closingsHigh} additional ${results.closingsHigh === 1 ? "closing" : "closings"}`
      : `${results.closingsLow}–${results.closingsHigh} additional closings`;
    return `At ${leads} new leads a month with a ${formatResponseTime(
      responseMin,
    )} average response, consistent follow-up and faster first contact realistically recover ${dealCopy} a year — plus about ${animHours.toFixed(
      1,
    )} hours back every week.`;
  }, [results, leads, responseMin, animHours, singleOutcome]);

  const snapshot: RoiSnapshot = {
    roi_leads: leads,
    roi_commission: commission,
    roi_response_min: responseMin,
    roi_cold_pct: coldPct,
    roi_recovered_low: results.commissionLow,
    roi_recovered_high: results.commissionHigh,
  };

  const Heading = heading;

  return (
    <section id="roi" className="border-b border-border">
      <div className={`mx-auto max-w-6xl px-6 ${showIntro ? "py-24" : "pt-12 pb-24"}`}>
        {showIntro && (
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">ROI</span>
            <Heading className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
              What is operational work costing you?
            </Heading>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              A conservative estimate of what you recover over a full year once the
              operational work runs on its own — in whole deals, real commission, and
              hours off your plate.
            </p>

          </div>
        )}

        {/* One bonded unit: white inputs, navy verdict. No gap between them, so
            mismatched column heights can never leave dead space. */}
        <div
          className={`grid overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)] lg:grid-cols-12 ${
            showIntro ? "mt-12" : ""
          }`}
        >
          {/* Inputs */}
          <div className="flex flex-col bg-card p-7 md:p-9 lg:col-span-5">
            <div>
              <h3 className="font-serif text-2xl tracking-tight text-foreground">Your numbers</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                Four honest inputs. Nothing is stored unless you ask us to send it.
              </p>
            </div>

            <div className="mt-8 flex flex-grow flex-col justify-between gap-8">
              <Field
                label="New leads per month"
                value={leads}
                min={1}
                max={40}
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

            <div className="mt-10 space-y-4 border-t border-border pt-6">
              <div className="flex items-start gap-2.5">
                <Zap size={14} className="mt-0.5 shrink-0 text-accent" />
                <p className="text-[0.78rem] leading-5 text-muted-foreground">
                  Most buyers and sellers contact several agents at once. Whoever replies
                  first usually books the appointment — everyone else inherits a cold lead.
                </p>
              </div>

              <details className="group rounded-lg bg-muted/60 px-3 py-2">
                <summary className="cursor-pointer list-none text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  How we calculate this
                </summary>
                <div className="mt-2 space-y-2 text-[0.75rem] leading-5 text-muted-foreground">
                  <p>
                    This is a conservative business-impact estimator, not a mathematical model.
                    It reflects what consistent operational execution recovers over a full
                    year — never to over-promise.
                  </p>
                  <ul className="list-disc space-y-1 pl-4">
                    <li>Only a small share of cold leads (roughly 6–27%) are treated as realistically recoverable, based on how fast today&rsquo;s response is.</li>
                    <li>Recovered leads convert to closings at a conservative blended rate.</li>
                    <li>Outcomes are rounded to whole deals — you either close the house or you don&rsquo;t.</li>
                    <li>Time saved reflects follow-up, scheduling, and coordination that gets automated (~60 min per lead plus roughly 5 hours a week of baseline pipeline admin).</li>
                    <li>
                      Your time is valued at your own implied hourly rate — commission per
                      closing divided by roughly {HOURS_PER_TRANSACTION} hours of real work
                      per transaction.
                    </li>
                    <li>ROI compares that total upside against ${PRICE_ANNUAL} a year (${PRICE_MONTHLY}/month).</li>
                  </ul>
                  <p>
                    These are estimates, not guarantees. Actual results vary by market, lead
                    source, and business.
                  </p>
                </div>
              </details>
            </div>
          </div>

          {/* Verdict */}
          <div className="flex flex-col bg-panel p-7 text-panel-foreground md:p-10 lg:col-span-7">
            <div className="flex-grow">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent">
                  Your estimate
                </span>
              </div>

              {/* Tier 1 — the hero */}
              <p className="mt-8 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-panel-muted">
                Commission you could recover per year
              </p>
              <p className="mt-2 font-serif text-[2.75rem] leading-[1.02] tracking-tight text-accent tabular-nums sm:text-6xl lg:text-7xl">
                {commissionLabel}
              </p>

              {/* Tier 2 — the plain-English case */}
              <p className="mt-5 max-w-xl font-serif text-lg italic leading-8 text-panel-foreground/90">
                {summary}
              </p>

              {/* Tier 3 — two supporting stats, no boxes */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2 text-panel-muted">
                    <Gauge size={13} className="text-accent" />
                    <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em]">
                      Return on subscription
                    </span>
                  </div>
                  <p className="mt-1.5 font-serif text-3xl text-panel-foreground tabular-nums">
                    {Math.max(1, Math.round(animRoi))}x
                  </p>
                  <p className="mt-1 text-xs leading-5 text-panel-muted">
                    Against ${PRICE_ANNUAL} a year, on the conservative low end.
                  </p>
                </div>
                <div className="sm:border-l sm:border-panel-foreground/15 sm:pl-6">
                  <div className="flex items-center gap-2 text-panel-muted">
                    <Clock size={13} className="text-accent" />
                    <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em]">
                      Time back
                    </span>
                  </div>
                  <p className="mt-1.5 font-serif text-3xl text-panel-foreground tabular-nums">
                    {animHours.toFixed(1)} hrs<span className="text-lg text-panel-muted">/wk</span>
                  </p>
                  <p className="mt-1 text-xs leading-5 text-panel-muted">
                    About {Math.round(results.hoursSavedAnnual)} hours a year — worth{" "}
                    {currency(roundToNearest(animTimeValue, 500))} of your own selling time.
                  </p>
                </div>
              </div>

              {/* Tier 4 — speed and the cost of standing still, together */}
              <div className="mt-8 rounded-xl border border-panel-foreground/10 bg-panel-foreground/5 p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-panel-muted">
                    Speed-to-lead
                  </span>
                  <span className="font-serif text-xl text-panel-loss tabular-nums">
                    {formatResponseTime(responseMin)}
                  </span>
                  <ArrowRight size={15} className="text-accent" />
                  <span className="font-serif text-xl text-accent">Under 1 min</span>
                </div>
                <div className="mt-4 flex items-start gap-2.5 border-t border-panel-foreground/10 pt-4">
                  <Flame size={14} className="mt-0.5 shrink-0 text-panel-loss" />
                  <p className="text-sm leading-6 text-panel-muted">
                    Standing still costs an estimated{" "}
                    <span className="font-semibold text-panel-loss tabular-nums">
                      {currency(roundToNearest(animLossLow, 500))}–
                      {currency(roundToNearest(animLossHigh, 500))}
                    </span>{" "}
                    a year in commission and lost selling time — and it repeats every year
                    you don&rsquo;t fix it.
                  </p>
                </div>
              </div>
            </div>

            {/* The ask */}
            <div className="mt-8">
              <RoiCaptureForm snapshot={snapshot} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoiCalculator;
