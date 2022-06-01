import { Game, GameGift } from "@/models";
import { gameResource } from "@/resources";

export default {
  async fetchAll({ commit }): Promise<Game[]> {
    const games = await gameResource.getAll();
    commit("set", games);
    return games;
  },

  async fetchOne({ commit }, id: number): Promise<Game> {
    const game = await gameResource.getOne(id);
    commit("remove", game);
    commit("add", game);
    return game;
  },

  async fetchCurrentGame({ commit }): Promise<Game> {
    const currentGame = await gameResource.getCurrentGame();
    commit("remove", currentGame);
    commit("add", currentGame);
    return currentGame;
  },

  async create(
    { commit },
    game: Game & { gameGifts: Partial<GameGift>[] }
  ): Promise<Game> {
    const created = await gameResource.create(game);
    commit("add", created);
    return created;
  },

  async update(
    { commit },
    game: Game & { gameGifts: Partial<GameGift>[] }
  ): Promise<void> {
    const updated = await gameResource.update(game);
    commit("remove", game);
    commit("add", updated);
  },

  async delete({ commit }, game: Game): Promise<void> {
    await gameResource.delete(game);
    commit("remove", game);
  },
};
