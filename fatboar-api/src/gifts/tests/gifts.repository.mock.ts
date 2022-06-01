import { Repository, EntityNotFoundError, DeleteResult } from "typeorm";
import { Gift } from "../entities/gift.entity";

export class GiftRepositoryMock extends Repository<Gift> {

    database: any;

    constructor(database) {
        super();
        this.database = database;
    }

    async find() {
      return this.database.gifts;
    }
  
    async findOneOrFail(search: any) {
      let gift: Gift = this.database.gifts.find((gift: Gift) => gift.id == search);
      if (gift) {
        return gift;
      }
      throw new EntityNotFoundError(Gift, search);
    }
  
    async save(createDto: any): Promise<any> {
      const gift = {
        id: this.database.gifts[this.database.gifts.length - 1].id + 1,
        ...createDto,
        winningTickets: []
      };
      this.database.gifts.push(gift);
  
      return gift;
    }
  
    //TODO add query failed expection for email already in use
    async update(search: any, updateDto: any): Promise<any> {
      let index = this.database.gifts.findIndex(gift => gift.id == search);
      if (index >= 0) {
        return this.database.gifts[index] = {...updateDto};
      } else {
        throw new EntityNotFoundError(Gift, search);
      }
    }
  
    async delete(search: any): Promise<DeleteResult> {
      if (this.database.gifts.some(gift => gift.id === search)) {
        this.database.gifts.splice(search, 1);
        return new DeleteResult;
      } else {
        throw new EntityNotFoundError(Gift, search);
      }
    }
  }
  