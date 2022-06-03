import { Entity, OneToOne, PrimaryColumn } from "typeorm";
import { EmailingList } from "../../emailing-list/entities/emailing-list.entity";
import { User } from "../../users/entities/user.entity";

@Entity({ name: "emailingListUser" })
export class EmailingListUser {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  emailingListId: number;

  @OneToOne((type) => User)
  user: User;

  @OneToOne((type) => EmailingList)
  emailingList: EmailingList;
}
