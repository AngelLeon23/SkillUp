import { createClient } from '@supabase/supabase-js'

// Esta es la API URL 
const supabaseUrl = 'https://hljmtudjewteixytfzyy.supabase.co'

// Esta es la API KEY
const supabaseKey = 'sb_publishable_5_v5tbVa75GM_gqD4okG8A_ebsBiD5o';
export const supabase = createClient(supabaseUrl, supabaseKey)