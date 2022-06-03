import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, EntityManager, Repository } from "typeorm";
import { CreateGameGiftDto } from "./dto/create-game-gift.dto";
import { GameGift } from "./entities/game-gift.entity";

@Injectable()
export class GameGiftService {
  constructor(
    @InjectRepository(GameGift)
    private gameGiftRepo: Repository<GameGift>
  ) {}

  async findByGame(gameId: number): Promise<GameGift[]> {
    return this.gameGiftRepo.find({ relations: ["gift"], where: { gameId } });
  }

  async findByGift(giftId: number): Promise<GameGift[]> {
    return this.gameGiftRepo.find({ relations: ["game"], where: { giftId } });
  }

  async create(
    gameGiftDto: CreateGameGiftDto,
    manager?: EntityManager
  ): Promise<GameGift> {
    const repo = manager?.getRepository(GameGift) || this.gameGiftRepo;
    const result: GameGift = await repo.save(gameGiftDto);
    return result;
  }

  removeByGame(gameId: number, manager?: EntityManager): Promise<DeleteResult> {
    const repo = manager?.getRepository(GameGift) || this.gameGiftRepo;

    return repo.delete({ game: { id: gameId } });
  }
}
