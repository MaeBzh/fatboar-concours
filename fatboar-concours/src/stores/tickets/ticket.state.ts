import { WinningTicket } from "../../models";

export interface TicketState {
  tickets: WinningTicket[];
}

export default {
  tickets: [],
} as TicketState;
