import Faker from "faker";
import { define } from "typeorm-seeding";
import { WinningTicket } from "../../winning-tickets/entities/winning-ticket.entity";

define(WinningTicket, (faker: typeof Faker, context: any) => {
  const ticket = new WinningTicket();
  ticket.number = context.number;
  ticket.amount = faker.random.number({ precision: 2 });
  ticket.user = context.user;
  ticket.withdrawnOn = context.withdrawnOn;
  ticket.game = context.game;
  ticket.cashRegister = context.cashRegister;
  ticket.assignedOn = context.assignedOn;
  ticket.gift = context.gift;

  return ticket;
});
