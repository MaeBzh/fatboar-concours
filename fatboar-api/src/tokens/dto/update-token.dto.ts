import { TokenType } from './../../token-types/entities/token-type.entity';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { CreateTokenDto } from './create-token.dto';
import { User } from '../../users/entities/user.entity';

export class UpdateTokenDto extends PartialType(CreateTokenDto) {
    
    @ApiProperty()
    @IsString()
    value?: string;

    @ApiProperty({
        default: false
    })
    @IsBoolean()
    isRevoked?: boolean;
    
    @ApiProperty()
    user?: User;
}
