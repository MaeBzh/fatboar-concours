import { EmailingList } from "@/models";
import { ApiResource } from "@/resources/api.resource";
import { Department } from "@/types/department";
import { AxiosInstance } from "axios";

export class EmailingListResource extends ApiResource<EmailingList> {
  constructor(http: AxiosInstance) {
    super(http, "emailing-lists");
  }

  async getDepartments(): Promise<Department[]> {
    try {
      const { data } = await this.http.get(
        "https://geo.api.gouv.fr/departements"
      );
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
