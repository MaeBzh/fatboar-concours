import { WinningTicket } from "@/models";
import { winningTicketResource } from "@/resources";

export default {
  async verifyTicket(
    { commit },
    ticket: WinningTicket
  ): Promise<WinningTicket> {
    const winningTicket = await winningTicketResource.verifyTicket(
      ticket.number,
      ticket.amount
    );
    return winningTicket;
  },

  async update({ commit }, ticket: WinningTicket): Promise<void> {
    const updated = await winningTicketResource.update(ticket);
    commit("remove", ticket);
    commit("add", updated);
  },

  async updateUser({ commit }, ticket: WinningTicket): Promise<void> {
    const updated = await winningTicketResource.updateUser(ticket);
    commit("remove", ticket);
    commit("add", updated);
  },

  async fetchAllTicketsForConnectedUser({ commit }): Promise<void> {
    const tickets = await winningTicketResource.getAllTicketsForConnectedUser();
    commit("set", tickets);
  },

  async fetchAllTicketsForCurrentGame(
    { commit },
    gameId: number
  ): Promise<void> {
    const tickets = await winningTicketResource.getAllTicketsForCurrentGame(
      gameId
    );
    commit("set", tickets);
  },
};
