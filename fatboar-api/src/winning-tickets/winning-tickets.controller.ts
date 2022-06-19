import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards
} from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";
import { AdminGuard } from "src/authentication/guards/admin-authentication.guard";
import { EmployeeGuard } from "src/authentication/guards/employee-authentication.guard";
import { Connection, DeleteResult, EntityManager, UpdateResult } from "typeorm";
import { ClientGuard } from "./../authentication/guards/client-authentication.guard";
import { JwtGuard } from "./../authentication/guards/jwt-authentication.guard";
import { RequestWithUser } from "./../authentication/interfaces/request-with-user.interface";
import { CreateWinningTicketDto } from "./dto/create-winning-ticket.dto";
import { WinningTicket } from "./entities/winning-ticket.entity";
import { WinningTicketsService } from "./winning-tickets.service";

@Controller("winning-tickets")
@UseGuards(JwtGuard)
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
  @UseGuards(ClientGuard)
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
  
  @Get("/verify-ticket/:number/:amount")
  @UseGuards(ThrottlerGuard)
  @Throttle(5, 300)
  async verifyTicket(
    @Param("number") number: number,
    @Param("amount") amount: number,
    @Request() req: RequestWithUser
  ): Promise<WinningTicket> {
    try{
    return this.winningTicketsService.verifyTicket(
      number, 
      amount, 
      req.user.role.name === "client" ? req.user : undefined
    );
  } catch(err) {
    console.error(err);
    throw err;
  }
  }

  @Put(":id/user")
  @ApiCreatedResponse({
    description: "The winning ticket has been successfully updated.",
    type: UpdateResult,
  })
  @UseGuards(ClientGuard)
  async updateUser(
    @Param("id") id: number,
    @Body() {number, amount}: Pick<WinningTicket, "number" | "amount">,
    @Request() req: RequestWithUser
  ) {
    return this.connection.transaction(async (manager: EntityManager) => {
      // verify token before update by security
      await this.winningTicketsService.verifyTicket(number, amount, req.user, id)
      return this.winningTicketsService.update(
        id,
        {user: req.user},
        manager
      );
    });
  }

  @Put(":id/withdrawn")
  @ApiCreatedResponse({
    description: "The winning ticket has been successfully updated.",
    type: UpdateResult,
  })
  async updateWithdrawn(
    @Param("id") id: number,
    @Body() {number, amount}: Pick<WinningTicket, "number" | "amount">,
  ) {
    return this.connection.transaction(async (manager: EntityManager) => {
      // verify token before update by security
      await this.winningTicketsService.verifyTicket(number, amount, undefined, id);

      return this.winningTicketsService.update(
        id,
        {withdrawnOn: new Date()},
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
