import { TokenType } from './../../token-types/entities/token-type.entity';
import { Role } from '../../roles/entities/role.entity';
import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";

export default class CreateTokenTypes implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
          .createQueryBuilder()
          .insert()
          .into(TokenType)
          .values([
            { name: 'access' },
            { name: 'refresh' },
          ])
          .execute()
      }
  }