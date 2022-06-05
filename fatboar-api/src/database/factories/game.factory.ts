import Faker from "faker";
import { copyFileSync } from "fs";
import { resolve } from "path";
import { define } from "typeorm-seeding";
import { v4 as uuid } from "uuid";
import { Game } from "../../games/entities/game.entity";
import { Gift } from "../../gifts/entities/gift.entity";

define(Game, (faker: typeof Faker, context: any) => {
  const jackpotGift: Gift = context.jackpotGift as Gift;

  const filename = "reglement-jeu-concours.pdf";
  const gameRules = `${uuid()}.pdf`;

  copyFileSync(
    resolve(__dirname, `images/${filename}`),
    resolve(__dirname, `../../../uploads/${gameRules}`)
  );

  const game = new Game();
  game.name = context.name;
  game.description = context.description;
  game.gameRules = gameRules;
  game.filename = filename;
  game.jackpotGift = jackpotGift;

  game.startsOn = context.startsOn;
  game.endsOn = context.endsOn;
  game.activated = true;
  game.jackpotDraw = null;

  return game;
});
