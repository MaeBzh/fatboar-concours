import { Connection, createConnection } from "typeorm";
import { CreateWinningTicketDto } from "../dto/create-winning-ticket.dto";
import { UpdateWinningTicketDto } from "../dto/update-winning-ticket.dto";
import { WinningTicketsController } from "../winning-tickets.controller";

describe('WinningTicketsController', () => {
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
      const ticketsService: any = { findAll: async () => [] };
      const ticketsController = new WinningTicketsController(ticketsService, {} as any);

      let ticketsServiceSpyFindAll = jest.spyOn(ticketsService, 'findAll');

      await ticketsController.findAll();
      expect(ticketsServiceSpyFindAll).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should be called one time', async () => {
      const ticketsService: any = { findOne: async () => { } };
      const ticketsController = new WinningTicketsController(ticketsService, {} as any);

      let ticketsServiceSpyFindOne = jest.spyOn(ticketsService, 'findOne');

      await ticketsController.findOne(1);
      expect(ticketsServiceSpyFindOne).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should be called one time', async () => {
      const ticketsService: any = { create: async () => { } };
      const ticketsController = new WinningTicketsController(ticketsService, connection);


      let ticketsServiceSpyCreate = jest.spyOn(ticketsService, 'create');

      await ticketsController.create(new CreateWinningTicketDto());
      expect(ticketsServiceSpyCreate).toBeCalledTimes(1);
    });
  });


  describe('update', () => {
    it('should be called one time', async () => {
      const ticketsService: any = { update: async () => { } };
      const ticketsController = new WinningTicketsController(ticketsService, connection);


      let ticketsServiceSpyUpdate = jest.spyOn(ticketsService, 'update');

      await ticketsController.update(1, new UpdateWinningTicketDto());
      expect(ticketsServiceSpyUpdate).toBeCalledTimes(1);
    });
  });

  afterAll( async () => {
    await connection.close();
  })


  describe('remove', () => {
    it('should be called one time', async () => {
      const ticketsService: any = { remove: async () => { } };
      const ticketsController = new WinningTicketsController(ticketsService, connection);


      let ticketsServiceSpyRemove = jest.spyOn(ticketsService, 'remove');

      await ticketsController.remove(1);
      expect(ticketsServiceSpyRemove).toBeCalledTimes(1);
    });
  });

  afterAll( async () => {
    await connection.close();
  })

});