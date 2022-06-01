import ticketsActions from "./tickets.actions";
import ticketState from "./ticket.state";
import ticketGetters from "./ticket.getters";
import ticketMutations from "./ticket.mutations";

export default {
  namespaced: true,
  state: ticketState,
  getters: ticketGetters,
  mutations: ticketMutations,
  actions: ticketsActions,
};
