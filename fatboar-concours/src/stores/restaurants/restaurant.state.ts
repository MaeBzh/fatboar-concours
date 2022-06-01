import { Restaurant } from "@/models/restaurant.model";
export interface RestaurantState {
  restaurants: Restaurant[];
}

export default {
  restaurants: [],
} as RestaurantState;
