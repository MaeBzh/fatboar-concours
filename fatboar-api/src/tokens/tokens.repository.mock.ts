import { Repository } from "typeorm";
import { Token } from "./entities/token.entity";

export class TokenRepositoryMock extends Repository<Token> {
  database: any;

  constructor(database) {
    super();
    this.database = database;
  }

  async find() {
    return this.database.token;
  }
}
