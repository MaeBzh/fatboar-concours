import { Client, User } from "@/models";

export type AuthUser = {
  user: User | Client;
  accessToken: { value: string };
  refreshToken: { value: string };
};
