import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayNotEmpty,
  IsArray,
  IsJSON,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class CreateEmailingListDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({
    message: "The name is required",
  })
  name: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty({
    message: "You must add at least one user",
  })
  userIds: number[];

  @ApiProperty()
  @IsJSON()
  filters: string;
}
