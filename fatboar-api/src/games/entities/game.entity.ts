import { Gift } from "../../gifts/entities/gift.entity";
import { WinningTicket } from "../../winning-tickets/entities/winning-ticket.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GameGift } from "../../game-gift/entities/game-gift.entity";

@Entity({ name: "games" })
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startsOn: Date;

  @Column()
  endsOn: Date;

  @Column()
  activated: boolean;

  @Column()
  description: string;

  @Column()
  gameRules: string;

  @Column()
  filename: string;
  
  @Column()
  jackpotDraw: Date;

  @Column({
    nullable: true,
  })
  rulesValidation?: Date;

  @OneToMany((type) => WinningTicket, (winningTicket) => winningTicket.game, {
    onDelete: "CASCADE",
  })
  winningTickets?: WinningTicket[];

  @OneToMany((type) => GameGift, (gameGift) => gameGift.game, {cascade: true})  
  gameGifts: GameGift[];

  @ManyToOne((type) => Gift, (gift) => gift.games)
  jackpotGift: Gift;
}
