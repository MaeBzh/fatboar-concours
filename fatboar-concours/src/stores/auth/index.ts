import authActions from "./auth.actions";
import authGetters from "./auth.getters";
import authMutations from "./auth.mutations";
import authState from "./auth.state";

export default {
  namespaced: true,
  state: authState,
  getters: authGetters,
  mutations: authMutations,
  actions: authActions,
};
