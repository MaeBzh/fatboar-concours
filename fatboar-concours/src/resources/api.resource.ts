import { Model } from "@/models";
import { AxiosInstance } from "axios";

export abstract class ApiResource<T extends Model> {
  constructor(protected http: AxiosInstance, protected basePath: string) {}

  async getAll(): Promise<T[]> {
    const { data } = await this.http.get(this.basePath);
    return data;
  }

  async getOne(id: number): Promise<T> {
    const { data } = await this.http.get(`${this.basePath}/${id}`);
    return data;
  }

  async create(item: T): Promise<T> {
    const { data } = await this.http.post(this.basePath, item);
    return data;
  }

  async update(item: T): Promise<void> {
    await this.http.put(`${this.basePath}/${item.id}`, item);
  }

  async delete(item: T): Promise<void> {
    await this.http.delete(`${this.basePath}/${item.id}`);
  }
}
