import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type FeedbackData = {
    id?: string
    name: string
    department: string
    preferred_color: 'green' | 'purple' | 'blue'
    remark?: string
    viewed_green: boolean
    viewed_purple: boolean
    viewed_blue: boolean
    created_at?: string
}
