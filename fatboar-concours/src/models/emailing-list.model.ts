import { Client, Model } from "@/models";

export type EmailingList = Model & {
  name: string;
  users: Client[];
  filters: string;
};
