import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import RoiCalculator from "@/components/RoiCalculator";

const TITLE = "Real Estate Lead Follow-Up ROI Calculator";
const DESCRIPTION =
  "Estimate what slow response and inconsistent lead follow-up cost you each year — in closings, commission, and hours. Free ROI calculator for real estate agents.";
const CANONICAL = "https://showingops.com/roi-calculator";

const faqs = [
  {
    q: "How much money do realtors lose to slow lead follow-up?",
    a: "It depends on lead volume and response time, but for a typical agent taking 12 new leads a month with a 45-minute average first response, the leads that go cold before meaningful follow-up represent one to three closings a year. At a $9,000 average commission that is $9,000 to $27,000 of recoverable commission annually, before counting the hours spent chasing leads manually.",
  },
  {
    q: "Why does speed-to-lead matter so much in real estate?",
    a: "Buyers and sellers usually contact several agents at once. The agent who replies first sets the appointment, and the rest inherit a cold lead. Cutting first response from 45 minutes to under a minute is the single highest-leverage change most agents can make to their pipeline.",
  },
  {
    q: "How does this calculator estimate results?",
    a: "It is a conservative business-impact estimator, not a linear formula. Only about 6 to 27 percent of cold leads are treated as realistically recoverable depending on current response time, recovered leads convert to closings at a conservative blended rate, and outcomes are rounded to whole deals. Time saved reflects follow-up, scheduling, and coordination work that gets automated.",
  },
  {
    q: "How does Showing Ops actually recover those leads?",
    a: "Showing Ops is an AI operations manager. When a lead is assigned in your CRM it responds within a minute, drafts personalized follow-up for your approval, keeps warm leads warm with intelligent sequences, coordinates showings against your real calendar, and writes every call, text, note, and task back to your CRM automatically.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: TITLE,
      url: CANONICAL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: DESCRIPTION,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@type": "Organization", name: "Showing Ops", url: "https://showingops.com" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const RoiCalculatorPage = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${TITLE} | Showing Ops`;
    setMeta("name", "description", DESCRIPTION);
    setMeta("property", "og:title", TITLE);
    setMeta("property", "og:description", DESCRIPTION);
    setMeta("property", "og:url", CANONICAL);
    setMeta("property", "og:type", "website");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", TITLE);
    setMeta("name", "twitter:description", DESCRIPTION);
    setMeta("name", "twitter:url", CANONICAL);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevHref = canonical?.getAttribute("href") ?? null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", CANONICAL);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (prevHref) canonical?.setAttribute("href", prevHref);
      script.remove();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-serif text-xl tracking-tight text-foreground">
            Showing Ops
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition">Home</Link>
            <Link to="/#workflow" className="hover:text-foreground transition">How it works</Link>
            <Link to="/#capabilities" className="hover:text-foreground transition">Capabilities</Link>
            <span className="text-foreground">ROI Calculator</span>
          </nav>
          <a
            href="/#beta"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary/90"
          >
            Get early access <ArrowRight size={14} />
          </a>
        </div>
      </header>

      <main>
        {/* Intro */}
        <section className="border-b border-border" style={{ background: "var(--gradient-hero)" }}>
          <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Free tool for real estate agents
            </span>
            <h1 className="mt-4 font-serif text-[2.25rem] md:text-[3.5rem] leading-[1.05] tracking-[-0.02em] text-foreground">
              Real estate lead follow-up ROI calculator
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Slow first response and follow-up that never happens are the two
              most expensive habits in real estate — and they never show up on a
              P&amp;L. Move the sliders below to see what your own pipeline is
              leaking every year, in closings, commission, and hours.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <RoiCalculator showIntro={false} />

        {/* What drives the numbers */}
        <section className="border-b border-border bg-muted/40">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] tracking-tight text-foreground">
              What actually drives the number
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  t: "First response time",
                  d: "Most buyers and sellers contact several agents. Whoever replies first usually books the appointment — the rest inherit a cold lead.",
                },
                {
                  t: "Follow-up persistence",
                  d: "Most agents stop after two or three touches. A large share of conversions happen after that, which is exactly where deals quietly disappear.",
                },
                {
                  t: "Scheduling friction",
                  d: "Every extra round of back-and-forth to book a showing loses interested people who were ready to move.",
                },
                {
                  t: "CRM accuracy",
                  d: "If calls, texts, notes, and next steps never get logged, nothing can be prioritized — and leads fall through the cracks by default.",
                },
              ].map((c) => (
                <div key={c.t} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-semibold text-foreground">{c.t}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] tracking-tight text-foreground">
              Frequently asked questions
            </h2>
            <div className="mt-8 space-y-4">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-semibold text-foreground">{f.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted/40">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] tracking-tight text-foreground">
              Stop leaking commission.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Showing Ops responds in under a minute, follows up until someone
              answers, and keeps your CRM honest — automatically.
            </p>
            <a
              href="/#beta"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary/90"
            >
              Get early access <ArrowRight size={16} />
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              Free during private beta · Locked-in founding pricing · No credit card
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RoiCalculatorPage;
