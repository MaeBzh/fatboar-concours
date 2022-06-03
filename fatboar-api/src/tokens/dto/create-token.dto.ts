import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";
import { User } from "../../users/entities/user.entity";
import { TokenType } from "./../../token-types/entities/token-type.entity";

export class CreateTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    default: false,
  })
  @IsBoolean()
  isRevoked: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  expiresIn: Date;

  @ApiProperty()
  @IsNotEmpty()
  tokenType: TokenType;

  @ApiProperty()
  @IsNotEmpty()
  user: User;
}
