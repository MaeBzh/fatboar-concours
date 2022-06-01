import Faker from "faker";
import { EmailingList } from "../../emailing-list/entities/emailing-list.entity";
import { define } from "typeorm-seeding";

define(EmailingList, (faker: typeof Faker, { users }) => {
  faker.locale = "fr";

  const list = new EmailingList();
  list.name = faker.lorem.words();
  list.users = users;
  list.filters = '{ "years": { "min": 1980, "max": 1990 }, "departments": ["01", "02", "03"] }';
  return list;
});
