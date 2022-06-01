import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNumber, IsPostalCode, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    
    @ApiProperty()
    @IsString()
    firstname: string;

    @ApiProperty()
    @IsString()
    lastname: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    phone?: string;

    @ApiProperty()
    @IsNumber()
    birthYear?: number;

    @ApiProperty({default: false})
    @IsBoolean()
    newsletter?: boolean;

    @ApiProperty({default: false})
    @IsBoolean()
    sms?: boolean;

    @ApiProperty()
    @IsPostalCode("FR")
    zipcode?: string;

    @ApiProperty()
    @IsString()
    accountToken?: string;
}


