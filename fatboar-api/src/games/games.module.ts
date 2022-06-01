import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WinningTicketsModule } from "src/winning-tickets/winning-tickets.module";
import { GameGiftModule } from "./../game-gift/game-gift.module";
import { GiftsModule } from "./../gifts/gifts.module";
import { Game } from "./entities/game.entity";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    GameGiftModule,
    GiftsModule,
    WinningTicketsModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}
