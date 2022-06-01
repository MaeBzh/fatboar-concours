import { Repository, EntityNotFoundError, QueryFailedError, DeleteResult } from "typeorm";
import { EmailingList } from "../entities/emailing-list.entity";

export class EmailingListRepositoryMock extends Repository<EmailingList> {

    database: any;

    constructor(database) {
        super();
        this.database = database;
    }

    async find() {
      return this.database.emailingLists;
    }
  
    async findOneOrFail(search: any) {
      let list: EmailingList = this.database.emailingLists.find((list: EmailingList) => list.id == search);
      if (list) {
        return list;
      }
      throw new EntityNotFoundError(EmailingList, search);
    }
  
    async save(createDto: any): Promise<any> {
      const list = {
        id: this.database.emailingLists[this.database.emailingLists.length - 1].id + 1,
        ...createDto,
        winningTickets: []
      };
  
      if (!this.database.emailingLists.some(list => list.name === createDto.name)) {
        this.database.emailingLists.push(list);
        return list;
      } else {
        throw new QueryFailedError("", [], "");
      }
    }
  
    //TODO add query failed expection for email already in use
    async update(search: any, updateDto: any): Promise<any> {
      const list = {
        ...updateDto
      };
      let listToUpdate;
      if (this.database.emailingLists.some(list => list.id === search)) {
        listToUpdate = this.database.emailingLists.findIndex(list => list.id == search);
        // if (!database.emailingLists.some(list => list.name === updateDto.name)) { }
        this.database.emailingLists[listToUpdate] = list;
        return list;
      } else {
        throw new EntityNotFoundError(EmailingList, search);
      }
    }
  
    async delete(search: any): Promise<DeleteResult> {
      if (this.database.emailingLists.some(list => list.id === search)) {
        this.database.emailingLists.splice(search, 1);
        return new DeleteResult;
      } else {
        throw new EntityNotFoundError(EmailingList, search);
      }    
    }
  }