import { Gift } from "@/models/gift.model";
import { GiftState } from "./gift.state";

export default {
  getAll: (state: GiftState): Gift[] => state.gifts,

  getAllBasicGifts: (state: GiftState): Gift[] =>
    state.gifts.filter(({ isJackpot }) => !isJackpot),

  getAllJackpotGifts: (state: GiftState): Gift[] =>
    state.gifts.filter(({ isJackpot }) => isJackpot),

  getOne: (state: GiftState) => (id: number) =>
    state.gifts.find((gift) => id === gift.id),
};
