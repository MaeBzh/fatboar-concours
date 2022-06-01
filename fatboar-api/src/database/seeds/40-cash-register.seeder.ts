import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { CashRegister } from '../../cash-registers/entities/cash-register.entity';
import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

export default class CreateCashRegisters implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const restaurants = await connection.getRepository(Restaurant).createQueryBuilder().getMany();      
      await factory(CashRegister)({restaurant: restaurants[Math.floor(Math.random()*restaurants.length)]}).createMany(20);
    }
  }