import clientActions from "./client.actions";
import clientGetters from "./client.getters";
import clientMutations from "./client.mutations";
import clientState from "./client.state";

export default {
  namespaced: true,
  state: clientState,
  getters: clientGetters,
  mutations: clientMutations,
  actions: clientActions,
};
