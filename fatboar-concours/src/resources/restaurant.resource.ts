import { Restaurant } from "@/models";
import { ApiResource } from "@/resources/api.resource";
import { AxiosInstance } from "axios";

export class RestaurantResource extends ApiResource<Restaurant> {
  constructor(http: AxiosInstance) {
    super(http, "restaurants");
  }
}
