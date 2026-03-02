import { Kysely } from 'kysely'
import { D1Dialect } from 'kysely-d1'

export interface Env {
  DB: D1Database
  BETTER_AUTH_SECRET: string
  BETTER_AUTH_URL: string
}

interface KvTable {
  key: string
  value: string
}

interface Database {
  kv: KvTable
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    if (!key) {
      return new Response('No key defined.', { status: 400 })
    }

    // Create Kysely instance with kysely-d1
    const db = new Kysely<Database>({
      dialect: new D1Dialect({ database: env.DB }),
    })

    // Read row from D1 table
    const result = await db
      .selectFrom('kv')
      .selectAll()
      .where('key', '=', key)
      .executeTakeFirst()
    if (!result) {
      return new Response('No value found', { status: 404 })
    }

    return new Response(result.value)
  },
}
// export interface Env {
//   DB: D1Database
// }
// export default {
//   async fetch(request: Request, env: Env) {
//     const db = drizzle(env.DB)
//   },
// }
