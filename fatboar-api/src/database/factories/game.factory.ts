import Faker from "faker";
import { Gift } from "../../gifts/entities/gift.entity";
import { define } from "typeorm-seeding";
import { v4 as uuid } from "uuid";
import { Game } from "../../games/entities/game.entity";

define(Game, (faker: typeof Faker, context: any) => {

  const jackpotGift: Gift = context.jackpotGift as Gift;

  faker.locale = "fr";

  const game = new Game();
  game.name = faker.commerce.productName();
  game.description = faker.lorem.paragraph();
  game.gameRules = `${uuid()}.png`;
  game.filename = `${faker.lorem.word()}.png`;
  game.jackpotGift = jackpotGift;
  if (context.activated) {
    game.startsOn = faker.date.past();
    game.endsOn = faker.date.future();
    game.activated = true;
    game.jackpotDraw = faker.date.future();
  } else {
    game.startsOn = faker.date.past();
    game.endsOn = faker.date.past();
    game.activated = false;
    game.jackpotDraw = faker.date.past();
  }
  return game;
});
