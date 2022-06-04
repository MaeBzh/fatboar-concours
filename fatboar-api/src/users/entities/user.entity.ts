import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmailingList } from "../../emailing-list/entities/emailing-list.entity";
import { Role } from "../../roles/entities/role.entity";
import { Token } from "../../tokens/entities/token.entity";
import { WinningTicket } from "../../winning-tickets/entities/winning-ticket.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  phone?: string;

  @Column()
  birthYear?: number;

  @Column()
  password: string;

  @Column()
  newsletter?: boolean;

  @Column()
  sms?: boolean;

  @Column()
  zipcode?: string;

  @Column()
  rgpdConsent?: Date;

  @Column()
  isActive: boolean;

  @Column()
  accountToken: string;

  @OneToMany(() => WinningTicket, (winningTicket) => winningTicket.user, {
    onDelete: "CASCADE",
    nullable: true,
  })
  winningTickets?: WinningTicket[];

  @ManyToMany(() => EmailingList, (emailingList) => emailingList.users)
  @JoinTable({
    name: "emailingListUser",
    joinColumn: {
      name: "emailingListId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: { name: "userId", referencedColumnName: "id" },
  })
  emailingLists?: EmailingList[];

  @OneToMany(() => Token, (token) => token.user)
  tokens?: Token[];

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: "RESTRICT",
  })
  role: Role;
}
