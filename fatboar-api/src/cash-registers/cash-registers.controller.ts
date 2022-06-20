import { AdminGuard } from './../authentication/guards/admin-authentication.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { Connection, DeleteResult, EntityManager, UpdateResult } from "typeorm";
import { CashRegistersService } from "../cash-registers/cash-registers.service";
import { CreateCashRegisterDto } from "../cash-registers/dto/create-cash-register.dto";
import { UpdateCashRegisterDto } from "../cash-registers/dto/update-cash-register.dto";
import { CashRegister } from "../cash-registers/entities/cash-register.entity";

@Controller("cash-registers")
@UseGuards(AdminGuard)
export class CashRegistersController {
  constructor(
    private readonly cashRegistersService: CashRegistersService,
    private readonly connection: Connection
  ) {}

  /**
   * Insert a new occurence of cash register.
   * @param createCashRegisterDto
   * @returns A promise of the new cash register.
   */
  @Post()
  @ApiCreatedResponse({
    description: "The cash register has been successfully created.",
    type: CashRegister,
  })
  async create(
    @Body() createCashRegisterDto: CreateCashRegisterDto
  ): Promise<CashRegister> {
    return this.connection.transaction(async (manager: EntityManager) => {
      return this.cashRegistersService.create(createCashRegisterDto, manager);
    });
  }

  /**
   * Retrieve all occurences of cash registers.
   * @returns A promise of an array of cash registers.
   */
  @Get()
  async findAll(): Promise<CashRegister[]> {
    return this.cashRegistersService.findAll({
      relations: ["restaurant"],
    });
  }

  /**
   * Retrieve a cash register with specific id.
   * @param id
   * @returns A promise of the cash register.
   */
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<CashRegister> {
    return this.cashRegistersService.findOne(id, {
      relations: ["restaurant"],
    });
  }

  /**
   * Update a cash register.
   * @param id
   * @param updateCashRegisterDto
   * @returns A promise of update result.
   */
  @Put(":id")
  @ApiCreatedResponse({
    description: "The cash register has been successfully updated.",
    type: CashRegister,
  })
  update(
    @Param("id") id: number,
    @Body() updateCashRegisterDto: UpdateCashRegisterDto
  ): Promise<UpdateResult> {
    return this.connection.transaction(async (manager: EntityManager) => {
      return this.cashRegistersService.update(
        id,
        updateCashRegisterDto,
        manager
      );
    });
  }

  /**
   * Delete a cash register.
   * @param id
   * @returns A promise of delete result.
   */
  @Delete(":id")
  @ApiCreatedResponse({
    description: "The cash register has been successfully deleted.",
    type: DeleteResult,
  })
  async remove(@Param("id") id: number): Promise<DeleteResult> {
    return this.connection.transaction(async (manager: EntityManager) => {
      return this.cashRegistersService.remove(id, manager);
    });
  }
}
