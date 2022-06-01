import Faker from "faker";
import { define } from "typeorm-seeding";
import { CashRegister } from "../../cash-registers/entities/cash-register.entity";
import { Restaurant } from "../../restaurants/entities/restaurant.entity";

define(CashRegister, (faker: typeof Faker, context: any) => {

  const restaurant: Restaurant = context.restaurant as Restaurant;
 
  faker.locale = 'fr';

  const cashRegister = new CashRegister();
  cashRegister.serial = faker.random.alphaNumeric(10);
  // todo : token must be generated when cash register is inserted in DB.
  cashRegister.token = faker.random.alphaNumeric(10);
  cashRegister.restaurant = restaurant;

  return cashRegister;
});
