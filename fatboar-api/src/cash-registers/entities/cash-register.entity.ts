import { Restaurant } from "../../restaurants/entities/restaurant.entity";
import { WinningTicket } from "../../winning-tickets/entities/winning-ticket.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "cashRegisters"})
export class CashRegister {

     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     serial: string;

     @Column()
     token: string;

     @OneToMany(type => WinningTicket, winningTicket => winningTicket.cashRegister, {
          nullable: true
     })     
     winningTickets?: WinningTicket[];

     @ManyToOne(type => Restaurant, restaurant => restaurant.cashRegisters)
     restaurant: Restaurant;
}
