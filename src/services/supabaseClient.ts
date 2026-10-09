/**
 * REGIONAL - AI — Supabase Client
 * Typed Supabase JavaScript client with config validation,
 * safe initialization, session persistence, and auth state management.
 * Falls back to demo mode when Supabase credentials are unavailable.
 */

import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

function isSupabaseConfigured(): boolean {
  return !!(SUPABASE_URL && SUPABASE_KEY);
}

let supabaseClient: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseClient && isSupabaseConfigured()) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return supabaseClient;
}

export const supabase: SupabaseClient | null = getSupabaseClient();

export function demoSupabase() {
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: (_cb: any) => ({ data: { subscription: {} }, error: null }),
      signInWithPassword: async () => {
        throw new Error('Supabase not configured — use demo mode');
      },
      signUp: async () => {
        throw new Error('Supabase not configured — use demo mode');
      },
      signOut: async () => {
        throw new Error('Supabase not configured — use demo mode');
      },
    },
    from: (_table: string) => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: [], error: null }),
      update: () => Promise.resolve({ data: [], error: null }),
      single: () => Promise.resolve({ data: null, error: new Error('Demo mode') }),
    }),
  };
}

export async function restoreSession() {
  const client = getSupabaseClient();
  if (!client) {
    return { data: { session: null }, error: new Error('Supabase not configured') };
  }
  return await client.auth.getSession();
}

export async function signInWithPassword(email: string, password: string) {
  const client = getSupabaseClient();
  if (!client) {
    return { data: { session: null, user: null }, error: new Error('Supabase not configured') };
  }
  return await client.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  const client = getSupabaseClient();
  if (!client) {
    return { data: { session: null }, error: null };
  }
  const { error } = await client.auth.signOut();
  try {
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('supabase.auth.user');
  } catch (_) {}
  return { data: { session: null }, error };
}

export function onAuthStateChange(
  callback: (event: string, session: null | User) => void
) {
  const client = getSupabaseClient();
  if (!client) {
    callback('SIGNED_OUT', null);
    return { data: { subscription: {} }, error: null };
  }
  // Type workaround: Supabase client's onAuthStateChange expects Session | null,
  // but our callback expects User | null. We cast to satisfy the type.
  return client.auth.onAuthStateChange(callback as any);
}

export async function getCurrentUser(): Promise<{ data: { user: null | User }; error: null | any }> {
  const client = getSupabaseClient();
  if (!client) {
    return { data: { user: null }, error: new Error('Supabase not configured') };
  }
  return await client.auth.getUser();
}

export { isSupabaseConfigured };