import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { type DB } from "kysely-codegen";
import dotenv from "dotenv";

export let db: Kysely<DB>;

export async function loadDatabase(): Promise<void> {
  dotenv.config();

  const dialect = new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  });

  db = new Kysely<DB>({
    dialect,
  });
}
