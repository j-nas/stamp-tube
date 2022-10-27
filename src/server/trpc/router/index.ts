// src/server/trpc/router/index.ts
import { t } from "../trpc"
import { exampleRouter } from "./example"
import { authRouter } from "./auth"
import { youtubeApiRouter } from "./youtubeApi"
import { stampsRouter } from "./stamps"
import { usersRouter } from "./users"

export const appRouter = t.router({
  example: exampleRouter,
  auth: authRouter,
  youtube: youtubeApiRouter,
  stamps: stampsRouter,
  users: usersRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
