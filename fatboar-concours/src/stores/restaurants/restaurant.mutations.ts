import { Restaurant } from "@/models/restaurant.model";
import { RestaurantState } from "./restaurant.state";

export default {
  set(state: RestaurantState, restaurants: Restaurant[]): void {
    state.restaurants = restaurants;
  },
  add(state: RestaurantState, restaurants: Restaurant | Restaurant[]): void {
    if (!Array.isArray(restaurants)) restaurants = [restaurants];
    state.restaurants.push(...restaurants);
  },
  remove(state: RestaurantState, restaurant: Restaurant): void {
    state.restaurants = state.restaurants.filter(
      ({ id }) => id !== restaurant.id
    );
  },
};
