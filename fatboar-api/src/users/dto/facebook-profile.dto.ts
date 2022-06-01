import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class FacebookProfileDto {  

    @ApiProperty()
    @IsString()
    @IsNotEmpty({
        message: 'The firstname is required'
    })
    firstname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({
        message: 'The lastname is required'
    })
    lastname: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty({
        message: 'The email is required'
    })
    email: string;
}