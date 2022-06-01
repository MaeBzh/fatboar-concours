import { Model } from "@/models";
import { Game } from "./game.model";

export type Gift = Model & {
  name: string;
  photo: string;
  icon: string;
  filename: string;
  isJackpot: boolean;
};

export type GameGift = {
  game?: Game;
  gift: Gift;
  winPercentage: number;
};
