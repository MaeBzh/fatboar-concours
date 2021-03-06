import { GameGift } from '../../game-gift/entities/game-gift.entity';
import {
  DeleteResult,
  EntityNotFoundError
} from "typeorm";
import { Gift } from "../../gifts/entities/gift.entity";
import { CreateGameDto } from "../dto/create-game.dto";
import { UpdateGameDto } from "../dto/update-game.dto";
import { GamesService } from "../games.service";
import { GameGiftService } from "./../../game-gift/game-gift.service";
import { WinningTicketsService } from "./../../winning-tickets/winning-tickets.service";
import { GameRepositoryMock } from "./games.repository.mock";
import { Game } from '../entities/game.entity';

const database = {
  games: [
    {
      id: 1,
      name: "Game 1",
      startsOn: new Date(2021, 6, 1),
      endsOn: new Date(2021, 8, 1),
      activated: true,
      description: "blablabla",
      gameRules: "blablabla",
      rulesValidation: new Date(2021, 5, 20),
      winningTickets: Promise.resolve([]),
    },
    {
      id: 2,
      name: "Game 2",
      startsOn: new Date(2020, 6, 1),
      endsOn: new Date(2020, 8, 1),
      activated: false,
      description: "blablabla",
      gameRules: "blablabla",
      rulesValidation: new Date(2020, 5, 20),
      winningTickets: Promise.resolve([]),
    },
  ],
};

const jackpotGift: Gift = {
  id: 1,
  name: "jackpot gift",
  photo: "photo",
  filename: "filename",
  icon: "mdi-star",
  isJackpot: true,
  winningTickets: Promise.resolve([]),
  gameGifts: [],
};

describe("GamesService", () => {
  let repo: GameRepositoryMock;
  let service: GamesService;
  const gameGiftService = {
    findByGame: async () => [],
    findByGift: async () => [],
    create: async () => {},
    removeByGame: async () => {},
  } as any;
  let ticketService: WinningTicketsService;

  beforeEach(async () => {
    repo = new GameRepositoryMock(database);
    service = new GamesService(repo, gameGiftService, ticketService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findOne", () => {
    it("should return a game", async () => {
      expect(await service.findOne(1)).toBe(database.games[0]);
    });
  });

  describe("findAll", () => {
    it("should return an array of games", async () => {
      expect(await service.findAll()).toBe(database.games);
    });
  });

  describe("create", () => {
    let createDto: CreateGameDto = {
      name: "Game 3",
      startsOn: new Date(2021, 11, 1),
      endsOn: new Date(2021, 12, 1),
      activated: false,
      description: "blablabla",
      gameRules: "blablabla",
      filename: "filename",
      tickets: 100,
      jackpotGiftId: 1,
      gameGifts: [],
    };

    it("should return the new game", async () => {
      expect(await service.create(createDto)).toBe(database.games[2]);
    });
  });

  describe("update", () => {
    let updateDto: UpdateGameDto = {
      name: "Game 1",
      startsOn: new Date(2021, 6, 1),
      endsOn: new Date(2021, 8, 1),
      activated: true,
      description: "blablabla",
      gameRules: "blablabla",
      jackpotDraw: new Date(2021, 8, 20),
      rulesValidation: new Date(2021, 5, 20),
      gameGifts: [{} as GameGift, {} as GameGift],
      jackpotGift: jackpotGift,
    };

    it("should return the new game", async () => {
      expect(await service.update(1, updateDto)).toBe(database.games[0]);
    });

    let updateDto2: UpdateGameDto = {
      name: "Game 5",
      startsOn: new Date(2021, 6, 1),
      endsOn: new Date(2021, 8, 1),
      activated: true,
      description: "blablabla",
      gameRules: "blablabla",
      jackpotDraw: new Date(2021, 8, 20),
      rulesValidation: new Date(2021, 5, 20),
      gameGifts: [],
      jackpotGift: jackpotGift,
    };
  });

  describe("remove", () => {
    it("should return a delete result", async () => {
      expect(await service.remove(2)).toBeInstanceOf(DeleteResult);
    });
  });
});
