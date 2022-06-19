import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "../games/entities/game.entity";
import { User } from "../users/entities/user.entity";
import {
  Brackets,
  DeepPartial,
  DeleteResult,
  EntityManager,
  FindOneOptions,
  InsertResult,
  IsNull,
  Not,
  Repository,
  UpdateResult,
} from "typeorm";
import { WinningTicket } from "../winning-tickets/entities/winning-ticket.entity";
import { CreateWinningTicketDto } from "./dto/create-winning-ticket.dto";

@Injectable()
export class WinningTicketsService {
  constructor(
    @InjectRepository(WinningTicket)
    private ticketsRepo: Repository<WinningTicket>
  ) {}

  async getGameStats({ id }: Game) {
    const used = await this.ticketsRepo
      .createQueryBuilder()
      .where("assignedOn IS NOT NULL")
      .andWhere("withdrawnOn IS NOT NULL")
      .andWhere("gameId = :id", { id })
      .getCount();

    const unused = await this.ticketsRepo
      .createQueryBuilder()
      .where("assignedOn IS NOT NULL")
      .andWhere("withdrawnOn IS NULL")
      .andWhere("gameId = :id", { id })
      .getCount();

    const unassigned = await this.ticketsRepo
      .createQueryBuilder()
      .where("assignedOn IS NULL")
      .andWhere("withdrawnOn IS NULL")
      .andWhere("gameId = :id", { id })
      .getCount();

    return { used, unused, unassigned };
  }

  async create(
    createWinningTicketDto: CreateWinningTicketDto,
    manager?: EntityManager
  ): Promise<WinningTicket> {
    const repo = manager?.getRepository(WinningTicket) || this.ticketsRepo;
    return repo.save(createWinningTicketDto);
  }
  async bulk(
    winningTickets: WinningTicket[],
    manager?: EntityManager
  ): Promise<InsertResult> {
    const repo = manager?.getRepository(WinningTicket) || this.ticketsRepo;
    return repo.insert(winningTickets);
  }

  findAll(): Promise<WinningTicket[]> {
    return this.ticketsRepo.find();
  }

  findOne(
    id: number,
    options?: FindOneOptions<WinningTicket>
  ): Promise<WinningTicket> {
    return this.ticketsRepo.findOneOrFail(id, options);
  }

  async verifyTicket(
    number: number,
    amount: number,
    user?: User,
    id?: number
  ): Promise<WinningTicket> {
    const query = this.ticketsRepo
      .createQueryBuilder("winning-tickets")
      .select("winning-tickets.id")
      .where("winning-tickets.number = :number", { number })
      .andWhere("winning-tickets.amount = :amount", { amount })
      .andWhere("winning-tickets.assignedOn IS NOT NULL");

      if(user) {
        query.andWhere(
          new Brackets((sub) => {
            sub.where("winning-tickets.userId IS NULL");
            sub.orWhere("winning-tickets.userId = :userId", { userId: user.id });
          })
        )
      } else {
        query.andWhere("winning-tickets.userId IS NOT NULL")
      }
      if(id) {
        query.andWhere("winning-tickets.id = :id", { id });
      }

      const winningTicket = await query.getOneOrFail();

    return this.findOne(winningTicket.id, { relations: ["gift", "user"] });
  }

  async findAllTicketsForSpecificUser(user: User): Promise<WinningTicket[]> {
    return this.ticketsRepo.find({
      relations: ["gift"],
      where: { userId: user.id },
    });
  }

  async findRandomFreeTicket(game: Game): Promise<WinningTicket> {
    const result = await this.ticketsRepo
      .createQueryBuilder()
      .select("*")
      .from(WinningTicket, "wt")
      .where({ gameId: game.id })
      .andWhere("wt.cashRegisterId is null")
      .orderBy("RAND()")
      .limit(1)
      .execute();

    return result.length ? result[0] : undefined;
  }

  async findAllTicketsForCurrentGame(id: number): Promise<WinningTicket[]> {
    return this.ticketsRepo.find({
      relations: ["gift", "user"],
      where: { gameId: +id },
    });
  }

  async findWonTicketsForCurrentGame(id: number): Promise<WinningTicket[]> {
    return this.ticketsRepo.find({
      relations: ["user"],
      where: { gameId: +id, userId: Not(IsNull()) },
    });
  }

  async update(
    id: number,
    data: Partial<WinningTicket>,
    manager?: EntityManager
  ): Promise<WinningTicket> {
    const repo = manager?.getRepository(WinningTicket) || this.ticketsRepo;

    await repo.update(id, data);
    return repo.findOneOrFail(id, { relations: ["gift", "user"] });
  }

  remove(id: number, manager?: EntityManager): Promise<DeleteResult> {
    const repo = manager?.getRepository(WinningTicket) || this.ticketsRepo;
    return repo.delete(id);
  }
}
