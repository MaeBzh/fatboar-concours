import { Gift } from "@/models";
import { ApiResource } from "@/resources/api.resource";
import { AxiosInstance } from "axios";

export class GiftResource extends ApiResource<Gift> {
  constructor(http: AxiosInstance) {
    super(http, "gifts");
  }

  async create(item: Gift & { photo: File }): Promise<Gift> {
    const formData = new FormData();
    Object.keys(item).forEach((key) => formData.append(key, item[key]));
    const { data } = await this.http.post(this.basePath, formData);
    return data;
  }

  async update(item: Gift & { photo: File }): Promise<void> {
    const formData = new FormData();
    Object.keys(item).forEach((key) => formData.append(key, item[key]));
    await this.http.put(`${this.basePath}/${item.id}`, formData);
  }
}
