import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { CashRegister } from "../../cash-registers/entities/cash-register.entity";
import { Restaurant } from "../../restaurants/entities/restaurant.entity";

export default class CreateCashRegisters implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const restaurants = await connection
      .getRepository(Restaurant)
      .createQueryBuilder()
      .getMany();
    await factory(CashRegister)({
      restaurant: restaurants[Math.floor(Math.random() * restaurants.length)],
    }).createMany(20);
  }
}
