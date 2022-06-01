import { Connection, createConnection } from "typeorm";
import { CreateRestaurantDto } from "../dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "../dto/update-restaurant.dto";
import { RestaurantsController } from "../restaurants.controller";

describe('RestaurantsController', () => {
  let connection: Connection;

  beforeAll(async () => {

    connection = await createConnection({
      type: 'mysql',
      synchronize: false,
      logging: true,
      entities: [__dirname + "**/*.entity.js"],
      database: process.env.databaseName ?? 'fatboar',
      host: process.env.databaseHost ?? 'mariadb',
      port: parseInt(process.env.databasePort) ?? 3306,
      username: process.env.databaseUsername ?? 'MaeBzh',
      password: process.env.databasePassword ?? 'password',
    });
  })

  describe('findAll', () => {
    it('should be called one time', async () => {
      const restaurantService: any = { findAll: async () => [] };
      const restaurantController = new RestaurantsController(restaurantService, {} as any);

      let restaurantServiceSpyFindAll = jest.spyOn(restaurantService, 'findAll');

      await restaurantController.findAll();
      expect(restaurantServiceSpyFindAll).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should be called one time', async () => {
      const restaurantService: any = { findOne: async () => { } };
      const restaurantController = new RestaurantsController(restaurantService, {} as any);

      let restaurantServiceSpyFindOne = jest.spyOn(restaurantService, 'findOne');

      await restaurantController.findOne(1);
      expect(restaurantServiceSpyFindOne).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should be called one time', async () => {
      const restaurantService: any = { create: async () => { } };
      const restaurantController = new RestaurantsController(restaurantService, connection);


      let restaurantServiceSpyCreate = jest.spyOn(restaurantService, 'create');

      await restaurantController.create(new CreateRestaurantDto());
      expect(restaurantServiceSpyCreate).toBeCalledTimes(1);
    });
  });


  describe('update', () => {
    it('should be called one time', async () => {
      const restaurantService: any = { update: async () => { } };
      const restaurantController = new RestaurantsController(restaurantService, connection);


      let restaurantServiceSpyUpdate = jest.spyOn(restaurantService, 'update');

      await restaurantController.update(1, new UpdateRestaurantDto());
      expect(restaurantServiceSpyUpdate).toBeCalledTimes(1);
    });
  });

  afterAll( async () => {
    await connection.close();
  })


  describe('remove', () => {
    it('should be called one time', async () => {
      const restaurantService: any = { remove: async () => { } };
      const restaurantController = new RestaurantsController(restaurantService, connection);


      let restaurantServiceSpyRemove = jest.spyOn(restaurantService, 'remove');

      await restaurantController.remove(1);
      expect(restaurantServiceSpyRemove).toBeCalledTimes(1);
    });
  });

  afterAll( async () => {
    await connection.close();
  })

});