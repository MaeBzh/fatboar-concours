import { GameGift } from "./../game-gift/entities/game-gift.entity";
import { WinningTicket } from "./../winning-tickets/entities/winning-ticket.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  DeleteResult,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from "typeorm";
import { GameGiftService } from "./../game-gift/game-gift.service";
import { WinningTicketsService } from "./../winning-tickets/winning-tickets.service";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { Game } from "./entities/game.entity";

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gameRepo: Repository<Game>,
    private gameGiftService: GameGiftService,
    private ticketsService: WinningTicketsService
  ) {}

  /**
   *
   * @param createGameDto
   * @param manager
   * @returns
   */
  async create(
    createGameDto: CreateGameDto,
    manager?: EntityManager
  ): Promise<Game> {
    const repo = manager?.getRepository(Game) || this.gameRepo;

    const { gameGifts, ...game } = createGameDto;

    const createdGame: Game = await repo.save({
      ...game,
      rulesValidation: new Date(),
    });

    const gameGiftPromises = gameGifts.map(async (gameGift) => {
      return this.gameGiftService.create(
        {
          gift: gameGift.gift,
          game: createdGame,
          winPercentage: +gameGift.winPercentage,
        },
        manager
      );
    });

    await Promise.all(gameGiftPromises);

    return createdGame;
  }

  async createTickets(game: Game, tickets: number): Promise<void> {
    const chunkSize = +(process.env.CREATE_TICKET_BULK_SIZE ?? 10000);

    const gameGifts = await this.gameGiftService.findByGame(game.id);

    gameGifts.map(async ({ winPercentage, gift }) => {
      const nbTicketsToCreate = +tickets * (+winPercentage / 100);
      const chunk: WinningTicket[] = [];

      for (let i = 0; i < nbTicketsToCreate; i++) {
        const number = +`${Date.now()}${i}`;
        const winningTicket = { number, game, gift };
        chunk.push(winningTicket as WinningTicket);

        if (chunk.length >= chunkSize) {
          await this.ticketsService.bulk(chunk.splice(0, chunkSize));
        }
      }

      if (chunk.length) {
        await this.ticketsService.bulk(chunk);
      }
    });
  }

  /**
   *
   * @param options
   * @returns
   */
  async findAll(options?: FindManyOptions<Game>): Promise<Game[]> {
    return this.gameRepo.find(options);
  }

  /**
   *
   * @param id
   * @param options
   * @returns
   */
  findOne(id: number, options?: FindOneOptions<Game>): Promise<Game> {
    return this.gameRepo.findOneOrFail(id, options);
  }

  /**
   *
   * @returns
   */
  findCurrentGame(): Promise<Game> {
    return this.gameRepo.findOne({
      relations: ["gameGifts", "gameGifts.gift", "jackpotGift"],
      where: { activated: true },
    });
  }

  /**
   *
   * @param id
   * @param activated
   * @param manager
   * @returns
   */
   async updateGameActivation(
    id: number,
    activated: boolean,
    manager?: EntityManager
  ): Promise<UpdateResult> {
    const repo = manager?.getRepository(Game) || this.gameRepo;    

    return repo.update(id, {activated}); 
  }

  async getStats(
    id: number
  ): Promise<{ used: number; unused: number; unassigned: number }> {
    const stats = { used: 0, unused: 0, unassigned: 0 };
    const game = await this.findOne(id);
    if (!game) return stats;

    return this.ticketsService.getGameStats(game);
  }

  async ticketsToCsv(id: number): Promise<Buffer> {
    const wonTickets = await this.ticketsService.findWonTicketsForCurrentGame(
      id
    );

    const tickets = wonTickets.map((ticket) => {
      return {
        numéro: ticket.number,
        prénom: ticket.user.firstname,
        nom: ticket.user.lastname,
        email: ticket.user.email,
        jeu: id,
      };
    });

    const headers = ["numéro", "nom", "prénom", "email", "jeu"];
    return this.convertToCSV(tickets, headers);
  }

  async convertToCSV(objArray, headerList): Promise<Buffer> {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "";
    let row = "S.No,";
    for (const index in headerList) {
      row += headerList[index] + ",";
    }
    row = row.slice(0, -1);
    str += row + "\r\n";
    for (let i = 0; i < array.length; i++) {
      let line = i + 1 + "";
      for (const index in headerList) {
        const head = headerList[index];
        line += "," + array[i][head];
      }
      str += line + "\r\n";
    }

    return Buffer.from(str, "utf-8");
  }

  /**
   *
   * @param id
   * @param updateGameDto
   * @param manager
   * @returns
   */
  async update(
    id: number,
    updateGameDto: UpdateGameDto,
    manager?: EntityManager
  ): Promise<UpdateResult> {
    const repo = manager?.getRepository(Game) || this.gameRepo;

    const { gameGifts, ...data } = updateGameDto;
    const game = { id, ...data };

    // update the game
    const updateResult: Promise<UpdateResult> = repo.update(id, game);

    // we delete the associated gameGifts
    await this.gameGiftService.removeByGame(id);

    // then save the new gamegifts associated to this game
    const promises = updateGameDto.gameGifts.map(async (gameGift) => {
      // we save the gameGift
      return this.gameGiftService.create(
        {
          game,
          gift: gameGift.gift,
          winPercentage: +gameGift.winPercentage,
        },
        manager
      );
    });
    await Promise.all(promises);

    return updateResult;
  }

  /**
   *
   * @param id
   * @param manager
   * @returns
   */
  remove(id: number, manager?: EntityManager): Promise<DeleteResult> {
    const repo = manager?.getRepository(Game) || this.gameRepo;
    return repo.delete(id);
  }
}
