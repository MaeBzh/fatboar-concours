import emailingListActions from "./emailing-list.actions";
import emailingListGetters from "./emailing-lists.getters";
import emailingListMutations from "./emailing-lists.mutations";
import emailingListState from "./emailing-lists.state";

export default {
  namespaced: true,
  state: emailingListState,
  getters: emailingListGetters,
  mutations: emailingListMutations,
  actions: emailingListActions,
};
