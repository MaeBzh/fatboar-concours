import { WinningTicket } from "@/models";
import { ApiResource } from "@/resources/api.resource";
import { AxiosInstance } from "axios";

export class WinningTicketResource extends ApiResource<WinningTicket> {
  constructor(http: AxiosInstance) {
    super(http, "winning-tickets");
  }

  async verifyTicket(number: number, amount: number): Promise<WinningTicket> {
    const { data } = await this.http.get(
      `${this.basePath}/verify-ticket/${number}/${amount}`
    );
    return data;
  }

  async getAllTicketsForConnectedUser(): Promise<WinningTicket[]> {
    const { data } = await this.http.get(`${this.basePath}/my-tickets`);
    return data;
  }

  async getAllTicketsForCurrentGame(gameId: number): Promise<WinningTicket[]> {
    const { data } = await this.http.get(
      `${this.basePath}/current-game/${gameId}`
    );
    return data;
  }

  async update({ id, user, assignedOn, amount }: WinningTicket): Promise<void> {
    await super.update({
      id,
      user,
      assignedOn,
      amount,
    } as WinningTicket);
  }

  async withdrawnTicket({ id }: WinningTicket): Promise<WinningTicket> {
    const { data } = await this.http.put(
      `${this.basePath}/withdrawnTicket/${id}`
    );

    return data;
  }
}
