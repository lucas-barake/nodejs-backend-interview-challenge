import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { type DB } from "kysely-codegen";
import { Logger } from "@nestjs/common";

export let db: Kysely<DB>;

export async function loadDatabase(): Promise<void> {
  const dialect = new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  });

  db = new Kysely<DB>({
    dialect,
    log(event) {
      Logger.debug(`${event.query.sql} (${event.queryDurationMillis}ms)`, "Kysely");
    },
  });
}
