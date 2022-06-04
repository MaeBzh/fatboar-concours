import { Connection, createConnection, EntityManager } from "typeorm";
import { CreateWinningTicketDto } from "../dto/create-winning-ticket.dto";
import { UpdateWinningTicketDto } from "../dto/update-winning-ticket.dto";
import { WinningTicketsController } from "../winning-tickets.controller";

const ticketsService: any = {
  findAll: async () => [],
  findOne: async () => {},
  create: async () => {},
  update: async () => {},
  remove: async () => {},
};

describe("WinningTicketsCon,troller", () => {
  let connection = {
    transaction: async (cb) => cb({} as EntityManager),
  } as Connection;

  describe("findAll", () => {
    it("should be called one time", async () => {
      const ticketsController = new WinningTicketsController(
        ticketsService,
        {} as any
      );

      let ticketsServiceSpyFindAll = jest.spyOn(ticketsService, "findAll");

      await ticketsController.findAll();
      expect(ticketsServiceSpyFindAll).toBeCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should be called one time", async () => {
      const ticketsController = new WinningTicketsController(
        ticketsService,
        {} as any
      );

      let ticketsServiceSpyFindOne = jest.spyOn(ticketsService, "findOne");

      await ticketsController.findOne(1);
      expect(ticketsServiceSpyFindOne).toBeCalledTimes(1);
    });
  });

  describe("create", () => {
    it("should be called one time", async () => {
      const ticketsController = new WinningTicketsController(
        ticketsService,
        connection
      );

      let ticketsServiceSpyCreate = jest.spyOn(ticketsService, "create");

      await ticketsController.create(new CreateWinningTicketDto());
      expect(ticketsServiceSpyCreate).toBeCalledTimes(1);
    });
  });

  describe("update", () => {
    it("should be called one time", async () => {
      const ticketsController = new WinningTicketsController(
        ticketsService,
        connection
      );

      let ticketsServiceSpyUpdate = jest.spyOn(ticketsService, "update");

      await ticketsController.update(1, new UpdateWinningTicketDto());
      expect(ticketsServiceSpyUpdate).toBeCalledTimes(1);
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("remove", () => {
    it("should be called one time", async () => {
      const ticketsController = new WinningTicketsController(
        ticketsService,
        connection
      );

      let ticketsServiceSpyRemove = jest.spyOn(ticketsService, "remove");

      await ticketsController.remove(1);
      expect(ticketsServiceSpyRemove).toBeCalledTimes(1);
    });
  });
});
