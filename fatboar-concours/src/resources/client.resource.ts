import { Client } from "@/models/client.model";
import { ApiResource } from "@/resources/api.resource";
import { AxiosInstance } from "axios";

export class ClientResource extends ApiResource<Client> {
  constructor(http: AxiosInstance) {
    super(http, "users/clients");
  }

  async create(item: Client) {
    const { data } = await this.http.post(`authentication/register`, item);
    return data;
  }

  async update({
    role,
    winningTickets,
    rgpdConsent,
    ...item
  }: Client): Promise<void> {
    console.log("update", { item });
    await super.update(item as Client);
  }

  async updateRgpdConsent(item: Client) {
    await this.http.put(`${this.basePath}/${item.id}/rgpd-consent`);
  }
}
