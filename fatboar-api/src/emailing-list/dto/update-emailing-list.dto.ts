import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsJSON, IsString } from 'class-validator';
import { CreateEmailingListDto } from './create-emailing-list.dto';

export class UpdateEmailingListDto extends PartialType(CreateEmailingListDto) {
   
    @ApiProperty()
    @IsString()
    name: string;    

    @ApiProperty()
    @IsArray()
    usersId: number[];

    @ApiProperty()
    @IsJSON()
    filters: string;
}
