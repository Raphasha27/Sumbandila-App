import { createBrowserClient } from "@supabase/ssr";

/**
 * Legacy Supabase Client (Redirected to new SSR Client)
 * 
 * Maintained for backward compatibility with existing lib files.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createBrowserClient(supabaseUrl, supabaseKey);
