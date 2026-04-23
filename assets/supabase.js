// Shared Supabase client. The publishable key is safe to expose client-side
// — Supabase's security model relies on Row-Level Security on your tables,
// not on hiding this key. If you ever need a service-role key, keep that one
// server-side only (never in this file).

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://viaoirwolsaaktkcmubh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Fp7U18-xWqQboaTU8rFZ9A_YbRX6PD2";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export async function getUser(){
  const { data } = await supabase.auth.getUser();
  return data.user || null;
}

export async function getSession(){
  const { data } = await supabase.auth.getSession();
  return data.session || null;
}

export async function signOut(){
  const { error } = await supabase.auth.signOut();
  if (error) console.error("sign out failed:", error);
  return !error;
}

export function onAuthChange(cb){
  const { data } = supabase.auth.onAuthStateChange((_event, session) => cb(session?.user || null));
  return () => data.subscription.unsubscribe();
}
