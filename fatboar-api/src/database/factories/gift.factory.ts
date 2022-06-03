import Faker from "faker";
import { copyFileSync } from "fs";
import { resolve } from "path";
import { define } from "typeorm-seeding";
import { v4 as uuid } from "uuid";
import { Gift } from "../../gifts/entities/gift.entity";

define(Gift, (faker: typeof Faker, context: any) => {
  const filename = context.filename;
  const photo = `${uuid()}.png`;

  copyFileSync(
    resolve(__dirname, `images/${filename}`),
    resolve(__dirname, `../../../uploads/${photo}`)
  );

  const gift = new Gift();
  gift.name = context.name;
  gift.photo = photo;
  gift.filename = filename;
  gift.icon = context.icon;
  gift.isJackpot = context.isJackpot;
  return gift;
});
