import { createClient } from '@supabase/supabase-js'
export { definitions } from '../../types/database/index'

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
)
