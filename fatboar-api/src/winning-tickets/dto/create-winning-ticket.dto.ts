import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";
import { Game } from "../../games/entities/game.entity";
import { Gift } from "../../gifts/entities/gift.entity";

export class CreateWinningTicketDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({
    message: "The number is required",
  })
  number: number;

  @ApiProperty()
  @IsNotEmpty({
    message: "The game for that ticket is required",
  })
  game: Game;

  @ApiProperty()
  @IsNotEmpty({
    message: "You must specify the gift associated with this ticket",
  })
  gift: Gift;
}
