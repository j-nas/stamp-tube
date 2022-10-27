import { t } from "../trpc"
import { z } from "zod"

export const usersRouter = t.router({
  getAllUsers: t.procedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany()
  }),
})
