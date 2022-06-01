import { RestaurantsService } from '../../restaurants/restaurants.service';
import { RestaurantRepositoryMock } from '../../restaurants/tests/restaurant.repository.mock';
import { DeepPartial, DeleteResult, EntityNotFoundError, QueryFailedError, UpdateResult } from 'typeorm';
import { CashRegistersService } from '../cash-registers.service';
import { CreateCashRegisterDto } from '../dto/create-cash-register.dto';
import { UpdateCashRegisterDto } from '../dto/update-cash-register.dto';
import { CashRegister } from '../entities/cash-register.entity';
import { CashRegisterRepositoryMock } from './cash-register.repository.mock';

const database = {
  cashRegisters: [{
    id: 1,
    serial: '1234',
    token: 'dbgsdgb',
    restaurantId: 1
  },
  {
    id: 2,
    serial: '4567',
    token: 'sgtfhyygfuj',
    restaurantId: 1
  }],
  restaurants: [{
    id: 1,
    name: "fatboar",
    city: "Rennes"
  }]
};

describe('CashRegistersService', () => {
  let repo: CashRegisterRepositoryMock;
  let cashRegisterService: CashRegistersService;
  let restaurantService: RestaurantsService;
  let databaseClone: any;


  beforeEach(async () => {
    databaseClone = { ...database };
    repo = new CashRegisterRepositoryMock(databaseClone);
    restaurantService = new RestaurantsService(new RestaurantRepositoryMock(databaseClone));
    cashRegisterService = new CashRegistersService(repo, restaurantService);
  });

  it('should be defined', () => {
    expect(cashRegisterService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a cash register', async () => {
      expect(await cashRegisterService.findOne(1)).toBe(databaseClone.cashRegisters[0]);
    });
  });

  describe('findOne', () => {
    it('should return a entity not found error', async () => {
      await expect(cashRegisterService.findOne(5))
        .rejects
        .toThrowError(EntityNotFoundError);
    });
  });

  describe('findAll', () => {
    it('should return an array of cash registers', async () => {
      expect(await cashRegisterService.findAll()).toBe(databaseClone.cashRegisters);
    });
  });

  describe('create', () => {

    let createDto: CreateCashRegisterDto = {
      serial: '1478',
      token: 'sdfgh',
      restaurantId: 1
    };

    it('should return the new cash register', async () => {
      expect(await cashRegisterService.create(createDto)).toBe(databaseClone.cashRegisters[2]);
    })

    it('should return a query failed error', async () => {
      await expect(cashRegisterService.create(createDto))
        .rejects
        .toThrowError(QueryFailedError);
    });
  })

  describe('update', () => {

    let updateDto: UpdateCashRegisterDto = {
      serial: '1234'
    };

    it('should return an update result', async () => {
      let expectedResult: CashRegister = await repo.preload({id: 1, ...updateDto});
 let result = await cashRegisterService.update(1, updateDto);
      expect(result.generatedMaps).toStrictEqual(expectedResult);
    })

    it('should return a entity not found error', async () => {
      await expect(cashRegisterService.update(10, updateDto))
        .rejects
        .toThrowError(EntityNotFoundError);
    });

  })

  describe('remove', () => {

    it('should return a delete result', async () => {
      expect(await cashRegisterService.remove(2)).toBeInstanceOf(DeleteResult);
    });

    it('should return a entity not found error', async () => {
      await expect(cashRegisterService.remove(5))
        .rejects
        .toThrowError(EntityNotFoundError);
    });
  })
});

