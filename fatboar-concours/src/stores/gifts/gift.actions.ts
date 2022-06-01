import { Gift } from "@/models/gift.model";
import { giftResource } from "@/resources";

export default {
  async fetchAll({ commit }): Promise<Gift[]> {
    const gifts = await giftResource.getAll();
    commit("set", gifts);
    return gifts;
  },

  async fetchOne({ commit }, id: number): Promise<Gift> {
    const gift = await giftResource.getOne(id);
    commit("remove", gift);
    commit("add", gift);
    return gift;
  },

  async create({ commit }, gift: Gift & { photo: File }): Promise<Gift> {
    const created = await giftResource.create(gift);
    commit("add", created);
    return created;
  },

  async update({ commit }, gift: Gift & { photo: File }): Promise<void> {
    const updated = await giftResource.update(gift);
    commit("remove", gift);
    commit("add", updated);
  },

  async delete({ commit }, gift: Gift): Promise<void> {
    await giftResource.delete(gift);
    commit("remove", gift);
  },
};
