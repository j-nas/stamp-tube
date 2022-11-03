import { t, authedProcedure } from "../trpc"
import { z } from "zod"

export const timeStampRouter = t.router({
  //create stamp
  createTimestamp: authedProcedure
    .input(
      z.object({
        stamp: z.string(),
        time: z.number().default(0),
        label: z.string().default("Enter label here"),
      })
    )
    .mutation(({ ctx, input }) => {
      const { stamp, time, label } = input
      return ctx.prisma.timeStamp.create({
        data: {
          label: label,
          time: time,
          stamp: { connect: { id: stamp } },
        },
      })
    }),
  //get all timestamps by stamp
  getAllTimeStampsByStamp: authedProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.timeStamp.findMany({
        where: { stamp: { id: input } },
      })
    }),
  //edit stamp
  //delete one stamp
})
