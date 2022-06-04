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
  Repository,
  UpdateResult,
} from "typeorm";
import { WinningTicket } from "../winning-tickets/entities/winning-ticket.entity";
import { CreateWinningTicketDto } from "./dto/create-winning-ticket.dto";
import { UpdateWinningTicketDto } from "./dto/update-winning-ticket.dto";
import { Gift } from "src/gifts/entities/gift.entity";

@Injectable()
export class WinningTicketsService {
  constructor(
    @InjectRepository(WinningTicket)
    private ticketsRepo: Repository<WinningTicket>
  ) {}

  async create(
    createWinningTicketDto: CreateWinningTicketDto,
    manager?: EntityManager
  ): Promise<WinningTicket> {
    const repo = manager?.getRepository(WinningTicket) || this.ticketsRepo;
    return repo.save(createWinningTicketDto);
  }

  findAll(): Promise<WinningTicket[]> {
    return this.ticketsRepo.find();
  }

  findOne(
    id: number,
    options: FindOneOptions<WinningTicket>
  ): Promise<WinningTicket> {
    return this.ticketsRepo.findOneOrFail(id, options);
  }

  async verifyTicket(
    number: number,
    amount: number,
    user: User
  ): Promise<WinningTicket> {
    const { id } = await this.ticketsRepo
      .createQueryBuilder("winning-tickets")
      .select("winning-tickets.id")
      .where("winning-tickets.number = :number", { number })
      .andWhere("winning-tickets.amount = :amount", { amount })
      .andWhere(
        new Brackets((sub) => {
          sub.where("winning-tickets.userId IS NULL");
          sub.orWhere("winning-tickets.userId = :userId", { userId: user.id });
        })
      )
      .getOneOrFail();
    return this.findOne(id, { relations: ["gift"] });
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
    const tickets = await this.ticketsRepo.find({
      relations: ["gift", "user"],
      where: { gameId: +id },
    });

    return tickets;
  }

  async update(
    id: number,
    updateWinningTicketDto: UpdateWinningTicketDto,
    manager?: EntityManager
  ): Promise<UpdateResult> {
    let { user, cashRegister, ...data } = updateWinningTicketDto;
    const winningTicket: DeepPartial<WinningTicket> = { id: +id, ...data };

    if (updateWinningTicketDto.user) {
      winningTicket.user = user;
    }

    if (updateWinningTicketDto.cashRegister) {
      winningTicket.cashRegister = cashRegister;
    }

    const repo = manager?.getRepository(WinningTicket) || this.ticketsRepo;
    const result = repo.update(id, await repo.preload(winningTicket));

    return result;
  }

  async withdrawnTicket(
    id: number,
    withdrawnOn: Date,
    manager?: EntityManager
  ): Promise<WinningTicket> {
    const repo = manager?.getRepository(WinningTicket) || this.ticketsRepo;
    const ticket = await repo.findOneOrFail({ id });
    ticket.withdrawnOn = withdrawnOn;
    const response = await repo.update(id, await repo.preload(ticket));
    return repo.findOneOrFail(id, { relations: ["gift"] });
  }

  remove(id: number, manager?: EntityManager): Promise<DeleteResult> {
    const repo = manager?.getRepository(WinningTicket) || this.ticketsRepo;
    return repo.delete(id);
  }
}
