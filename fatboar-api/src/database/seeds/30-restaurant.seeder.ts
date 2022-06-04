import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Restaurant } from "../../restaurants/entities/restaurant.entity";

export default class CreateRestaurants implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Restaurant)().createMany(5);
  }
}
