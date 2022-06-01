import gameMutations from "./games.mutations";
import gameGetters from "./games.getters";
import gameState from "./games.state";
import gameActions from "./games.actions";

export default {
  namespaced: true,
  state: gameState,
  getters: gameGetters,
  mutations: gameMutations,
  actions: gameActions,
};
