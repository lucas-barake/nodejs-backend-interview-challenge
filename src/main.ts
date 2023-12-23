import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import dotenv from "dotenv";
import { loadDatabase } from "@/database";
dotenv.config();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  await loadDatabase();

  const config = new DocumentBuilder()
    .setTitle("Books API")
    .setDescription("Books API description")
    .setVersion("1.0")
    .addTag("books")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}

void bootstrap();
