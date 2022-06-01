import Faker from "faker";
import { define } from "typeorm-seeding";
import { GameGift } from '../../game-gift/entities/game-gift.entity';

define(GameGift, (faker: typeof Faker, {game, gift}) => {

 
  faker.locale = 'fr';

  const gameGift = new GameGift();
  gameGift.game = game;
  gameGift.gift = gift;  
  gift.winPercentage = faker.helpers.randomize([10, 20, 30, 40, 70]);  
  return   gameGift;
});
