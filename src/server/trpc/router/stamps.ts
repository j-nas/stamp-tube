import { t, authedProcedure } from "../trpc"
import { z } from "zod"

export const stampsRouter = t.router({
  getStamps: t.procedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.stamp.findMany({ where: { video: input } })
  }),
  createStamps: authedProcedure.input(z.any()).mutation(({ ctx, input }) => {
    const data = ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    })
    const account = ctx.prisma.account.findMany()
    console.log(data)
    return data
  }),
})
