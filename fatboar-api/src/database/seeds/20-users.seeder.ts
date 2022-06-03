import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Role } from "../../roles/entities/role.entity";
import { User } from "../../users/entities/user.entity";
import bcrypt = require("bcrypt");

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const admin = await connection
      .getRepository(Role)
      .createQueryBuilder()
      .where("name = 'admin'")
      .getOne();
    const employee = await connection
      .getRepository(Role)
      .createQueryBuilder()
      .where("name = 'employee'")
      .getOne();
    const client = await connection
      .getRepository(Role)
      .createQueryBuilder()
      .where("name = 'client'")
      .getOne();

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash("@Password1234", salt);

    await factory(User)({
      role: admin,
      email: "admin@mail.com",
      password,
    }).create();
    await factory(User)({
      role: employee,
      email: "employe@mail.com",
      password,
    }).create();
    await factory(User)({
      role: client,
      email: "client@mail.com",
      password,
    }).create();
    await factory(User)({ role: employee, password }).createMany(5);
    await factory(User)({ role: client, password }).createMany(10);
  }
}
