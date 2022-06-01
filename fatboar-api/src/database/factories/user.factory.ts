import Faker from "faker";
import { define } from "typeorm-seeding";
import { Role } from "../../roles/entities/role.entity";
import { User } from "../../users/entities/user.entity";

define(User, (faker: typeof Faker, context: any) => {
  const role: Role = context.role as Role;
 
  faker.locale = 'fr';
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();

  const user = new User();
  user.firstname = firstname;
  user.lastname = lastname;
  user.email = context.email ?? faker.internet.email(firstname, lastname);
  user.password = context.password;
  user.role = role;
  user.isActive = true;
  if (role.name === "client") {
    user.birthYear = faker.random.number({min:1950, max:2000});
    user.zipcode = faker.address.zipCode();
    user.newsletter = faker.helpers.randomize([true, false]);
    user.sms =  faker.helpers.randomize([true, false]);
    user.phone = faker.phone.phoneNumber();
    user.rgpdConsent = faker.date.recent();
  }
  return user;
});
