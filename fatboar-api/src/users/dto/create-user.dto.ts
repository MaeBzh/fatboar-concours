import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPostalCode,
  IsString,
  MaxLength,
  MinDate,
  MinLength,
} from "class-validator";
import { Role } from "src/roles/entities/role.entity";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({
    message: "The firstname is required",
  })
  firstname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({
    message: "The lastname is required",
  })
  lastname: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({
    message: "The email is required",
  })
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsNumber()
  @MaxLength(4)
  @IsNotEmpty({
    message: "You must specify your birth year",
  })
  birthYear?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({
    message: "Password is required",
  })
  @MinLength(8, {
    message: "The password is too short",
  })
  @Exclude()
  password: string;

  @ApiProperty()
  @IsBoolean()
  newsletter?: boolean;

  @ApiProperty()
  @IsBoolean()
  sms?: boolean;

  @ApiProperty()
  @IsPostalCode("FR")
  @IsNotEmpty({
    message: "You must specify your postal code",
  })
  zipcode?: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty({
    message: "To participate in the game, GDPR consent must be given",
  })
  @MinDate(new Date())
  rgpdConsent?: Date;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  accountToken?: string;

  @ApiProperty({
    default: true,
  })
  isActive?: boolean;
}
