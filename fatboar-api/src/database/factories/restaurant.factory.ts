import Faker from "faker";
import { define } from "typeorm-seeding";
import { Restaurant } from "../../restaurants/entities/restaurant.entity";

define(Restaurant, (faker: typeof Faker, context: any) => {
  faker.locale = "fr";

  const restaurant = new Restaurant();
  restaurant.name = faker.random.word();
  restaurant.city = faker.address.city();

  return restaurant;
});
