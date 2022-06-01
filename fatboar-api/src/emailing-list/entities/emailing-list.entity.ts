import { User } from "../../users/entities/user.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "emailingLists" })
export class EmailingList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.emailingLists)
  @JoinTable({
    name: "emailingListUser",
    joinColumn: { name: "userId", referencedColumnName: "id" },
    inverseJoinColumn: {
      name: "emailingListId",
      referencedColumnName: "id",
    },
  })
  users: User[];

  @Column()
  filters: string;
}
