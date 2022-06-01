import cashRegisterActions from "./cash-registers.actions";
import cashRegisterGetters from "./cash-registers.getters";
import cashRegisterMutations from "./cash-registers.mutations";
import cashRegisterState from "./cash-registers.state";

export default {
  namespaced: true,
  state: cashRegisterState,
  getters: cashRegisterGetters,
  mutations: cashRegisterMutations,
  actions: cashRegisterActions,
};
