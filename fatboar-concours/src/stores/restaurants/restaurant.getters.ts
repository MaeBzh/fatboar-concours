import { Restaurant } from "@/models/restaurant.model";
import { RestaurantState } from "./restaurant.state";

export default {
  getAll: (state: RestaurantState): Restaurant[] => state.restaurants,
  getOne: (state: RestaurantState) => (id: number) =>
    state.restaurants.find((restaurant) => restaurant.id === id),
};
