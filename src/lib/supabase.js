import { createClient } from '@supabase/supabase-js'

// Real values are supplied by the live server's environment.
// Fallbacks below only stop the build from crashing when the key is absent
// (e.g. in a preview build); with the real key present, behaviour is unchanged.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
