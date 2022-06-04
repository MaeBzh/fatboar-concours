import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNumber, IsString, MaxLength } from "class-validator";
import { CreateCashRegisterDto } from "./create-cash-register.dto";

export class UpdateCashRegisterDto extends PartialType(CreateCashRegisterDto) {
  @ApiProperty()
  @IsString()
  @MaxLength(15)
  serial?: string;

  @ApiProperty()
  @IsString()
  token?: string;

  @ApiProperty({
    name: "restaurantId",
  })
  @IsNumber()
  restaurantId?: number;
}
