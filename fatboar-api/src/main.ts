import * as dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(__dirname, "../.env") });

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as compression from "compression";
import * as fs from "fs";
import helmet from "helmet";
import { AllExceptionFilter } from "./all-exceptions.filter";
import { AppModule } from "./app.module";

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';
  let options = {};
  
  if(isProduction) {
    const privateKey = fs.readFileSync(
      resolve(__dirname, "../../server.key"),
      "utf8"
    );
    const certificate = fs.readFileSync(
      resolve(__dirname, "../../server.cert"),
      "utf8"
    );
    options = { httpsOptions: { key: privateKey, cert: certificate } };
  }

  const app = await NestFactory.create(AppModule, options);
  app.enableCors();
  app.setGlobalPrefix("api");
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: "same-site" } 
    })
  );

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(compression());

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