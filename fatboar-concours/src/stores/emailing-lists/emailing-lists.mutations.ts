import { Department } from "./../../types/department";
import { EmailingList } from "@/models/emailing-list.model";
import { EmailingListState } from "./emailing-lists.state";

export default {
  set(state: EmailingListState, emailingLists: EmailingList[]): void {
    state.emailingLists = emailingLists;
  },
  add(
    state: EmailingListState,
    emailingLists: EmailingList | EmailingList[]
  ): void {
    if (!Array.isArray(emailingLists)) emailingLists = [emailingLists];
    state.emailingLists.push(...emailingLists);
  },
  remove(state: EmailingListState, { id }: EmailingList): void {
    state.emailingLists = state.emailingLists.filter(
      (emailingList) => emailingList.id !== id
    );
  },
  setDepartments(state: EmailingListState, departments: Department[]): void {
    state.departments = departments;
  },
};
