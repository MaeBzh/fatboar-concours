import { Repository, EntityNotFoundError, QueryFailedError, DeleteResult } from "typeorm";
import { Restaurant } from "../entities/restaurant.entity";

export class RestaurantRepositoryMock extends Repository<Restaurant> {

    database: any;
  
    constructor(database){
      super();
      this.database = database;
    }
  
    async find() {
      return this.database.restaurants;
    }
  
    async findOneOrFail(search: any) {
      let restaurant: Restaurant = this.database.restaurants.find((restaurant: Restaurant) => restaurant.id == search);
      if (restaurant) {
        return restaurant;
      }
      throw new EntityNotFoundError(Restaurant, search);
    }
  
    // async save(createDto: any): Promise<any> {
    //   const cashRegister = {
    //     id: this.database.cashRegisters[this.database.cashRegisters.length - 1].id + 1,
    //     ...createDto,
    //     winningTickets: []
    //   };
  
    //   if (!this.database.cashRegisters.some(cashRegister => cashRegister.serial === createDto.serial)) {
    //     this.database.cashRegisters.push(cashRegister);
    //     return cashRegister;
    //   } else {
    //     throw new QueryFailedError("", [], "");
    //   }
    // }
  
    // //TODO add query failed expection for email already in use
    // async update(search: any, updateDto: any): Promise<any> {
    //   const cashRegister = {
    //     ...updateDto
    //   };
    //   let cashRegisterToUpdate;
    //   if (this.database.cashRegisters.some(cashRegister => cashRegister.id === search)) {
    //     cashRegisterToUpdate = this.database.cashRegisters.findIndex(cashRegister => cashRegister.id == search);
    //     // if (!database.cashRegisters.some(cashRegister => cashRegister.serial === updateDto.serial)) { }
    //     this.database.cashRegisters[cashRegisterToUpdate] = cashRegister;
    //     return cashRegister;
    //   } else {
    //     throw new EntityNotFoundError(CashRegister, search);
    //   }
    // }
  
    // async delete(search: any): Promise<DeleteResult> {
    //   if (this.database.cashRegisters.some(cashRegister => cashRegister.id === search)) {
    //     this.database.cashRegisters.splice(search, 1);
    //     return new DeleteResult;
    //   } else {
    //     throw new EntityNotFoundError(CashRegister, search);
    //   }    
    // }
  }