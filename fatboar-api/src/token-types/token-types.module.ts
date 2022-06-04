import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenType } from "./entities/token-type.entity";
import { TokenTypesController } from "./token-types.controller";
import { TokenTypesService } from "./token-types.service";

@Module({
  imports: [TypeOrmModule.forFeature([TokenType])],
  controllers: [TokenTypesController],
  providers: [TokenTypesService],
  exports: [TokenTypesService],
})
export class TokenTypesModule {}
