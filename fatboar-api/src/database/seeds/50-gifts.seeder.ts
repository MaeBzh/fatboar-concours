import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Gift } from "../../gifts/entities/gift.entity";

export default class CreateGifts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Gift)({filename: "hamburger.png", name: "Un hamburger", isJackpot: false, icon: "mdi-hamburger"}).create();
    await factory(Gift)({filename: "70-reduction.png", name: "70% de réduction", isJackpot: false, icon: "mdi-percent"}).create();
    await factory(Gift)({filename: "entree-ou-dessert.png", name: "Une entrée ou un dessert", isJackpot: false, icon: "mdi-cupcake"}).create();
    await factory(Gift)({filename: "menu-au-choix.png", name: "Un menu au choix", isJackpot: false, icon: "mdi-food"}).create();
    await factory(Gift)({filename: "menu-du-jour.png", name: "Un menu du jour", isJackpot: false, icon: "mdi-bulletin-board"}).create();
    await factory(Gift)({filename: "range-rover-evoque.png", name: "Un Range Rover Evoque, d'une valeur de 59.000€", isJackpot: true, icon: "mdi-car"}).create();
  }
}
