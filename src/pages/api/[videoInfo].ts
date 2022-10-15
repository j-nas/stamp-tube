import type { NextApiRequest, NextApiResponse } from "next"
import { env } from "../../env/server.mjs"
import axios from "axios"

const videoInfoHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req
  const { id } = query
  const apiKey = env.YOUTUBE_API_KEY
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${apiKey}`
  try {
    const { data } = await axios.get(url)
    res.status(200).json(data.items[0].snippet)
  } catch (error) {
    res.status(400).json(error)
  }
}

export default videoInfoHandler
