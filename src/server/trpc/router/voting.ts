import { t, authedProcedure } from "../trpc"
import { z } from "zod"

export const votingRouter = t.router({
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
