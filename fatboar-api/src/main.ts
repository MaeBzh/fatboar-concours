import * as dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(__dirname, "../.env") });
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";
import { AllExceptionFilter } from "./all-exceptions.filter";
import { AppModule } from "./app.module";

async function bootstrap() {
  const privateKey = fs.readFileSync(
    resolve(__dirname, "../../server.key"),
    "utf8"
  );
  const certificate = fs.readFileSync(
    resolve(__dirname, "../../server.cert"),
    "utf8"
  );
  const httpsOptions = { key: privateKey, cert: certificate };
  const corsOptions = {
    origin: process.env.CORS_ORIGIN.split(", "),
    methods: process.env.CORS_METHODS,
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS,
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors();
  app.setGlobalPrefix("api");

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  SwaggerModule.setup(
    "api",
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(process.env.APP_TITLE)
        .setVersion(process.env.APP_VERSION)
        .build()
    )
  );

  await app.listen(3000);
}

bootstrap();
