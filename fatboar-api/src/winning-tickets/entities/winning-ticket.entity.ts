import { CashRegister } from "../../cash-registers/entities/cash-register.entity";
import { Game } from "../../games/entities/game.entity";
import { Gift } from "../../gifts/entities/gift.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "winningTickets" })
export class WinningTicket {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    number: number;

    @Column({
        nullable: true
    })
    withdrawnOn: Date;

    @Column({
        nullable: true
    })
    assignedOn: Date;

    @Column({nullable: true})
    amount: number;

    @Column({nullable: true})
    userId: number;

    @ManyToOne(type => User, user => user.winningTickets, {
        nullable: true
    })
    user?: User;

    @Column({nullable: true})
    gameId: number;

    @ManyToOne(type => Game, game => game.winningTickets)
    game: Game;

    @ManyToOne(type => CashRegister, cashRegister => cashRegister.winningTickets, {
        nullable: true
    })
    cashRegister?: CashRegister;

    @ManyToOne(type => Gift, gift => gift.winningTickets)
    gift: Gift;

}
