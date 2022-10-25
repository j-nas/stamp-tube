import { t } from "../trpc"
import { z } from "zod"
import axios from "axios"
interface VideoInfo {
  id: string
  title: string
  description: string
  duration: string
}
export const youtubeApiRouter = t.router({
  getVideoInfo: t.procedure
    .input(z.string())
    // .output(
    //   z.object({
    //     videoId: z.string(),
    //     videoTitle: z.string(),
    //     videoDescription: z.string(),
    //     videoDuration: z.string(),
    //   })
    // )
    .query(async ({ input }) => {
      if (!input) return
      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${input}&key=${process.env.YOUTUBE_API_KEY}`
      const { data } = await axios(url)
      console.log("input: ", input)
      const result: VideoInfo = {
        id: data.items[0].id,
        title: data.items[0].snippet.title,
        description: data.items[0].snippet.description,
        duration: data.items[0].contentDetails.duration,
      }
      console.log(result)
      return result
    }),
})
