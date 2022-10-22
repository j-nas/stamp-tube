import { t } from "../trpc"
import { z } from "zod"
import axios from "axios"

export const youtubeApiRouter = t.router({
  getVideoInfo: t.procedure
    .input(
      z
        .object({
          v: z.union([z.string().length(11).nullish(), z.string().array()]),
        })
        .nullish()
    )
    .output(
      z.object({
        data: z.object({
          items: z
            .object({
              snippet: z.object({
                title: z.string(),
                description: z.string(),
              }),
            })
            .array(),
        }),
      })
    )

    .query(async ({ input }) => {
      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${input?.v}&key=${process.env.YOUTUBE_API_KEY}`
      const { data } = await axios(url)
      return { data }
    }),
})
