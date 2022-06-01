import { EmailingList } from "@/models/emailing-list.model";
import { Department } from "@/types/department";

export interface EmailingListState {
  emailingLists: Array<EmailingList>;
  departments: Array<Department>;
}

export default {
  emailingLists: [],
  departments: [],
} as EmailingListState;
