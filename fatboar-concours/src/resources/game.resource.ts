import { Game, GameGift } from "@/models";
import { ApiResource } from "@/resources/api.resource";
import { AxiosInstance } from "axios";
import FormData from "form-data";

export class GameResource extends ApiResource<Game> {
  constructor(http: AxiosInstance) {
    super(http, "games");
  }

  /**
   *
   * @returns
   */
  async getCurrentGame(): Promise<Game> {
    const { data } = await this.http.get(`${this.basePath}/currentGame`);
    return data;
  }

  async getGameStats(item: Game): Promise<{
    used: number;
    unused: number;
    unassigned: number;
  }> {
    const { data } = await this.http.get(`${this.basePath}/${item.id}/stats`);
    return data;
  }

  protected formatMultipartFormData(
    item: Game & { gameGifts: Partial<GameGift>[] }
  ) {
    item.gameGifts = item.gameGifts.filter((gg) => gg.winPercentage > 0);
    const form = new FormData();
    Object.keys(item).forEach((key) => {
      const value =
        Array.isArray(item[key]) ||
        Object.prototype.toString.call(item[key]) === "[object Object]"
          ? JSON.stringify(item[key])
          : item[key];
      form.append(key, value);
    });

    return form;
  }

  /**
   * File must be send with multipart/formdata
   *
   * @param item
   * @returns
   */
  async create(item: Game & { gameGifts: Partial<GameGift>[] }): Promise<Game> {
    const { data } = await this.http.post(
      this.basePath,
      this.formatMultipartFormData(item)
    );
    return data;
  }

  /**
   * File must be send with multipart/formdata
   *
   * @param item
   * @returns
   */
  async update(item: Game & { gameGifts: Partial<GameGift>[] }): Promise<void> {
    await this.http.put(
      `${this.basePath}/${item.id}`,
      this.formatMultipartFormData(item)
    );
  }
}
