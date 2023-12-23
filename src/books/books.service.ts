import { Injectable } from "@nestjs/common";
import { type Books } from "kysely-codegen";
import { db } from "@/database";
import { type Selectable } from "kysely";

@Injectable()
export class BooksService {
  public async getAllBooks(): Promise<Array<Selectable<Books>>> {
    return db.selectFrom("books").selectAll().execute();
  }
}
