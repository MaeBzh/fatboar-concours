import { Repository, EntityNotFoundError, QueryFailedError, DeleteResult } from "typeorm";
import { WinningTicket } from "../entities/winning-ticket.entity";

export class WinningTicketsRepositoryMock extends Repository<WinningTicket> {

    database: any;

    constructor(database) {
        super();
        this.database = database;
    }

    async find() {
      return this.database.tickets;
    }
  
    async findOneOrFail(search: any) {
      let tickets: WinningTicket = this.database.tickets.find((ticket: WinningTicket) => ticket.id == search);
      if (tickets) {
        return tickets;
      }
      throw new EntityNotFoundError(WinningTicket, search);
    }

    async preload(dto: any): Promise<WinningTicket> {
      let entityToUpdate: WinningTicket = await this.findOneOrFail(dto.id);
      return { ...dto, ...entityToUpdate };
  }
  
    async save(createDto: any): Promise<any> {
      const ticket = {
        id: this.database.tickets[this.database.tickets.length - 1].id + 1,
        ...createDto,
        winningTickets: []
      };
  
      if (!this.database.tickets.some(ticket => ticket.number === createDto.number)) {
        this.database.tickets.push(ticket);
        return ticket;
      } else {
        throw new QueryFailedError("", [], "");
      }
    }
  
    //TODO add query failed expection for email already in use
    async update(search: any, updateDto: any): Promise<any> {
      const ticket = {
        ...updateDto
      };
      let ticketToUpdate;
      if (this.database.tickets.some(ticket => ticket.id === search)) {
        ticketToUpdate = this.database.tickets.findIndex(ticket => ticket.id == search);
        // if (!database.cashRegisters.some(cashRegister => cashRegister.serial === updateDto.serial)) { }
        this.database.tickets[ticketToUpdate] = ticket;
        return ticket;
      } else {
        throw new EntityNotFoundError(WinningTicket, search);
      }
    }
  
    async delete(search: any): Promise<DeleteResult> {
      if (this.database.tickets.some(ticket => ticket.id === search)) {
        this.database.tickets.splice(search, 1);
        return new DeleteResult;
      } else {
        throw new EntityNotFoundError(WinningTicket, search);
      }    
    }
  }
  