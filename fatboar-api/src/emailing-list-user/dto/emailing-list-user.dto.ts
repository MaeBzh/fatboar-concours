import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class EmailingListUserDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({
        message: 'You must specify a user'
    })
    userId: number;  
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({
        message: 'You must specify an emailing list'
    })
    emailingListId: number;
}
