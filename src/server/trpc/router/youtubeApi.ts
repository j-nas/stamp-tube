import { t } from "../trpc"
import { z } from "zod"
import axios from "axios"
interface VideoInfo {
  id: string
  title: string
  description: string
  duration: string
}

interface YouTubeApiResponse {
  id: string
  snippet: {
    title: string
    description: string
  }
  contentDetails: {
    duration: string
  }
}
export const youtubeApiRouter = t.router({
  getVideoInfo: t.procedure.input(z.string()).query(async ({ input }) => {
    if (!input) return
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${input}&key=${process.env.YOUTUBE_API_KEY}`
    const { data } = await axios(url)
    const result: VideoInfo = {
      id: data.items[0].id,
      title: data.items[0].snippet.title,
      description: data.items[0].snippet.description,
      duration: data.items[0].contentDetails.duration,
    }
    return result
  }),
  getVideosWithStamps: t.procedure.query(async ({ ctx }) => {
    const allStamps = await ctx.prisma.stamp.findMany()
    const videoList = Array.from(
      new Set<string>(allStamps.map((stamp) => stamp.video))
    ).join(",")
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoList}&key=${process.env.YOUTUBE_API_KEY}`
    const { data } = await axios.get(url)
    const result: VideoInfo[] = data.items.map(
      (video: YouTubeApiResponse): VideoInfo => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        duration: video.contentDetails.duration,
      })
    )
    return result
  }),
})
