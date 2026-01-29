import { createClient } from "@supabase/supabase-js";

// Read env vars statically so Next.js can inline them in client bundles
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Runtime validation (still useful!)
if (!supabaseUrl) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
if (!supabaseKey) throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");

export const SUPABASE_CONFIG = {
  supabaseUrl,
  supabaseKey,
};

export const supabase = createClient(supabaseUrl, supabaseKey);
