import { Gift } from "../../gifts/entities/gift.entity";
import { Game } from "../../games/entities/game.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GameGiftDto {
  @ApiProperty()
  @IsNotEmpty({
    message: "You must specify a game",
  })
  game: Game;

  @ApiProperty()
  @IsNotEmpty({
    message: "You must specify a gift",
  })
  gift: Gift;

  @ApiProperty()
  @IsNotEmpty({
    message: "You must specify a winning percentage",
  })
  winPercentage: number;
}
