CREATE TABLE public.beta_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  brokerage text,
  team_size text,
  crm text,
  market text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.beta_signups TO anon;
GRANT ALL ON public.beta_signups TO service_role;
ALTER TABLE public.beta_signups ENABLE ROW LEVEL SECURITY;
CREATE POLICY anon_insert_beta ON public.beta_signups FOR INSERT TO anon WITH CHECK (true);