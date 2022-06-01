import { ApiProperty } from "@nestjs/swagger";

export class RegisterSocialDto {

    @ApiProperty()
    firstname: string;

    @ApiProperty()
    lastname: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    birthYear?: number;

    @ApiProperty({
        default: new Date('1970-01-01')
    })
    rgpdConsent: Date;
}