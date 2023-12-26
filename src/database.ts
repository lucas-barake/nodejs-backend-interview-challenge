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
    log:
      process.env.NODE_ENV === "development"
        ? (event) => {
            const formattedSql = event.query.sql.replace(/\$(\d+)/g, (_, index) => {
              const param = event.query.parameters[Number(index) - 1];
              return param !== null && param !== undefined && typeof param.toString === "function"
                ? param.toString()
                : "UNKNOWN_PARAM";
            });

            Logger.debug(`\n${formattedSql} \n(${event.queryDurationMillis}ms)`, "Kysely");
          }
        : undefined,
  });
}
