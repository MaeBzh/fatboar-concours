import { DeleteResult, EntityNotFoundError, QueryFailedError } from 'typeorm';
import { CashRegistersService } from '../../cash-registers/cash-registers.service';
import { CashRegisterRepositoryMock } from '../../cash-registers/tests/cash-register.repository.mock';
import { GamesService } from '../../games/games.service';
import { GameRepositoryMock } from '../../games/tests/games.repository.mock';
import { GiftsService } from '../../gifts/gifts.service';
import { GiftRepositoryMock } from '../../gifts/tests/gifts.repository.mock';
import { UserRepositoryMock } from '../../users/tests/users.repository.mock';
import { UsersService } from '../../users/users.service';
import { CreateWinningTicketDto } from '../dto/create-winning-ticket.dto';
import { UpdateWinningTicketDto } from '../dto/update-winning-ticket.dto';
import { WinningTicket } from '../entities/winning-ticket.entity';
import { WinningTicketsService } from '../winning-tickets.service';
import { WinningTicketsRepositoryMock } from './winning-tickets.repository.mock';

const database = {
  tickets: [{
    id: 1,
    number: 1234567890,
    withdrawnOn: new Date(),
    amount: 20,
    userId: 1,
    gameId: 1,
    giftId: 1,
    cashRegisterId: 1,
  },
  {
    id: 2,
    number: 9874563210,
    withdrawnOn: new Date(),
    amount: 25,
    userId: 1,
    gameId: 1,
    giftId: 1,
    cashRegisterId: 1,
  }],
  users: [{
    id: 1,
    firstname: 'Jeannot',
    lastname: 'lepoireau',
    email: 'jl@user.com',
    phone: '1234567890',
    birthYear: 1980,
    password: '@Password1234',
    newsletter: false,
    sms: false,
    zipcode: '35000',
    rgpdConsent: new Date(),
    winningTickets: []
  }],
  games: [{
    id: 1,
    name: 'Game 1',
    startsOn: new Date(2021, 6, 1),
    endsOn: new Date(2021, 8, 1),
    activated: true,
    description: "blablabla",
    gameRules: "blablabla",
    jackpotDraw: new Date(2021, 8, 15),
    rulesValidation: new Date(2021, 5, 20),
    winningTickets: Promise.resolve([])
  }],
  gifts: [{
    id: 1,
    isJackpot: false,
    name: "burger",
    photo: "jhgfds",
    winPercentage: 20,
    winningTickets: Promise.resolve([])
  }],
  cashRegisters: [{
    id: 1,
    serial: '1234',
    token: 'dbgsdgb',
    restaurantId: 1
  }]
};


describe('WinningTicketsService', () => {
  let repo: WinningTicketsRepositoryMock;
  let winningTicketsService: WinningTicketsService;
  let usersService: UsersService;
  let gamesService: GamesService;
  let giftsService: GiftsService;
  let cashRegistersService: CashRegistersService;
  let databaseClone: any


  beforeEach(async () => {
    databaseClone = { ...database };
    repo = new WinningTicketsRepositoryMock(databaseClone);
    usersService = new UsersService(new UserRepositoryMock(databaseClone));
    gamesService = new GamesService(new GameRepositoryMock(databaseClone));
    giftsService = new GiftsService(new GiftRepositoryMock(databaseClone));
    cashRegistersService = new CashRegistersService(new CashRegisterRepositoryMock(databaseClone), {} as any);
    winningTicketsService = new WinningTicketsService(repo, usersService, gamesService, giftsService, cashRegistersService);
  });

  it('should be defined', () => {
    expect(winningTicketsService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a winning ticket', async () => {
      expect(await winningTicketsService.findOne(1, {})).toBe(databaseClone.tickets[0]);
    });
  });

  describe('findOne', () => {
    it('should return a entity not found error', async () => {
      await expect(winningTicketsService.findOne(5, {}))
        .rejects
        .toThrowError(EntityNotFoundError);
    });
  });

  describe('findAll', () => {
    it('should return an array of winning tickets', async () => {
      expect(await winningTicketsService.findAll()).toBe(databaseClone.tickets);
    });
  });

  describe('create', () => {

    let createDto: CreateWinningTicketDto = {
      number: 4563217890,
      withdrawnOn: new Date(),
      amount: 30,
      userId: 1,
      gameId: 1,
      giftId: 1,
      cashRegisterId: 1
    };

    it('should return the new winning ticket', async () => {
      expect(await winningTicketsService.create(createDto)).toBe(databaseClone.tickets[2]);
    })

    it('should return a query failed error', async () => {
      await expect(winningTicketsService.create(createDto))
        .rejects
        .toThrowError(QueryFailedError);
    });
  })

  describe('update', () => {

    let updateDto: UpdateWinningTicketDto = {
      number: 1234567890,
      withdrawnOn: new Date(),
      amount: 45,
      userId: 1,
      gameId: 1,
      giftId: 1,
      cashRegisterId: 1
    };

    it('should return the new winning ticket', async () => {
      let expectedResult: WinningTicket = await repo.preload({id: 1, ...updateDto});
      let result = await winningTicketsService.update(1, updateDto);
      expect(result.generatedMaps).toStrictEqual(expectedResult);
    })

    it('should return a entity not found error', async () => {
      await expect(winningTicketsService.update(10, updateDto))
        .rejects
        .toThrowError(EntityNotFoundError);
    });

  })

  describe('remove', () => {

    it('should return a delete result', async () => {
      expect(await winningTicketsService.remove(2)).toBeInstanceOf(DeleteResult);
    });

    it('should return a entity not found error', async () => {
      await expect(winningTicketsService.remove(5))
        .rejects
        .toThrowError(EntityNotFoundError);
    });
  })
});

