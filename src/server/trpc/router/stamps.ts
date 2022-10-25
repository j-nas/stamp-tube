import { t, authedProcedure } from "../trpc"
import { z } from "zod"

export const stampsRouter = t.router({
  getStampsByVideo: t.procedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.stamp.findMany({
      where: { video: input },
      include: { author: true, timestamps: true },
    })
  }),
  getStampsByAuthor: t.procedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.stamp.findMany({
      where: { authorId: input },
      include: { author: true, timestamps: true },
    })
  }),
  createStamps: authedProcedure
    .input(
      z.object({
        video: z.string(),
        author: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.stamp.create({
        data: {
          video: input.video,
          author: {
            connect: { id: input.author },
          },
        },
      })
    }),
  deleteStamp: authedProcedure
    .input(z.object({ stampId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.stamp.delete({ where: { id: input.stampId } })
    }),
})
