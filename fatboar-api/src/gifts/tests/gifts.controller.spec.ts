import { Connection, EntityManager } from "typeorm";
import { CreateGiftDto } from "../dto/create-gift.dto";
import { UpdateGiftDto } from "../dto/update-gift.dto";
import { GiftsController } from "../gifts.controller";

const giftService: any = {
  findAll: async () => [],
  findOne: async () => {},
  create: async () => {},
  update: async () => {},
  remove: async () => {},
};

describe("GiftsController", () => {
  let connection = {
    transaction: async (cb) => cb({} as EntityManager),
  } as Connection;  

  describe("findAll", () => {
    it("should be called one time", async () => {
      const giftController = new GiftsController(giftService, {} as any);

      let giftServiceSpyFindAll = jest.spyOn(giftService, "findAll");

      await giftController.findAll();
      expect(giftServiceSpyFindAll).toBeCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should be called one time", async () => {
      const giftController = new GiftsController(giftService, {} as any);

      let giftServiceSpyFindOne = jest.spyOn(giftService, "findOne");

      await giftController.findOne(1);
      expect(giftServiceSpyFindOne).toBeCalledTimes(1);
    });
  });

  describe("create", () => {
    it("should be called one time", async () => {
      const giftController = new GiftsController(giftService, connection);

      let giftServiceSpyCreate = jest.spyOn(giftService, "create");

      await giftController.create(
        {} as Express.Multer.File,
        new CreateGiftDto()
      );
      expect(giftServiceSpyCreate).toBeCalledTimes(1);
    });
  });

  describe("update", () => {
    it("should be called one time", async () => {
      const giftController = new GiftsController(giftService, connection);

      let giftServiceSpyUpdate = jest.spyOn(giftService, "update");

      await giftController.update(1, new UpdateGiftDto());
      expect(giftServiceSpyUpdate).toBeCalledTimes(1);
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("remove", () => {
    it("should be called one time", async () => {
      const giftController = new GiftsController(giftService, connection);

      let giftServiceSpyRemove = jest.spyOn(giftService, "remove");

      await giftController.remove(1);
      expect(giftServiceSpyRemove).toBeCalledTimes(1);
    });
  });
});
