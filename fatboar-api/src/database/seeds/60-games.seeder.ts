import { CashRegister } from "./../../cash-registers/entities/cash-register.entity";
import { WinningTicket } from "./../../winning-tickets/entities/winning-ticket.entity";
import { GameGift } from "./../../game-gift/entities/game-gift.entity";
import { Game } from "../../games/entities/game.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Gift } from "../../gifts/entities/gift.entity";
import { Role } from "../../roles/entities/role.entity";
import { User } from "../../users/entities/user.entity";

const TICKETS_NUMBER = 1_500_000;
const CHUNK_SIZE = 50_000;

export default class CreateGames implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const jackpotGift = await connection
      .getRepository(Gift)
      .createQueryBuilder()
      .where({ isJackpot: true })
      .getOne();

    const game = await factory(Game)({
      name: "Grand jeu-concours",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      startsOn: "2022-06-01 00:00:00.000",
      endsOn: "2022-08-31 23:59:59.000",
      filename: "reglement-jeu-concours.pdf",
      jackpotGift,
    }).create();

    const gameGifts = [
      { name: "Un hamburger", winPercentage: 20 },
      { name: "70% de réduction", winPercentage: 4 },
      { name: "Une entrée ou un dessert", winPercentage: 60 },
      { name: "Un menu au choix", winPercentage: 6 },
      { name: "Un menu du jour", winPercentage: 10 },
    ];

    const promises = gameGifts.map(async ({ name, winPercentage }) => {
      return factory(GameGift)({
        game,
        gift: await connection
          .getRepository(Gift)
          .createQueryBuilder()
          .where({ name })
          .getOne(),
        winPercentage,
      }).create();
    });

    const createdGameGifts = await Promise.all(promises);
    const roleClient = await connection
      .getRepository(Role)
      .createQueryBuilder()
      .where("name = 'client'")
      .getOne();
    const users = await connection
      .getRepository(User)
      .createQueryBuilder()
      .where({ role: roleClient })
      .getMany();
    const cashRegisters = await connection
      .getRepository(CashRegister)
      .createQueryBuilder()
      .getMany();

    const promises2 = createdGameGifts.map(async (createdGameGift) => {
      const nbTicketsToCreate =
        +TICKETS_NUMBER * (+createdGameGift.winPercentage / 100);
      console.log(
        `Creating ${nbTicketsToCreate} tickets for ${createdGameGift.gift.name}`
      );

      const chunk: WinningTicket[] = [];
      for (let i = 0; i < nbTicketsToCreate; i++) {
        const cashRegister =
          Math.random() > 0.5
            ? cashRegisters[Math.floor(Math.random() * cashRegisters.length)]
            : null;

        const user =
          cashRegister && Math.random() > 0.5
            ? users[Math.floor(Math.random() * users.length)]
            : null;

        chunk.push(
          await factory(WinningTicket)({
            number: +`${Date.now()}${i}`,
            game,
            gift: createdGameGift.gift,
            cashRegister: cashRegister ?? null,
            assignedOn: cashRegister
              ? `2022-06-${Math.floor(Math.random() * 31)} 00:00:00.000`
              : null,
            user: user ?? null,
            withdrawnOn: user ? "2022-06-05 00:00:00.000" : null,
          }).make()
        );

        if (chunk.length >= CHUNK_SIZE) {
          await connection
            .getRepository(WinningTicket)
            .insert(chunk.splice(0, CHUNK_SIZE));
        }
      }

      if (chunk.length) {
        await connection.getRepository(WinningTicket).insert(chunk);
      }
    });

    await Promise.all(promises2);
  }
}
