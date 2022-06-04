import { RequestWithUser } from "./../authentication/interfaces/request-with-user.interface";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { Connection, DeleteResult, EntityManager, UpdateResult } from "typeorm";
import { CreateWinningTicketDto } from "./dto/create-winning-ticket.dto";
import { UpdateWinningTicketDto } from "./dto/update-winning-ticket.dto";
import { WinningTicket } from "./entities/winning-ticket.entity";
import { WinningTicketsService } from "./winning-tickets.service";
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";

@Controller("winning-tickets")
@UseGuards(AuthGuard())
export class WinningTicketsController {
  constructor(
    private readonly winningTicketsService: WinningTicketsService,
    private readonly connection: Connection
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: "The winning ticket has been successfully created.",
    type: WinningTicket,
  })
  async create(@Body() createWinningTicketDto: CreateWinningTicketDto) {
    return this.connection.transaction(async (manager: EntityManager) => {
      return this.winningTicketsService.create(createWinningTicketDto, manager);
    });
  }

  @Get()
  async findAll() {
    return this.winningTicketsService.findAll();
  }

  @Get("/my-tickets")
  async findAllTicketsForSpecificUser(@Request() req: RequestWithUser) {
    return this.winningTicketsService.findAllTicketsForSpecificUser(req.user);
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.winningTicketsService.findOne(+id, {
      relations: ["user", "gift", "game"],
    });
  }

  @Get("current-game/:id")
  async findAllTicketsForCurrentGame(@Param("id") id: number) {
    return this.winningTicketsService.findAllTicketsForCurrentGame(id);
  }
  @UseGuards(ThrottlerGuard)
  @Throttle(3, 300)
  @Get("/verify-ticket/:number/:amount")
  async verifyTicket(
    @Param("number") number: number,
    @Param("amount") amount: number
  ): Promise<WinningTicket> {
    return this.winningTicketsService.verifyTicket(number, amount);
  }

  @Put(":id")
  @ApiCreatedResponse({
    description: "The winning ticket has been successfully updated.",
    type: UpdateResult,
  })
  async update(
    @Param("id") id: number,
    @Body() updateWinningTicketDto: UpdateWinningTicketDto
  ) {
    return this.connection.transaction(async (manager: EntityManager) => {
      return this.winningTicketsService.update(
        id,
        updateWinningTicketDto,
        manager
      );
    });
  }

  @Put("withdrawnTicket/:id")
  @ApiCreatedResponse({
    description: "The winning ticket has been successfully updated.",
    type: UpdateResult,
  })
  async withdrawnTicket(@Param("id") id: number) {
    return this.connection.transaction(async (manager: EntityManager) => {
      return this.winningTicketsService.withdrawnTicket(
        id,
        new Date(),
        manager
      );
    });
  }

  @Delete(":id")
  @ApiCreatedResponse({
    description: "The winning ticket has been successfully deleted.",
    type: DeleteResult,
  })
  async remove(@Param("id") id: number) {
    return this.connection.transaction(async (manager: EntityManager) => {
      return this.winningTicketsService.remove(id, manager);
    });
  }
}
