import { CheckCircle2 } from "lucide-react";
import BetaWaitlist from "./BetaWaitlist";

const PERKS = [
  { title: "Free throughout the private beta", desc: "Full access at no cost while we build alongside you." },
  { title: "Locked-in pricing at launch", desc: "Founding-customer rate when we open to the market." },
  { title: "White-glove onboarding", desc: "The founding team sets up your workflows with you." },
  { title: "Direct access to the founders", desc: "Real phone numbers. Real replies. Not a support queue." },
  { title: "Priority support during beta", desc: "First in line for fixes, features, and workflow help." },
  { title: "Shape the roadmap", desc: "What you need next is what we build next." },
];

const FoundingMember = () => (
  <section className="border-t border-border bg-muted/40">
    <div className="mx-auto max-w-6xl px-6 pt-24 pb-6">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Founding Members</span>
        <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
          A small group helping shape Showing Ops.
        </h2>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          We're inviting a handful of brokerages and top-producing teams
          into the private beta. Real onboarding. Real conversations. Real
          product influence.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PERKS.map((p) => (
          <div key={p.title} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 text-accent shrink-0" size={18} />
              <div>
                <p className="text-sm font-semibold text-foreground">{p.title}</p>
                <p className="mt-1 text-[0.82rem] leading-6 text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <BetaWaitlist />
  </section>
);

export default FoundingMember;
