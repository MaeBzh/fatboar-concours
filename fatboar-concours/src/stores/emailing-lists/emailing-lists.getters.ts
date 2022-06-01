import { EmailingList } from "@/models/emailing-list.model";
import { Department } from "@/types/department";
import { EmailingListState } from "./emailing-lists.state";

export default {
  getAll: (state: EmailingListState): EmailingList[] => state.emailingLists,
  getOne: (state: EmailingListState) => (id: number) =>
    state.emailingLists.find((emailingList) => emailingList.id === id),
  getDepartments: (state: EmailingListState): Department[] => state.departments,
  getClientsOfTheList: (state: EmailingListState) => (id: number) => {
    const list = state.emailingLists.find(
      (emailingList) => emailingList.id === id
    );
    return list?.users.map((user) => `${user.firstname} ${user.lastname}`);
  },
};
