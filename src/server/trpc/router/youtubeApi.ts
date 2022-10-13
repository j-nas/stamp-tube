import { t } from "../trpc"
import { z } from "zod"

export const youtubeApiRouter = t.router({
  getVideoInfo: t.procedure
    .input(z.object({ v: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        video: `youtube video ID is ${input?.v ?? "undefined"}`
      }
    })
})





export { }