import Faker from "faker";
import { define } from "typeorm-seeding";
import { WinningTicket } from "../../winning-tickets/entities/winning-ticket.entity";

define(
  WinningTicket,
  (faker: typeof Faker, { user, game, gift, cashRegister }) => {
    faker.locale = "fr";

    const ticket = new WinningTicket();
    ticket.number = faker.random.number(10);
    ticket.withdrawnOn = faker.helpers.randomize([faker.date.past(), null]);
    ticket.amount = faker.random.number({ precision: 2 });
    ticket.user = user;
    ticket.game = game;
    ticket.cashRegister = cashRegister;
    ticket.gift = gift;

    return ticket;
  }
);
