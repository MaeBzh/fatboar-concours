import { Connection, createConnection } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UsersController } from "../users.controller";

describe('UsersController', () => {
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

  beforeEach(async () => {

  
  });

  describe('findAll', () => {
    it('should be called one time', async () => {
      const usersService: any = { findAll: async () => [] };
      const usersController = new UsersController(usersService, {} as any);

      let userServiceSpyFindAll = jest.spyOn(usersService, 'findAll');

      await usersController.findAll();
      expect(userServiceSpyFindAll).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should be called one time', async () => {
      const usersService: any = { findOne: async () => { } };
      const usersController = new UsersController(usersService, {} as any);

      let userServiceSpyFindOne = jest.spyOn(usersService, 'findOne');

      await usersController.findOne(1);
      expect(userServiceSpyFindOne).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should be called one time', async () => {
      const usersService: any = { create: async () => { } };
      const usersController = new UsersController(usersService, connection);


      let userServiceSpyCreate = jest.spyOn(usersService, 'create');

      await usersController.create(new CreateUserDto());
      expect(userServiceSpyCreate).toBeCalledTimes(1);
    });
  });


  describe('update', () => {
    it('should be called one time', async () => {
      const usersService: any = { update: async () => { } };
      const usersController = new UsersController(usersService, connection);


      let userServiceSpyUpdate = jest.spyOn(usersService, 'update');

      await usersController.update(1, new UpdateUserDto());
      expect(userServiceSpyUpdate).toBeCalledTimes(1);
    });
  });

  afterAll( async () => {
    await connection.close();
  })


  describe('remove', () => {
    it('should be called one time', async () => {
      const usersService: any = { remove: async () => { } };
      const usersController = new UsersController(usersService, connection);


      let userServiceSpyRemove = jest.spyOn(usersService, 'remove');

      await usersController.remove(1);
      expect(userServiceSpyRemove).toBeCalledTimes(1);
    });
  });

  afterAll( async () => {
    await connection.close();
  })

});