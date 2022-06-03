import { Column, Entity, ManyToOne } from "typeorm";
import { Game } from "../../games/entities/game.entity";
import { Gift } from "../../gifts/entities/gift.entity";

@Entity({ name: "gameGift" })
export class GameGift {
  @Column({ nullable: true })
  winPercentage: number;

  @ManyToOne((type) => Game, (game) => game.gameGifts, { primary: true })
  game: Game;

  @Column()
  gameId: number;

  @ManyToOne((type) => Gift, (gift) => gift.gameGifts, { primary: true })
  gift: Gift;

  //   @Column({ nullable: true })
  //   giftId: number;
}
