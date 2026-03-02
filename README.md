# TanStack Start + shadcn/ui

This is a template for a new TanStack Start project with React, TypeScript, and shadcn/ui.


# 1. Generate better-auth schema (when adding plugins)
bun run auth:generate

# 2. Generate Drizzle migration files
bun run db:generate

# 3. Apply locally first (test)
bun run db:migrate:local

# 4. Apply to production
bun run db:migrate:remote

# 5. Inspect DB visually
bun run db:studio
