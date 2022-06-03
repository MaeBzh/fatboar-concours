import { Gift } from 'src/gifts/entities/gift.entity';
import { Connection, EntityManager } from "typeorm";
import { GamesController } from "../games.controller";

const gameService: any = {
  findAll: async () => [],
  findOne: async () => {},
  create: async () => {},
  update: async () => {},
  remove: async () => {},
};

const newGame = {
  name: "Game 2",
  startsOn: new Date(2020, 6, 1),
  endsOn: new Date(2020, 8, 1),
  activated: false,
  description: "blablabla",
  gameGifts: JSON.stringify([{gift: {} as Gift, winPercentage: 20}]),
  filename: "filename",
  tickets: 100,
  jackpotGiftId: 1,
};

const updatedGame = {
  name: "Game 2",
  startsOn: new Date(2020, 6, 1),
  endsOn: new Date(2020, 8, 1),
  activated: false,
  description: "blablabla",
  rulesValidation: new Date(2020, 5, 20),
  winningTickets: [],
  gameGifts: JSON.stringify([{gift: {} as Gift, winPercentage: 20}]),
  filename: "filename",
  jackpotGift: JSON.stringify({} as Gift),
};

describe("GameController", () => {
  let connection = {
    transaction: async (cb) => cb({} as EntityManager),
  } as Connection;

  describe("findAll", () => {
    it("should be called one time", async () => {
      const gameController = new GamesController(gameService, {} as any);

      let gameServiceSpyFindAll = jest.spyOn(gameService, "findAll");

      await gameController.findAll();
      expect(gameServiceSpyFindAll).toBeCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should be called one time", async () => {
      const gameController = new GamesController(gameService, {} as any);

      let gameServiceSpyFindOne = jest.spyOn(gameService, "findOne");

      await gameController.findOne(1);
      expect(gameServiceSpyFindOne).toBeCalledTimes(1);
    });
  });

  describe("create", () => {
    it("should be called one time", async () => {
      const gameController = new GamesController(gameService, connection);

      let gameServiceSpyCreate = jest.spyOn(gameService, "create");

      await gameController.create({} as Express.Multer.File, newGame);
      expect(gameServiceSpyCreate).toBeCalledTimes(1);
    });
  });

  describe("update", () => {
    it("should be called one time", async () => {
      const gameController = new GamesController(gameService, connection);

      let gameServiceSpyUpdate = jest.spyOn(gameService, "update");

      await gameController.update(1, {} as Express.Multer.File, updatedGame);
      expect(gameServiceSpyUpdate).toBeCalledTimes(1);
    });
  });

  describe("remove", () => {
    it("should be called one time", async () => {
      const gameController = new GamesController(gameService, connection);

      let gameServiceSpyRemove = jest.spyOn(gameService, "remove");

      await gameController.remove(1);
      expect(gameServiceSpyRemove).toBeCalledTimes(1);
    });
  });
});
