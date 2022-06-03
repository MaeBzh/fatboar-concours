import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { TokenType } from "./../../token-types/entities/token-type.entity";

export default class CreateTokenTypes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(TokenType)
      .values([{ name: "access" }, { name: "refresh" }])
      .execute();
  }
}
