import { CashRegister } from "./../cash-registers/entities/cash-register.entity";
import { RequestWithCashRegister } from "./../authentication/interfaces/request-with-user.interface";
import {
  Body,
  Controller,
  forwardRef,
  Inject,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { GamesService } from "../games/games.service";
import { Connection, EntityManager } from "typeorm";
import { WinningTicket } from "./entities/winning-ticket.entity";
import { WinningTicketsService } from "./winning-tickets.service";

@Controller("winning-tickets")
@UseGuards(AuthGuard("cashregister"))
export class WinningTicketsCashRegisterController {
  constructor(
    private readonly winningTicketsService: WinningTicketsService,
    private readonly connection: Connection,
    private readonly gamesService: GamesService
  ) {}

  @Post("/assignTicket")
  @ApiCreatedResponse({
    description: "The winning ticket has been successfully updated.",
    type: WinningTicket,
  })
  async assignWinningTicket(
    @Body() ticketAssignment: {amount: number},
    @Request() req: RequestWithCashRegister
  ) {
    const currentGame = await this.gamesService.findCurrentGame();
    if (currentGame) {
      const ticket = await this.winningTicketsService.findRandomFreeTicket(
        currentGame
      );
      if (ticket) {
        return this.connection.transaction(async (manager: EntityManager) => {
          await this.winningTicketsService.update(
            ticket.id,
            { cashRegister: req.cashRegister, amount: ticketAssignment.amount, assignedOn: new Date() },
            manager
          );

          return ticket.number;
        });
      }
    }
  }
}
