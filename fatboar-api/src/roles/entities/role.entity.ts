import { User } from "../../users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";


@Entity({name: "roles"})
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
  
    @OneToMany(type => User, user => user.role, {
        onDelete: "RESTRICT"
    })
    users: Promise<User[]>;   
}
