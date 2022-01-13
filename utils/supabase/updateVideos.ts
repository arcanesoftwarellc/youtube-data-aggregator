import { supabase, definitions } from './supabase'
import { getChannels } from './getChannels'
import { getUploads } from '../youtube/getUploads'

const updateVideo = async (channel: definitions['channels']) => {
    const uploads = await getUploads(channel)
    const { data, error } = await supabase
        .from<definitions['videos']>('videos')
        .upsert(uploads, {
            ignoreDuplicates: true,
            onConflict: 'videoId',
        })
    return { ...channel, data, error }
}

export const updateVideos = async (channels: definitions['channels'][]) =>
    await Promise.all(channels.map(updateVideo))
