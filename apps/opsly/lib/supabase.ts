import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

// Detection for placeholder environment
const isPlaceholder = supabaseUrl.includes("placeholder-url");

// Base Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Enhanced auth helper to prevent "Failed to fetch" on unconfigured projects.
 * This ensures the UI remains fully functional even before Supabase keys are provided.
 */
export const getSafeAuth = () => {
  if (!isPlaceholder) return supabase.auth;

  // Mock implementation for local development without DB
  return {
    signUp: async ({ email }: { email: string }) => {
      console.warn("[Opsly] Using Mock Auth: Sign Up successful for", email);
      localStorage.setItem("opsly_mock_user", JSON.stringify({ email }));
      return { data: { user: { email } }, error: null };
    },
    signInWithPassword: async ({ email }: { email: string }) => {
      console.warn("[Opsly] Using Mock Auth: Sign In successful for", email);
      localStorage.setItem("opsly_mock_user", JSON.stringify({ email }));
      return { data: { user: { email } }, error: null };
    },
    getUser: async () => {
      const userStr = localStorage.getItem("opsly_mock_user");
      if (userStr) return { data: { user: JSON.parse(userStr) }, error: null };
      return { data: { user: null }, error: null };
    },
    signOut: async () => {
      localStorage.removeItem("opsly_mock_user");
      return { error: null };
    }
  } as any;
};

/**
 * Enhanced DB helper to prevent crashes when Supabase is unconfigured.
 */
export const getSafeDB = () => {
  if (!isPlaceholder) return supabase;

  return {
    from: (table: string) => ({
      select: (columns: string, options: any = {}) => {
        // Return mock data based on the table
        let data: any[] = [];
        if (table === "activities") {
          data = [
            { id: 1, type: "Signup", created_at: new Date().toISOString() },
            { id: 2, type: "Workspace Created", created_at: new Date().toISOString() },
          ];
        } else if (table === "profiles") {
          data = [{ id: 1, email: "demo@opsly.io" }];
        }
        
        if (options.count) {
          return Promise.resolve({ data, count: data.length, error: null });
        }
        return {
          order: () => ({
            limit: () => Promise.resolve({ data, error: null })
          }),
          limit: () => Promise.resolve({ data, error: null }),
          ...Promise.resolve({ data, error: null })
        };
      }
    })
  } as any;
};
