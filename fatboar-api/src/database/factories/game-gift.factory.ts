import Faker from "faker";
import { define } from "typeorm-seeding";
import { GameGift } from "../../game-gift/entities/game-gift.entity";

define(GameGift, (faker: typeof Faker, context: any) => {
  faker.locale = "fr";

  const gameGift = new GameGift();
  gameGift.game = context.game;
  gameGift.gift = context.gift;
  gameGift.winPercentage = context.winPercentage;
  return gameGift;
});
