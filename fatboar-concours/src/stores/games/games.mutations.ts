import { Game } from "@/models/game.model";
import { GameState } from "./games.state";
export const types = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  REPLACE_ITEM: "REPLACE_ITEM",
};

export default {
  set(state: GameState, games: Game[]): void {
    state.games = games;
  },
  add(state: GameState, games: Game | Game[]): void {
    if (!Array.isArray(games)) games = [games];
    state.games.push(...games);
  },
  remove(state: GameState, game: Game): void {
    state.games = state.games.filter(({ id }) => id !== game.id);
  },
};
