import { WinningTicket } from "@/models";
import { TicketState } from "./ticket.state";

export default {
  getAll: (state: TicketState): WinningTicket[] => state.tickets,

  getOne: (state: TicketState) => (id: number) =>
    state.tickets.find((ticket) => ticket.id === id),
};
