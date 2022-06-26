import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity({ name: "emailingLists" })
export class EmailingList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, { cascade: true })
  @JoinTable({
    name: "emailingListUser",
    joinColumn: { name: "emailingListId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "userId", referencedColumnName: "id" },
  })
  users: User[];

  @Column()
  filters: string;
}
