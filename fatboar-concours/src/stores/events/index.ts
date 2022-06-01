import gameMutations from "./events.mutations";
import gameGetters from "./events.getters";
import gameState from "./events.state";

export default {
  namespaced: true,
  state: gameState,
  getters: gameGetters,
  mutations: gameMutations,
};
