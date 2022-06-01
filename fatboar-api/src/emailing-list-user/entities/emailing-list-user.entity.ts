import { EmailingList } from "../../emailing-list/entities/emailing-list.entity";
import { User } from "../../users/entities/user.entity";
import { Entity, JoinTable, OneToOne, PrimaryColumn } from "typeorm";

@Entity({name: "emailingListUser"})
export class EmailingListUser {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    emailingListId: number


    @OneToOne(type => User)
    user: User;

    @OneToOne(type => EmailingList)
    emailingList: EmailingList;
}
