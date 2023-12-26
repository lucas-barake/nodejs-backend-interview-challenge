<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Database

```bash
$ docker-compose up -d
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# watch mode
$ yarn run start:dev
```

## Docs

You can find the Swagger docs in the following url: http://localhost:3000/api

## Instruction

- GET /books: to list all the books in the database, with optional query parameters for filtering, sorting, and pagination.
- GET /books/:id: to get a specific book by its id, with the author’s name and bio included in the response.
- POST /books: to create a new book, with validation for the required fields and the author’s existence.
- PUT /books/:id: to update an existing book by its id, with validation for the fields and the author’s existence.
- DELETE /books/:id: to delete an existing book by its id, with a confirmation message in the response.
- GET /search: to search for books by author’s name, with optional query parameters for filtering, sorting, and pagination. The response should include the books that match the author’s name, with the author’s name and bio included in each book.
