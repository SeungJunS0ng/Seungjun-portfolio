import { supabase } from '../api/supabase'
import type { Post } from '../../entity/post/model/types'

export async function getPosts(): Promise<Post[]> {
    const { data, error } = await supabase
    .from('posts')
    .select('id, slug, title, summary, created_at')
    .order('created_at', { ascending: false })

    if (error) throw error
    return data
}