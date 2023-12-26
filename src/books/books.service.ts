import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { db } from "@/database";
import { type Book, type CreateBookDTO, type DeleteBookResponse, type GetBooksDTO } from "@/books/books.dto";
import { DatabaseError } from "pg";
import { NoResultError } from "kysely";

@Injectable()
export class BooksService {
  public async getAllBooks(query: GetBooksDTO): Promise<Book[]> {
    let dbQuery = db.selectFrom("books").innerJoin("authors", "authors.id", "books.author_id");

    if (query.title !== undefined) {
      dbQuery = dbQuery.where("books.title", "ilike", `%${query.title}%`);
    }

    if (query.offset !== undefined) {
      const { totalCount } = await dbQuery
        .select((eb) => eb.fn.countAll<number>().as("totalCount"))
        .executeTakeFirstOrThrow();
      if (totalCount > query.offset) {
        dbQuery = dbQuery.offset(query.offset);
      }
    }

    if (query.limit !== undefined) {
      dbQuery = dbQuery.limit(query.limit);
    }

    dbQuery = dbQuery.orderBy("books.created_at", query.order ?? "desc");

    return dbQuery
      .select([
        "books.title as bookTitle",
        "authors.name as authorName",
        "books.created_at as createdAt",
        "books.id as bookId",
        "authors.id as authorId",
      ])
      .execute();
  }

  public async getBookById(id: number): Promise<Book> {
    try {
      return await db
        .selectFrom("books")
        .innerJoin("authors", "authors.id", "books.author_id")
        .select([
          "books.title as bookTitle",
          "authors.name as authorName",
          "books.created_at as createdAt",
          "books.id as bookId",
          "authors.id as authorId",
        ])
        .where("books.id", "=", id)
        .executeTakeFirstOrThrow();
    } catch (error) {
      if (error instanceof NoResultError) {
        throw new HttpException("Book does not exist", HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  public async createBook(data: CreateBookDTO): Promise<Book> {
    try {
      const createdBook = await db
        .insertInto("books")
        .values({
          title: data.title,
          author_id: data.authorId,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      return await db
        .selectFrom("books")
        .innerJoin("authors", "authors.id", "books.author_id")
        .select([
          "books.title as bookTitle",
          "authors.name as authorName",
          "books.created_at as createdAt",
          "books.id as bookId",
          "authors.id as authorId",
        ])
        .where("books.id", "=", createdBook.id)
        .executeTakeFirstOrThrow();
    } catch (error) {
      if (error instanceof DatabaseError && error.code === "23503") {
        throw new HttpException("Author does not exist", HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  public async deleteBook(id: number): Promise<DeleteBookResponse> {
    try {
      const deleteResult = await db
        .deleteFrom("books")
        .where("id", "=", id)
        .returning("books.id")
        .executeTakeFirstOrThrow();
      return {
        id: deleteResult.id,
      };
    } catch (error) {
      if (error instanceof NoResultError) {
        throw new HttpException("Book does not exist", HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }
}
