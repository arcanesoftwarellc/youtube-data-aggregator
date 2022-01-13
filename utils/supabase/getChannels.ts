import { supabase, definitions } from './supabase'

export const getChannels = async (): Promise<definitions['channels'][]> => {
    const channels = await supabase
        .from<definitions['channels']>('channels')
        .select('*')
    return channels.body
}
