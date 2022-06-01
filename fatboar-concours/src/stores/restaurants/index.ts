import restaurantActions from "./restaurant.actions";
import restaurantGetters from "./restaurant.getters";
import restaurantMutations from "./restaurant.mutations";
import restaurantState from "./restaurant.state";

export default {
  namespaced: true,
  state: restaurantState,
  getters: restaurantGetters,
  mutations: restaurantMutations,
  actions: restaurantActions,
};
