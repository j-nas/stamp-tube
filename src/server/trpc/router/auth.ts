import { t, authedProcedure } from "../trpc"
import { signUpSchema } from "../../../utils/authValidation"
import { hash } from "argon2"
export const authRouter = t.router({
  getSession: t.procedure.query(({ ctx }) => {
    return ctx.session
  }),
  getSecretMessage: authedProcedure.query(() => {
    return "You are logged in and can see this secret message!"
  }),
  signUp: t.procedure.input(signUpSchema).mutation(async ({ input, ctx }) => {
    const { username, email, password } = input
    const exists = await ctx.prisma.user.findFirst({
      where: { email },
    })

    if (exists) {
      throw new Error("User already exsists")
    }

    const hashedPassword = await hash(password)

    const result = await ctx.prisma.user.create({
      data: { username, email, password: hashedPassword },
    })
    return {
      status: 201,
      message: "Account created successfully",
      result: result.email,
    }
  }),
})

export type AuthRouter = typeof authRouter
