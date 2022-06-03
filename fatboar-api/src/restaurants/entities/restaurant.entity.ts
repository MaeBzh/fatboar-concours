import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CashRegister } from "../../cash-registers/entities/cash-register.entity";

@Entity({ name: "restaurants" })
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @OneToMany(
    (type) => CashRegister,
    (cashRegister) => cashRegister.restaurant,
    {
      onDelete: "CASCADE",
    }
  )
  cashRegisters?: CashRegister[];
}
