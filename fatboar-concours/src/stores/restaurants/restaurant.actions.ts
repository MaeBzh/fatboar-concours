import { Restaurant } from "@/models/restaurant.model";
import { restaurantResource } from "@/resources";

export default {
  async fetchAll({ commit }): Promise<Restaurant[]> {
    const restaurants = await restaurantResource.getAll();
    commit("set", restaurants);
    return restaurants;
  },
  async fetchOne({ commit }, id: number): Promise<Restaurant> {
    const restaurant = await restaurantResource.getOne(id);
    commit("remove", restaurant);
    commit("add", restaurant);
    return restaurant;
  },
  async create({ commit }, restaurant: Restaurant): Promise<Restaurant> {
    const created = await restaurantResource.create(restaurant);
    commit("add", created);
    return created;
  },
  async update({ commit }, restaurant: Restaurant): Promise<void> {
    const updated = await restaurantResource.update(restaurant);
    commit("remove", restaurant);
    commit("add", updated);
  },
  async delete({ commit }, restaurant: Restaurant): Promise<void> {
    await restaurantResource.delete(restaurant);
    commit("remove", restaurant);
  },
};
