import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v: unknown, max = 200) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const name = clean(body.name, 120);
    const email = clean(body.email, 200).toLowerCase();
    const brokerage = clean(body.brokerage, 200);
    const team_size = clean(body.team_size, 40);
    const crm = clean(body.crm, 80);
    const market = clean(body.market, 200);
    const phone = clean(body.phone, 40);
    const sms_consent = body.sms_consent === true;

    if (!name || !email || !isEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Name and a valid email are required." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error } = await supabase.from("beta_signups").insert({
      name,
      email,
      brokerage: brokerage || null,
      team_size: team_size || null,
      crm: crm || null,
      market: market || null,
      phone: phone || null,
      sms_consent,
    });

    if (error) throw error;

    // If the applicant opted into SMS AND provided a phone, also record it
    // in the compliance-tracked sms_optins table so nothing about A2P
    // recordkeeping changes.
    if (sms_consent && phone) {
      const [first_name, ...rest] = name.split(" ");
      const last_name = rest.join(" ");
      const { error: smsErr } = await supabase.from("sms_optins").insert({
        phone,
        first_name: first_name || null,
        last_name: last_name || null,
        email,
        brokerage_name: brokerage || null,
      });
      if (smsErr) console.error("sms_optins insert failed", smsErr);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("submit-beta error", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
