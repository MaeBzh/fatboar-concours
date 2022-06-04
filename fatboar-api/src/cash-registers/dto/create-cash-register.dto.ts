import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateCashRegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({
    message: "The serial is required",
  })
  @MaxLength(15)
  serial: string;

  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty({
    name: "restaurantId",
  })
  @IsNumber()
  @IsNotEmpty({
    message: "You must choose a restaurant",
  })
  restaurantId: number;
}
