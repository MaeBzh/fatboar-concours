import { EmailingList } from "@/models/emailing-list.model";
import { emailingListResource } from "@/resources";

export default {
  async fetchAll({ commit }): Promise<EmailingList[]> {
    const emailingLists = await emailingListResource.getAll();
    commit("set", emailingLists);
    return emailingLists;
  },
  async fetchOne({ commit }, id: number): Promise<EmailingList> {
    const emailingList = await emailingListResource.getOne(id);
    commit("remove", emailingList);
    commit("add", emailingList);
    return emailingList;
  },
  async create({ commit }, emailingList: EmailingList): Promise<EmailingList> {
    const created = await emailingListResource.create(emailingList);
    commit("add", created);
    return created;
  },
  async update({ commit }, emailingList: EmailingList): Promise<void> {
    const updated = await emailingListResource.update(emailingList);
    commit("remove", emailingList);
    commit("add", updated);
  },
  async delete({ commit }, emailingList: EmailingList): Promise<void> {
    await emailingListResource.delete(emailingList);
    commit("remove", emailingList);
  },

  async fetchDepartments({ commit }): Promise<void> {
    const departments = await emailingListResource.getDepartments();
    commit("setDepartments", departments);
  },
};
