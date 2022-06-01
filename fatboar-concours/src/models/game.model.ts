import { Model, GameGift, Gift } from "@/models";

export type Game = Model & {
  name: string;
  description: string;
  startsOn: Date;
  endsOn: Date;
  activated: boolean;
  gameRules: string;
  filename: string;
  jackpotDraw: number;
  rulesValidation: number;
  tickets: number;
  gameGifts?: GameGift[];
  jackpotGift?: Gift;
};
