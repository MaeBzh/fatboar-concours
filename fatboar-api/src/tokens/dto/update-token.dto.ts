import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";
import { User } from "../../users/entities/user.entity";
import { CreateTokenDto } from "./create-token.dto";

export class UpdateTokenDto extends PartialType(CreateTokenDto) {
  @ApiProperty()
  @IsString()
  value?: string;

  @ApiProperty({
    default: false,
  })
  @IsBoolean()
  isRevoked?: boolean;

  @ApiProperty()
  user?: User;
}
