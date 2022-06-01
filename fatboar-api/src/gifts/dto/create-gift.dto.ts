import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateGiftDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({
    message: "You must specify a name for this gift",
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "The photo is required ",
  })
  photo: string;

  filename: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({
    message: "The icon is required ",
  })
  icon: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty({
    message: "You must specify is this gift is a jackpot gift ",
  })
  isJackpot: boolean;
}
