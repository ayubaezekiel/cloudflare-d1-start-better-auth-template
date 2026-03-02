import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../db/index'

export interface Env {
  DB: D1Database
  BETTER_AUTH_SECRET: string
  BETTER_AUTH_URL: string
}

export const createAuth = (env: Env) => {
  const db = drizzle(env.DB, { schema })

  return betterAuth({
    database: drizzleAdapter(db, { provider: 'sqlite' }),
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    emailAndPassword: { enabled: true },
  })
}
