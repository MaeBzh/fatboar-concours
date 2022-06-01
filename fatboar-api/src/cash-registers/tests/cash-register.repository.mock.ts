import { Repository, EntityNotFoundError, QueryFailedError, DeleteResult, UpdateResult } from "typeorm";
import { CashRegister } from "../entities/cash-register.entity";

export class CashRegisterRepositoryMock extends Repository<CashRegister> {

    database: any;

    constructor(database) {
        super();
        this.database = database;
    }

    async find() {
        return this.database.cashRegisters;
    }

    async findOneOrFail(search: any) {
        let cashRegister: CashRegister = this.database.cashRegisters.find((cashRegister: CashRegister) => cashRegister.id == search);
        if (cashRegister) {
            return cashRegister;
        }
        throw new EntityNotFoundError(CashRegister, search);
    }

    async save(dto: any): Promise<any> {
        let cashRegister: any;

        cashRegister = {
            id: this.database.cashRegisters[this.database.cashRegisters.length - 1].id + 1,
            ...dto,
            winningTickets: []
        };

        if (!this.database.cashRegisters.some(cashRegister => cashRegister.serial === dto.serial)) {
            this.database.cashRegisters.push(cashRegister);
            return cashRegister;
        } else {
            throw new QueryFailedError("", [], "");
        }
    }

    async preload(dto: any): Promise<CashRegister> {
        let entityToUpdate: CashRegister = await this.findOneOrFail(dto.id);
        return { ...dto, ...entityToUpdate };
    }

    //TODO add query failed expection for email already in use
    async update(search: any, updateDto: any): Promise<any> {
        const cashRegister = {
            ...updateDto
        };
        let cashRegisterToUpdate;
        if (this.database.cashRegisters.some(cashRegister => cashRegister.id === search)) {
            cashRegisterToUpdate = this.database.cashRegisters.findIndex(cashRegister => cashRegister.id == search);
            // if (!database.cashRegisters.some(cashRegister => cashRegister.serial === updateDto.serial)) { }        
            this.database.cashRegisters[cashRegisterToUpdate] = cashRegister;
            let result: UpdateResult = new UpdateResult();
            result.generatedMaps = cashRegister;
            return result;
        } else {
            throw new EntityNotFoundError(CashRegister, search);
        }
    }

    async delete(search: any): Promise<DeleteResult> {
        if (this.database.cashRegisters.some(cashRegister => cashRegister.id === search)) {
            this.database.cashRegisters.splice(search, 1);
            return new DeleteResult;
        } else {
            throw new EntityNotFoundError(CashRegister, search);
        }
    }
}