import { Client } from "@/models/client.model";
import { ClientState } from "./client.state";

export default {
  getAll: (state: ClientState): Array<Client> => state.clients,
  getOne: (state: ClientState) => (id: number) =>
    state.clients.find((client) => id === client.id),
};
