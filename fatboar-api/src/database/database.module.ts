import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import ORMConfig from "../ormconfig";

@Module({
  imports: [TypeOrmModule.forRoot(ORMConfig)],
})
export class DatabaseModule {}
