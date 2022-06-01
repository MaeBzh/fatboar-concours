import { CreateEmployeeDto } from "./create-employee.dto";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
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
}
