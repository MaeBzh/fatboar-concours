import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsPositive, IsString, MaxLength } from 'class-validator';
import { CreateGiftDto } from './create-gift.dto';

export class UpdateGiftDto extends PartialType(CreateGiftDto) {
    @ApiProperty()
    @IsNumber()
    id: string;
}
