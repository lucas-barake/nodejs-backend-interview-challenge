import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthorsModule } from "./authors/authors.module";
import { BooksModule } from "./books/books.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    AuthorsModule,
    BooksModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
