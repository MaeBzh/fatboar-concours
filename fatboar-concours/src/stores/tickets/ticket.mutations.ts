import { WinningTicket } from "@/models";
import { TicketState } from "./ticket.state";

export default {
  add(state: TicketState, tickets: WinningTicket | WinningTicket[]): void {
    if (!Array.isArray(tickets)) tickets = [tickets];
    state.tickets.push(...tickets);
  },
  set(state: TicketState, tickets: WinningTicket | WinningTicket[]): void {
    if (!Array.isArray(tickets)) tickets = [tickets];
    state.tickets = tickets;
  },
  remove(state: TicketState, ticket: WinningTicket): void {
    state.tickets = state.tickets.filter(({ id }) => id !== ticket.id);
  },
};
