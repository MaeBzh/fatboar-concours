import { Gift } from "@/models/gift.model";

export interface GiftState {
  gifts: Gift[];
}

export default {
  gifts: [],
} as GiftState;
