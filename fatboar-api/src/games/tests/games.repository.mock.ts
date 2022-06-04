import { Repository, EntityNotFoundError, DeleteResult } from "typeorm";
import { Game } from "../entities/game.entity";

export class GameRepositoryMock extends Repository<Game> {

    database: any;

    constructor(database) {
        super();
        this.database = database;
    }

    async find() {
      return this.database.games;
    }
  
    async findOneOrFail(search: any) {
      let game: Game = this.database.games.find((game: Game) => game.id == search);
      if (game) {
        return game;
      }
      throw new EntityNotFoundError(Game, search);
    }
  
    async save(createDto: any): Promise<any> {
      const game = {
        id: this.database.games[this.database.games.length - 1].id + 1,
        ...createDto,
        winningTickets: []
      };
      this.database.games.push(game);
  
      return game;
    }
  
    //TODO add query failed exception for email already in use
    async update(search: any, updateDto: any): Promise<any> {
      let index = this.database.games.findIndex(game => game.id == search);
      if (index >= 0) {
        return this.database.games[index] = {...updateDto};
      } else {
        throw new EntityNotFoundError(Game, search);
      }
    }
  
    async delete(search: any): Promise<DeleteResult> {
      if (this.database.games.some(game => game.id === search)) {
        this.database.games.splice(search, 1);
        return new DeleteResult;
      } else {
        throw new EntityNotFoundError(Game, search);
      }
    }
  }