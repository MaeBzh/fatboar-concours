import { Role } from '../../roles/entities/role.entity';
import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";

export default class CreateRoles implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
          .createQueryBuilder()
          .insert()
          .into(Role)
          .values([
            { name: 'admin' },
            { name: 'client' },
            { name: 'employee' },
          ])
          .execute()
      }
  }