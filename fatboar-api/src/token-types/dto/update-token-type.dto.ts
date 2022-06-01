import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator";
import { CreateTokenTypeDto } from './create-token-type.dto';

export class UpdateTokenTypeDto extends PartialType(CreateTokenTypeDto) {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty({
        message: 'The name is required'
    })
    name: string;
}
