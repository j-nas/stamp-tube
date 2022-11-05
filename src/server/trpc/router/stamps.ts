import { t, authedProcedure } from "../trpc"
import { z } from "zod"

export const stampsRouter = t.router({
  getStampsByVideo: t.procedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.stamp.findMany({
      where: { video: input },
      include: { author: true, timestamps: true },
    })
  }),
  getStampsByAuthor: t.procedure
    .input(z.string().nullish())
    .query(({ ctx, input }) => {
      if (!input) return

      return ctx.prisma.stamp.findMany({
        where: { authorId: input },
        include: { author: true, timestamps: true },
      })
    }),
  createStamp: authedProcedure
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
  voteStamp: authedProcedure
    .input(
      z.object({
        stampId: z.string(),
        vote: z.enum(["UP", "DOWN", "NONE"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { stampId, vote } = input
      const existingVote = await ctx.prisma.vote.findFirst({
        where: { stampId: stampId },
      })
      if (!existingVote) {
        return ctx.prisma.vote.create({
          data: {
            upOrDown: vote === "DOWN" ? -1 : vote === "UP" ? 1 : 0,
            userId: ctx.session.user.id,
            stampId: stampId,
          },
        })
      }
      return ctx.prisma.vote.update({
        where: { id: existingVote.id },
        data: {
          upOrDown: vote === "DOWN" ? -1 : vote === "UP" ? 1 : 0,
        },
      })
    }),
  countVotes: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    const voteTally = await ctx.prisma.vote.findMany({
      where: {
        stampId: input,
      },
      select: {
        upOrDown: true,
      },
    })
    return voteTally.map((v) => v.upOrDown).reduce((p, c) => p + c)
  }),
  getVotesByUser: authedProcedure.query(({ ctx }) => {
    return ctx.prisma.vote.findMany({
      where: { userId: ctx.session.user.id },
      select: {
        id: true,
        upOrDown: true,
        stamp: true,
      },
    })
  }),
})
