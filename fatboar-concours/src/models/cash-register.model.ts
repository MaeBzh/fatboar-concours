import { Model, Restaurant } from "@/models";

export type CashRegister = Model & {
  serial: string;
  token: string;
  restaurantId: number;
};
