import { Game } from "@/models/game.model";
export interface GameState {
  games: Array<Game>;
}

export default {
  games: [],
} as GameState;
