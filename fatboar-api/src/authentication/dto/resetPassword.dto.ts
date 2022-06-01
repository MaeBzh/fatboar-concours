import { ApiProperty } from "@nestjs/swagger";

export class SendResetPasswordDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    resetPasswordUrl: string;
}

export class ResetPasswordDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    accountToken?: string;

    @ApiProperty()
    password?: string;
}