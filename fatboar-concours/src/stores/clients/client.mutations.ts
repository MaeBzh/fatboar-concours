import { Client } from "@/models/client.model";
import { ClientState } from "./client.state";

export default {
  set(state: ClientState, clients: Client[]): void {
    state.clients = clients;
  },
  add(state: ClientState, clients: Client | Client[]): void {
    if (!Array.isArray(clients)) clients = [clients];
    state.clients.push(...clients);
  },
  remove(state: ClientState, { id }: Client): void {
    state.clients = state.clients.filter((client) => id !== client.id);
  },
};
