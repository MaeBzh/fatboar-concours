import { Repository, EntityNotFoundError, QueryFailedError, DeleteResult } from "typeorm";
import { User } from "../entities/user.entity";

export class UserRepositoryMock extends Repository<User> {

    database: any;

    constructor(database) {
        super();
        this.database = database;
    }

    async find() {
      return this.database.users;
    }
  
    async findOneOrFail(search: any) {
      let user: User = this.database.users.find((user: User) => user.id == search);
      if (user) {
        return user;
      }
      throw new EntityNotFoundError(User, search);
    }
  
    async save(createDto: any): Promise<any> {
      const user = {
        id: this.database.users[this.database.users.length - 1].id + 1,
        ...createDto,
        winningTickets: []
      };
  
      if (!this.database.users.some(user => user.email === createDto.email)) {
        this.database.users.push(user);
        return user;
      } else {
        throw new QueryFailedError("", [], "");
      }
    }
  
    //TODO add query failed expection for email already in use
    async update(search: any, updateDto: any): Promise<any> {
      const user = {
        ...updateDto
      };
      let userToUpdate;
      if (this.database.users.some(user => user.id === search)) {
        userToUpdate = this.database.users.findIndex(user => user.id == search);
        if (!this.database.users.some(user => user.email === updateDto.email)) { }
        this.database.users[userToUpdate] = user;
        return user;
      } else {
        throw new EntityNotFoundError(User, search);
      }
    }
  
    async delete(search: any): Promise<DeleteResult> {
      if (this.database.users.some(user => user.id === search)) {
        this.database.users.splice(search, 1);
        return new DeleteResult;
      } else {
        throw new EntityNotFoundError(User, search);
      }    
    }
  }
  