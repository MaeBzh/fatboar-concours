import { GiftsModule } from './../gifts/gifts.module';
import { GamesModule } from './../games/games.module';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameGift } from "./entities/game-gift.entity";
import { GameGiftService } from "./game-gift.service";

@Module({
  imports: [TypeOrmModule.forFeature([GameGift])],
  providers: [GameGiftService],
  exports: [GameGiftService],
})
export class GameGiftModule {}
