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

  /**
   * File must be send with multipart/formdata
   *
   * @param item
   * @returns
   */
  async create(item: Game & { gameGifts: Partial<GameGift>[] }): Promise<Game> {
    const form = new FormData();
    Object.keys(item).forEach((key) => {
      const value =
        Array.isArray(item[key]) ||
        Object.prototype.toString.call(item[key]) === "[object Object]"
          ? JSON.stringify(item[key])
          : item[key];
      form.append(key, value);
    });
    const { data } = await this.http.post(this.basePath, form);
    return data;
  }

  /**
   * File must be send with multipart/formdata
   *
   * @param item
   * @returns
   */
  async update(item: Game & { gameGifts: Partial<GameGift>[] }): Promise<void> {
    const form = new FormData();
    Object.keys(item).forEach((key) => {
      const value =
        Array.isArray(item[key]) ||
        Object.prototype.toString.call(item[key]) === "[object Object]"
          ? JSON.stringify(item[key])
          : item[key];

      form.append(key, value);
    });
    await this.http.put(`${this.basePath}/${item.id}`, form);
  }
}
