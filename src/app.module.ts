import { type MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthorsModule } from "./authors/authors.module";
import { BooksModule } from "./books/books.module";
import { ConfigModule } from "@nestjs/config";
import { LoggerMiddleware } from "@/middlewares/logger.middleware";
import { APP_PIPE } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";

@Module({
  imports: [
    AuthorsModule,
    BooksModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
