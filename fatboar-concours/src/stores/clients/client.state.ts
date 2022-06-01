import { Client } from "@/models/client.model";

export interface ClientState {
  clients: Array<Client>;
}

export default {
  clients: [],
} as ClientState;
