import { resolve } from 'path';
import Faker from "faker";
import {v4 as uuid} from 'uuid';
import { define } from "typeorm-seeding";
import { Gift } from "../../gifts/entities/gift.entity";
import { copyFileSync } from "fs";

define(Gift, (faker: typeof Faker, context: any) => {
    const filename = context.filename;
    const photo = `${uuid()}.png`;

    copyFileSync( resolve(__dirname, `images/${filename}`) , resolve(__dirname, `../../../uploads/${photo}`));

    const gift = new Gift();
    gift.name = context.name;
    gift.photo = photo;
    gift.filename = filename;
    gift.icon = context.icon;
    gift.isJackpot = context.isJackpot;
    return gift;
  
});
