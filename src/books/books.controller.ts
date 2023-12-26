import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BooksService } from "@/books/books.service";
import {
  type Book,
  CreateBookDTO,
  DeleteBookDTO,
  type DeleteBookResponse,
  GetBookByIdDTO,
  getBooksDTO,
  GetBooksDTO,
} from "@/books/books.dto";

@ApiTags("books")
@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: "Get all books" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiQuery({ name: "limit", type: Number, required: false })
  @ApiQuery({ name: "offset", type: Number, required: false })
  @ApiQuery({ name: "title", type: String, required: false })
  @ApiQuery({ name: "order", type: String, required: false, enum: getBooksDTO.shape.order.unwrap().enum })
  public async getAllBooks(@Query() query: GetBooksDTO): Promise<Book[]> {
    return this.booksService.getAllBooks(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get book by id" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiParam({ name: "id", type: Number })
  public async getBookById(@Param() params: GetBookByIdDTO): Promise<Book> {
    return this.booksService.getBookById(params.id);
  }

  @Post()
  @ApiOperation({ summary: "Create book" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Created" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  public async createBook(@Body() body: CreateBookDTO): Promise<Book> {
    return this.booksService.createBook(body);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete book" })
  @ApiResponse({ status: HttpStatus.OK, description: "No Content" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiParam({ name: "id", type: Number })
  public async deleteBook(@Param() params: DeleteBookDTO): Promise<DeleteBookResponse> {
    return this.booksService.deleteBook(params.id);
  }
}
