import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

export const supabaseAdmin = createBrowserSupabaseClient({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
})
