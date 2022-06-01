import { Model } from "@/models";

export type Restaurant = Model & {
  name: string;
  city: string;
};
