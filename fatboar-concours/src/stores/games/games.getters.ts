import { Game } from "@/models/game.model";

export default {
  getAll: (state): Array<Game> => state.games,
  getOne: (state) => (gameId) => {
    return state.games.find(({ id }) => id === gameId);
  },
  getCurrentGame: (state) => {
    const result = state.games.find((game) => game.activated === true);
    return result;
  },
};
