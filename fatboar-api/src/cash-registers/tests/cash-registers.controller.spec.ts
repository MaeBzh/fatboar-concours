import { Connection, ConnectionOptions, createConnection, Driver } from "typeorm";
import { CashRegistersController } from "../cash-registers.controller";
import { CreateCashRegisterDto } from "../dto/create-cash-register.dto";
import { UpdateCashRegisterDto } from "../dto/update-cash-register.dto";

class ConnectionMock extends Connection {
  transaction(callback){ 
    return callback(null);
  }
}

describe('CashRegistersController', () => {
  let connection: ConnectionMock = new ConnectionMock({type: 'mysql'} as ConnectionOptions);

  describe('findAll', () => {
    it('should be called one time', async () => {
      const cashRegistersService: any = { findAll: async () => [] };
      const cashRegistersController = new CashRegistersController(cashRegistersService, connection);

      let cashRegistersServiceSpyFindAll = jest.spyOn(cashRegistersService, 'findAll');

      await cashRegistersController.findAll();
      expect(cashRegistersServiceSpyFindAll).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should be called one time', async () => {
      const cashRegistersService: any = { findOne: async () => { } };
      const cashRegistersController = new CashRegistersController(cashRegistersService, connection);

      let cashRegistersServiceSpyFindOne = jest.spyOn(cashRegistersService, 'findOne');

      await cashRegistersController.findOne(1);
      expect(cashRegistersServiceSpyFindOne).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should be called one time', async () => {
      const cashRegistersService: any = { create: async () => { } };
      const cashRegistersController = new CashRegistersController(cashRegistersService, connection);

      let cashRegistersServiceSpyCreate = jest.spyOn(cashRegistersService, 'create');

      await cashRegistersController.create(new CreateCashRegisterDto());
      expect(cashRegistersServiceSpyCreate).toBeCalledTimes(1);
    });
  });


  describe('update', () => {
    it('should be called one time', async () => {
      const cashRegistersService: any = { update: async () => { } };
      const cashRegistersController = new CashRegistersController(cashRegistersService, connection);

      let cashRegistersServiceSpyUpdate = jest.spyOn(cashRegistersService, 'update');

      await cashRegistersController.update(1, new UpdateCashRegisterDto());
      expect(cashRegistersServiceSpyUpdate).toBeCalledTimes(1);
    });
  });

  afterAll( async () => {
    await connection.close();
  })


  describe('remove', () => {
    it('should be called one time', async () => {
      const cashRegistersService: any = { remove: async () => { } };
      const cashRegistersController = new CashRegistersController(cashRegistersService, connection);

      let cashRegistersServiceSpyRemove = jest.spyOn(cashRegistersService, 'remove');

      await cashRegistersController.remove(1);
      expect(cashRegistersServiceSpyRemove).toBeCalledTimes(1);
    });
  });

  afterAll( async () => {
    await connection.close();
  })

});