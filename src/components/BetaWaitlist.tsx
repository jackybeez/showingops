import { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const TEAM_SIZES = ["Solo agent", "2–5", "6–20", "21–50", "50+"];
const CRMS = [
  "Follow Up Boss",
  "kvCORE",
  "Sierra Interactive",
  "Chime",
  "Lofty",
  "BoomTown",
  "HubSpot",
  "Other / None",
];

const BetaWaitlist = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    brokerage: "",
    team_size: "",
    crm: "",
    market: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.email.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("submit-beta", {
        body: form,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15";

  return (
    <section id="beta" className="relative border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <Sparkles size={12} /> Private Beta
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
            Join the ShowingOps beta.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground max-w-md">
            We're onboarding a small group of brokerages and top-producing
            teams. Tell us about your business and we'll be in touch as spots
            open up.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-foreground/80">
            {[
              "White-glove onboarding with the founding team",
              "Direct input on the roadmap",
              "Founding-customer pricing for life",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 text-accent shrink-0" size={18} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {!submitted ? (
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-background p-6 md:p-7 shadow-[var(--shadow-card)] flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground" htmlFor="beta-name">
                  Name
                </label>
                <input id="beta-name" name="name" required value={form.name} onChange={onChange} placeholder="Jane Smith" className={`${inputCls} mt-1.5`} />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground" htmlFor="beta-email">
                  Work email
                </label>
                <input id="beta-email" name="email" type="email" required value={form.email} onChange={onChange} placeholder="jane@brokerage.com" className={`${inputCls} mt-1.5`} />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground" htmlFor="beta-brokerage">
                Brokerage
              </label>
              <input id="beta-brokerage" name="brokerage" value={form.brokerage} onChange={onChange} placeholder="Acme Realty Group" className={`${inputCls} mt-1.5`} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground" htmlFor="beta-team">
                  Team size
                </label>
                <select id="beta-team" name="team_size" value={form.team_size} onChange={onChange} className={`${inputCls} mt-1.5`}>
                  <option value="">Select…</option>
                  {TEAM_SIZES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground" htmlFor="beta-crm">
                  CRM
                </label>
                <select id="beta-crm" name="crm" value={form.crm} onChange={onChange} className={`${inputCls} mt-1.5`}>
                  <option value="">Select…</option>
                  {CRMS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground" htmlFor="beta-market">
                Primary market
              </label>
              <input id="beta-market" name="market" value={form.market} onChange={onChange} placeholder="Denver, CO" className={`${inputCls} mt-1.5`} />
            </div>

            {error && <p className="text-xs text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? "Submitting…" : "Request beta access"}
            </button>
            <p className="text-[0.7rem] text-muted-foreground">
              We'll only email you about your beta application. No spam, ever.
            </p>
          </form>
        ) : (
          <div className="rounded-2xl border border-accent/30 bg-accent/10 p-8 flex items-start gap-3 text-foreground">
            <CheckCircle2 className="mt-0.5 text-accent" size={24} />
            <div>
              <p className="font-semibold text-lg">You're on the list.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Thanks for your interest in the ShowingOps beta. We'll reach
                out as onboarding spots open up.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BetaWaitlist;
