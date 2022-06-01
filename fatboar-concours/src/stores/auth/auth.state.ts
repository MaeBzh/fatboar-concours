import { Client, User } from "@/models";

export interface AuthState {
  authUser?: User | Client;
}

export default {
  authUser: undefined,
} as AuthState;
