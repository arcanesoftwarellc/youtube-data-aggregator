import type { youtube_v3 } from 'googleapis'
import type { definitions } from '../supabase/supabase'
import { google } from 'googleapis'
const youtube = google.youtube('v3')

export const getVideos = async (
    channel: string,
    pageToken?: string
): Promise<youtube_v3.Schema$PlaylistItem[]> => {
    const uploads = await youtube.playlistItems.list({
        playlistId: 'UU' + channel.slice(2),
        key: process.env.YOUTUBE_API_KEY,
        part: ['snippet'],
        maxResults: 50,
        pageToken,
    })
    const { items, nextPageToken } = uploads?.data
    return [
        ...(items ?? []),
        ...(nextPageToken ? await getVideos(channel, nextPageToken) : []),
    ]
}

export const getUploads = async (channel: definitions['channels']) =>
    (await getVideos(channel.channel)).map(video => ({
        channel: channel.id,
        videoId: video.snippet.resourceId.videoId,
        title: video.snippet.title,
        description: video.snippet.description,
        publishedAt: video.snippet.publishedAt,
        thumbnail_default: video.snippet.thumbnails.default.url,
        thumbnail_medium: video.snippet.thumbnails.medium.url,
        thumbnail_high: video.snippet.thumbnails.high.url,
    })) ?? []
