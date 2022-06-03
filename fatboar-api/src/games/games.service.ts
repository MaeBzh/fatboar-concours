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

    const createdGame: Game = await repo.save(game);

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

    const createdGameGifts = await Promise.all(gameGiftPromises);

    createdGameGifts.forEach((createdGameGift) => {
      const nbTicketsToCreate =
        +createGameDto.tickets * (+createdGameGift.winPercentage / 100);
      for (let i = 0; i < nbTicketsToCreate; i++) {
        const number = +`${Date.now()}${i}`;
        this.ticketsService.create(
          {
            number,
            game: createdGame,
            gift: createdGameGift.gift,
          },
          manager
        );
      }
    });

    return createdGame;
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
