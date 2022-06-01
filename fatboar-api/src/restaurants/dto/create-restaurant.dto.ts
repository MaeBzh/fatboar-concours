import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRestaurantDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty({
        message: 'You must specify a name'
    })
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({
        message: 'You must specify a city'
    })
    city: string;
}
