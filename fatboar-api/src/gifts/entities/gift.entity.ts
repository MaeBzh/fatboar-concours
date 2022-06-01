import { Game } from "../../games/entities/game.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GameGift } from "../../game-gift/entities/game-gift.entity";
import { WinningTicket } from "../../winning-tickets/entities/winning-ticket.entity";

@Entity({ name: "gifts" })
export class Gift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  photo: string;

  @Column()
  filename: string;

  @Column()
  icon: string;

  @Column()
  isJackpot: boolean;

  @OneToMany((type) => WinningTicket, (winningTicket) => winningTicket.gift, {
    onDelete: "CASCADE",
  })
  winningTickets: Promise<WinningTicket[]>;

  @OneToMany((type) => GameGift, (gameGift) => gameGift.gift)
  gameGifts: GameGift[];

  @OneToMany((type) => Game, (game) => game.jackpotGift)
  games?: Game[];
}
