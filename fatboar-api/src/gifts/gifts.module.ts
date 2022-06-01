import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Gift } from "./entities/gift.entity";
import { GiftsController } from "./gifts.controller";
import { GiftsService } from "./gifts.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Gift]),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  controllers: [GiftsController],
  providers: [GiftsService],
  exports: [GiftsService],
})
export class GiftsModule {}
