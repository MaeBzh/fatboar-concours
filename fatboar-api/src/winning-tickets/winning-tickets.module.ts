import { GamesModule } from "src/games/games.module";
import { WinningTicketsCashRegisterController } from "./winning-tickets-cash-register.controller";
import { forwardRef, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CashRegistersModule } from "./../cash-registers/cash-registers.module";
import { UsersModule } from "./../users/users.module";
import { WinningTicket } from "./entities/winning-ticket.entity";
import { WinningTicketsController } from "./winning-tickets.controller";
import { WinningTicketsService } from "./winning-tickets.service";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [
    TypeOrmModule.forFeature([WinningTicket]),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 3,
    }),
    UsersModule,
    CashRegistersModule,
    forwardRef(() => GamesModule),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  controllers: [WinningTicketsController, WinningTicketsCashRegisterController],
  providers: [WinningTicketsService],
  exports: [WinningTicketsService],
})
export class WinningTicketsModule {}
