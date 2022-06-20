import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  ValidateIf,
} from "class-validator";
import { GameGift } from "../../game-gift/entities/game-gift.entity";

export class CreateGameDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({
    message: "You must specify a name",
  })
  @MaxLength(45)
  name: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty({
    message: "You must specify a date for the beggining of the game",
  })
  startsOn: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty({
    message: "You must specify a date for the end of the game",
  })
  @ValidateIf((game) => game.startsOn.getTime() > game.endsOn.getTime())
  endsOn: Date;

  @ApiProperty()
  @IsBoolean()
  activated: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({
    message: "You must describe the game",
  })
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({
    message: "You must specify the rules file for your game",
  })
  gameRules: string;

  filename: string;

  // @ApiProperty()
  // @IsDate()
  // @IsNotEmpty({
  //   message: "You must specify the date of the jackpot draw",
  // })
  // @ValidateIf((game) => game.endsOn.getTime() > game.jackpotDraw.getTime())
  // jackpotDraw: Date;

  @ApiProperty()
  @IsDate()
  rulesValidation?: Date;

  @ApiProperty()
  @IsNumber()
  tickets: number;

  @ApiProperty()
  @IsNotEmpty({
    message: "You must select a list of gifts for this game",
  })
  gameGifts: Pick<GameGift, "gift" | "winPercentage">[];

  @ApiProperty()
  @IsNotEmpty({
    message: "You must select a jackpot gift for this game",
  })
  jackpotGiftId: number;
}
