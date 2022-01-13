import { NextApiRequest, NextApiResponse } from 'next'
import { getChannels } from '../utils/supabase/getChannels'
import { updateVideos } from '../utils/supabase/updateVideos'

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const channels = await getChannels()
    response.json(await updateVideos(channels))
}
