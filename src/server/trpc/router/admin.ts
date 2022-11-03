import { t, adminProcedure } from "../trpc"

export const adminRouter = t.router({
  nukeDatabase: adminProcedure.mutation(({ ctx }) => {
    return () => {
      ctx.prisma.stamp.deleteMany()
      ctx.prisma.timeStamp.deleteMany()
      ctx.prisma.user.deleteMany({ where: { role: { equals: "USER" } } })
    }
  }),
})
