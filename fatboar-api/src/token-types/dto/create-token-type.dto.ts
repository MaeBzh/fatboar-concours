import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTokenTypeDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty({
        message: 'The name is required'
    })
    name: string;
}
