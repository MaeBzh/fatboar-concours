import { Connection, createConnection } from "typeorm";
import { CreateGameDto } from "../dto/create-game.dto";
import { UpdateGameDto } from "../dto/update-game.dto";
import { GamesController } from "../games.controller";

describe('GameController', () => {
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
      const gameService: any = { findAll: async () => [] };
      const gameController = new GamesController(gameService, {} as any);

      let gameServiceSpyFindAll = jest.spyOn(gameService, 'findAll');

      await gameController.findAll();
      expect(gameServiceSpyFindAll).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should be called one time', async () => {
      const gameService: any = { findOne: async () => { } };
      const gameController = new GamesController(gameService, {} as any);

      let gameServiceSpyFindOne = jest.spyOn(gameService, 'findOne');

      await gameController.findOne(1);
      expect(gameServiceSpyFindOne).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should be called one time', async () => {
      const gameService: any = { create: async () => { } };
      const gameController = new GamesController(gameService, connection);


      let gameServiceSpyCreate = jest.spyOn(gameService, 'create');

      await gameController.create(new CreateGameDto());
      expect(gameServiceSpyCreate).toBeCalledTimes(1);
    });
  });


  describe('update', () => {
    it('should be called one time', async () => {
      const gameService: any = { update: async () => { } };
      const gameController = new GamesController(gameService, connection);


      let gameServiceSpyUpdate = jest.spyOn(gameService, 'update');

      await gameController.update(1, new UpdateGameDto());
      expect(gameServiceSpyUpdate).toBeCalledTimes(1);
    });
  });

  afterAll( async () => {
    await connection.close();
  })


  describe('remove', () => {
    it('should be called one time', async () => {
      const gameService: any = { remove: async () => { } };
      const gameController = new GamesController(gameService, connection);


      let gameServiceSpyRemove = jest.spyOn(gameService, 'remove');

      await gameController.remove(1);
      expect(gameServiceSpyRemove).toBeCalledTimes(1);
    });
  });

  afterAll( async () => {
    await connection.close();
  })

});