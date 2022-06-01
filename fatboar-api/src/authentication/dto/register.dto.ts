import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {

    @ApiProperty()
    firstname: string;

    @ApiProperty()
    lastname: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    birthYear: number;

    @ApiProperty()
    password: string;

    @ApiProperty()
    newsletter: boolean;

    @ApiProperty()
    sms: boolean;

    @ApiProperty()
    zipcode: string;

    @ApiProperty()
    rgpdConsent: Date;

    @ApiProperty()
    activateUrl: string;

}