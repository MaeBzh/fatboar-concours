import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

const ORMConfig: TypeOrmModuleOptions = {
  type: "mysql",
  synchronize: false,
  logging: true,
  entities: [
    join(__dirname, "**/*.entity.js"),
    join(__dirname, "**/*.entity.ts"),
  ],
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PSWD,
  migrations: [
    join(__dirname, "database/migrations/**/*.js"),
    join(__dirname, "database/migrations/**/*.ts"),
  ],
  migrationsTableName: "migrations",
  cli: {
    migrationsDir: join(__dirname, "database/migrations"),
  },
};

export default ORMConfig;
