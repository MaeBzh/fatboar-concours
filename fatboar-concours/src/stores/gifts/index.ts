import giftActions from "./gift.actions";
import giftGetters from "./gift.getters";
import giftMutations from "./gift.mutations";
import giftState from "./gift.state";

export default {
  namespaced: true,
  state: giftState,
  getters: giftGetters,
  mutations: giftMutations,
  actions: giftActions,
};
