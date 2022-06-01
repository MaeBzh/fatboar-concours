import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateRestaurantDto } from './create-restaurant.dto';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
    
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    city: string;
}
