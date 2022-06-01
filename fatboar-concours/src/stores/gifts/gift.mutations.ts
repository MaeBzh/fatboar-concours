import { Gift } from "@/models/gift.model";
import { GiftState } from "./gift.state";

export default {
  set(state: GiftState, gifts: Gift[]): void {
    state.gifts = gifts;
  },
  add(state: GiftState, gifts: Gift | Gift[]): void {
    if (!Array.isArray(gifts)) gifts = [gifts];
    state.gifts.push(...gifts);
  },
  remove(state: GiftState, gift: Gift): void {
    state.gifts = state.gifts.filter(({ id }) => id !== gift.id);
  },
};
