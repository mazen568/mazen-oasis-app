import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/database.types'; 

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl) throw new Error("NEXT_PUBLIC_SUPABASE_URL is required");
if (!supabaseAnonKey) throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is required");
if (!supabaseServiceRoleKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required");

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);   
export const supabaseAdmin = createClient<Database>(
    supabaseUrl,
    supabaseServiceRoleKey
  );
