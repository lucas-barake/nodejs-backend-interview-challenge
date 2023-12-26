import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export type Book = {
  bookTitle: string;
  authorName: string;
  createdAt: Date;
  bookId: number;
  authorId: number;
};

export const getBooksDTO = z.object({
  offset: z
    .number({
      coerce: true,
    })
    .int()
    .positive()
    .optional(),
  limit: z
    .number({
      coerce: true,
    })
    .int()
    .positive()
    .optional(),
  title: z.string().trim().min(1).optional(), // " foo  " -> "foo"
  order: z.enum(["asc", "desc"]).optional(), // "asc" | "desc"
});
export class GetBooksDTO extends createZodDto(getBooksDTO) {}

export const getBookByIdDTO = z.object({
  id: z
    .number({
      coerce: true,
    })
    .int()
    .positive(),
});
export class GetBookByIdDTO extends createZodDto(getBookByIdDTO) {}

export const createBookDTO = z.object({
  title: z.string().trim().min(1),
  authorId: z.number().int().positive(),
});
export class CreateBookDTO extends createZodDto(createBookDTO) {}

export type DeleteBookResponse = {
  id: number;
};
export const deleteBookDTO = z.object({
  id: z
    .number({
      coerce: true,
    })
    .int()
    .positive(),
});
export class DeleteBookDTO extends createZodDto(deleteBookDTO) {}
