import { Connection, createConnection, EntityManager } from "typeorm";
import { CreateEmailingListDto } from "../dto/create-emailing-list.dto";
import { UpdateEmailingListDto } from "../dto/update-emailing-list.dto";
import { EmailingListController } from "../emailing-list.controller";

describe("EmailingListController", () => {
  let connection = {
    transaction: async (cb) => cb({} as EntityManager),
  } as Connection;

  describe("findAll", () => {
    it("should be called one time", async () => {
      const emailingListService: any = { findAll: async () => [] };
      const emailingListController = new EmailingListController(
        emailingListService,
        {} as any
      );

      let emailingListServiceSpyFindAll = jest.spyOn(
        emailingListService,
        "findAll"
      );

      await emailingListController.findAll();
      expect(emailingListServiceSpyFindAll).toBeCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should be called one time", async () => {
      const emailingListService: any = { findOne: async () => {} };
      const emailingListController = new EmailingListController(
        emailingListService,
        {} as any
      );

      let emailingListServiceSpyFindOne = jest.spyOn(
        emailingListService,
        "findOne"
      );

      await emailingListController.findOne(1);
      expect(emailingListServiceSpyFindOne).toBeCalledTimes(1);
    });
  });

  describe("create", () => {
    it("should be called one time", async () => {
      const emailingListService: any = { create: async () => ({id: 1}), findOne: async (id) => ({id}) };
      const emailingListController = new EmailingListController(
        emailingListService,
        connection
      );

      let emailingListServiceSpyCreate = jest.spyOn(
        emailingListService,
        "create"
      );

      await emailingListController.create(new CreateEmailingListDto());
      expect(emailingListServiceSpyCreate).toBeCalledTimes(1);
    });
  });

  describe("update", () => {
    it("should be called one time", async () => {
      const emailingListService: any = { update: async () => {} };
      const emailingListController = new EmailingListController(
        emailingListService,
        connection
      );

      let emailingListServiceSpyUpdate = jest.spyOn(
        emailingListService,
        "update"
      );

      await emailingListController.update(1, new UpdateEmailingListDto());
      expect(emailingListServiceSpyUpdate).toBeCalledTimes(1);
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("remove", () => {
    it("should be called one time", async () => {
      const emailingListService: any = { remove: async () => {} };
      const emailingListController = new EmailingListController(
        emailingListService,
        connection
      );

      let emailingListServiceSpyRemove = jest.spyOn(
        emailingListService,
        "remove"
      );

      await emailingListController.remove(1);
      expect(emailingListServiceSpyRemove).toBeCalledTimes(1);
    });
  });

  afterAll(async () => {
    await connection.close();
  });
});
