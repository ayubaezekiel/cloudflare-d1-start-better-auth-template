import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'

// Temporary local SQLite DB — just for CLI schema generation
const sqlite = new Database(':memory:')
const db = drizzle(sqlite)

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true,
  },
})
