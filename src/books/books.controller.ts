import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BooksService } from "@/books/books.service";
import { type Books } from "kysely-codegen";
import { type Selectable } from "kysely";

@ApiTags("books")
@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: "Get all books" })
  @ApiResponse({ status: 200, description: "OK" })
  public async getAllBooks(): Promise<Array<Selectable<Books>>> {
    return this.booksService.getAllBooks();
  }
}
