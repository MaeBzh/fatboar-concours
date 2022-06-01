import { Client } from "@/models/client.model";
import { clientResource } from "@/resources";

export default {
  async fetchAll({ commit }): Promise<Client[]> {
    const clients = await clientResource.getAll();
    commit("set", clients);
    return clients;
  },

  async fetchOne({ commit }, id: number): Promise<Client> {
    const client = await clientResource.getOne(id);
    commit("remove", client);
    commit("add", client);
    return client;
  },

  async create({ commit }, client: Client): Promise<Client> {
    const created = await clientResource.create(client);
    commit("add", created);
    return created;
  },

  async update({ commit }, client: Client): Promise<void> {
    await clientResource.update(client);
    commit("remove", client);
    commit("add", client);
  },

  async updateRgpdConsent({ commit }, client: Client): Promise<void> {
    await clientResource.updateRgpdConsent(client);
    commit("remove", client);
    commit("add", client);
  },

  async delete({ commit }, client: Client): Promise<void> {
    await clientResource.delete(client);
    commit("remove", client);
  },
};
