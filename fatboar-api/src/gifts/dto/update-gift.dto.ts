import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { CreateGiftDto } from "./create-gift.dto";

export class UpdateGiftDto extends PartialType(CreateGiftDto) {
  @ApiProperty()
  @IsNumber()
  id: string;
}
