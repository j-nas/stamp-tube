import { t, adminProcedure } from "../trpc"
import { z } from "zod"
export const adminRouter = t.router({
  nukeDatabase: adminProcedure.mutation(({ ctx }) => {
    return () => {
      ctx.prisma.stamp.deleteMany()
      ctx.prisma.timeStamp.deleteMany()
      ctx.prisma.user.deleteMany({ where: { role: { equals: "USER" } } })
    }
  }),
  changeRole: adminProcedure
    .input(
      z.object({
        id: z.string(),
        role: z.enum(["ADMIN", "USER"]),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id, role } = input
      return ctx.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          role: role,
        },
      })
    }),
})
