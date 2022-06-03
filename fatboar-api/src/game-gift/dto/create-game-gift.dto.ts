import { Gift } from "../../gifts/entities/gift.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Game } from "../../games/entities/game.entity";

export class CreateGameGiftDto {
  @ApiProperty()
  @IsNotEmpty({
    message: "You must specify a game",
  })
  game: Partial<Game>;

  @ApiProperty()
  @IsNotEmpty({
    message: "You must specify a gift",
  })
  gift: Partial<Gift>;

  @ApiProperty()
  @IsNotEmpty({
    message: "You must specify a winning percentage",
  })
  winPercentage: number;
}
