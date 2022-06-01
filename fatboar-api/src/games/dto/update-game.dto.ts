import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString, MaxLength, ValidateIf } from 'class-validator';
import { GameGift } from 'src/game-gift/entities/game-gift.entity';
import { Gift } from 'src/gifts/entities/gift.entity';
import { CreateGameDto } from './create-game.dto';

export class UpdateGameDto extends PartialType(CreateGameDto) {

    @ApiProperty()
    @IsString()
    @MaxLength(45)
    name: string;

    @ApiProperty()
    @IsDate()
    startsOn: Date;

    @ApiProperty()
    @IsDate()
    @ValidateIf(game => game.startsOn.getTime() < game.endsOn.getTime())
    endsOn: Date;

    @ApiProperty()
    @IsBoolean()
    activated: boolean;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    gameRules?: string;

    filename?: string;

    @ApiProperty()
    @IsDate()
    rulesValidation?: Date|null;

    @ApiProperty()
    @IsDate()
    @ValidateIf(game => game.jackpotDraw && game.endsOn.getTime() < game.jackpotDraw.getTime())
    jackpotDraw?: Date|null;

    @ApiProperty()
    gameGifts: Pick<GameGift, "gift" | "winPercentage">[];

    @ApiProperty()   
    jackpotGift: Gift;
}
