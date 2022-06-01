import { Model } from "@/models";
import { Role } from "./role.model";

export type User = Model & {
  firstname: string;
  lastname: string;
  email: string;
  role: Role;
};
