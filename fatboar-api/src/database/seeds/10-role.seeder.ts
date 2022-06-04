import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Role } from "../../roles/entities/role.entity";

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([{ name: "admin" }, { name: "client" }, { name: "employee" }])
      .execute();
  }
}
