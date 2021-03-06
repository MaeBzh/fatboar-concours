import {
  Connection,
  ConnectionOptions,
  createConnection,
  Driver,
  EntityManager,
} from "typeorm";
import { CashRegistersController } from "../cash-registers.controller";
import { CreateCashRegisterDto } from "../dto/create-cash-register.dto";
import { UpdateCashRegisterDto } from "../dto/update-cash-register.dto";

const cashRegistersService: any = {
  findAll: async () => [],
  findOne: async () => {},
  create: async () => {},
  update: async () => {},
  remove: async () => {},
};

describe("CashRegistersController", () => {
  let connection = {
    transaction: async (cb) => cb({} as EntityManager),
  } as Connection;

  describe("findAll", () => {
    it("should be called one time", async () => {
      const cashRegistersController = new CashRegistersController(
        cashRegistersService,
        connection
      );

      let cashRegistersServiceSpyFindAll = jest.spyOn(
        cashRegistersService,
        "findAll"
      );

      await cashRegistersController.findAll();
      expect(cashRegistersServiceSpyFindAll).toBeCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should be called one time", async () => {
      const cashRegistersController = new CashRegistersController(
        cashRegistersService,
        connection
      );

      let cashRegistersServiceSpyFindOne = jest.spyOn(
        cashRegistersService,
        "findOne"
      );

      await cashRegistersController.findOne(1);
      expect(cashRegistersServiceSpyFindOne).toBeCalledTimes(1);
    });
  });

  describe("create", () => {
    it("should be called one time", async () => {
      const cashRegistersController = new CashRegistersController(
        cashRegistersService,
        connection
      );

      let cashRegistersServiceSpyCreate = jest.spyOn(
        cashRegistersService,
        "create"
      );

      await cashRegistersController.create(new CreateCashRegisterDto());
      expect(cashRegistersServiceSpyCreate).toBeCalledTimes(1);
    });
  });

  describe("update", () => {
    it("should be called one time", async () => {
      const cashRegistersController = new CashRegistersController(
        cashRegistersService,
        connection
      );

      let cashRegistersServiceSpyUpdate = jest.spyOn(
        cashRegistersService,
        "update"
      );

      await cashRegistersController.update(1, new UpdateCashRegisterDto());
      expect(cashRegistersServiceSpyUpdate).toBeCalledTimes(1);
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("remove", () => {
    it("should be called one time", async () => {
      const cashRegistersController = new CashRegistersController(
        cashRegistersService,
        connection
      );

      let cashRegistersServiceSpyRemove = jest.spyOn(
        cashRegistersService,
        "remove"
      );

      await cashRegistersController.remove(1);
      expect(cashRegistersServiceSpyRemove).toBeCalledTimes(1);
    });
  });
});
