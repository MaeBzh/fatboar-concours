import { Model, User, Gift } from "@/models";

export type WinningTicket = Model & {
  number: number;
  withdrawnOn?: Date;
  assignedOn?: Date;
  amount: number;
  user?: User;
  gift: Gift;
};
