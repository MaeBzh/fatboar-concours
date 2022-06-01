import { CashRegister } from "../../cash-registers/entities/cash-register.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "restaurants"})
export class Restaurant {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    city: string;

    @OneToMany(type => CashRegister, cashRegister => cashRegister.restaurant, {
        onDelete: "CASCADE"
    })
    cashRegisters?: CashRegister[];

  
}
