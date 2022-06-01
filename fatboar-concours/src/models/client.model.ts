import { User, WinningTicket, Role } from "@/models";

export type Client = User & {
  phone: string;
  birthYear: number;
  newsletter: boolean;
  sms: boolean;
  zipcode: string;
  winningTickets: WinningTicket[];
  rgpdConsent: Date;
  role?: Role;
};
