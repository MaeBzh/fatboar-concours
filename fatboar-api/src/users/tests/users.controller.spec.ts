import { RequestWithUser } from "../../authentication/interfaces/request-with-user.interface";
import { Connection, createConnection, EntityManager } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UsersController } from "../users.controller";

const usersService: any = {
  findAll: async () => [],
  findOne: async () => {},
  create: async () => {},
  update: async () => {},
  remove: async () => {},
  userWithoutSecrets: (u) => u,
};

describe("UsersController", () => {
  let connection = {
    transaction: async cb => cb({} as EntityManager),
  } as Connection;

  describe("findAll", () => {
    it("should be called one time", async () => {
      const usersController = new UsersController(usersService, connection);

      let userServiceSpyFindAll = jest.spyOn(usersService, "findAll");

      await usersController.findAll();
      expect(userServiceSpyFindAll).toBeCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should be called one time", async () => {
      const usersController = new UsersController(usersService, connection);

      let userServiceSpyFindOne = jest.spyOn(usersService, "findOne");

      await usersController.findOne(1);
      expect(userServiceSpyFindOne).toBeCalledTimes(1);
    });
  });

  describe("create", () => {
    it("should be called one time", async () => {
      const usersController = new UsersController(usersService, connection);

      let userServiceSpyCreate = jest.spyOn(usersService, "create");

      await usersController.create(new CreateUserDto());
      expect(userServiceSpyCreate).toBeCalledTimes(1);
    });
  });

  describe("update", () => {
    it("should be called one time", async () => {
      const usersController = new UsersController(usersService, connection);

      let userServiceSpyUpdate = jest.spyOn(usersService, "update");

      await usersController.update(1, new UpdateUserDto(), {
        user: { id: 1 },
      } as RequestWithUser);
      expect(userServiceSpyUpdate).toBeCalledTimes(1);
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("remove", () => {
    it("should be called one time", async () => {
      const usersController = new UsersController(usersService, connection);

      let userServiceSpyRemove = jest.spyOn(usersService, "remove");

      await usersController.remove(1);
      expect(userServiceSpyRemove).toBeCalledTimes(1);
    });
  });
});
