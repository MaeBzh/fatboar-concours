import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  DeepPartial,
  DeleteResult,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from "typeorm";
import { CreateCashRegisterDto } from "../cash-registers/dto/create-cash-register.dto";
import { UpdateCashRegisterDto } from "../cash-registers/dto/update-cash-register.dto";
import { CashRegister } from "../cash-registers/entities/cash-register.entity";
import { Restaurant } from "../restaurants/entities/restaurant.entity";
import { RestaurantsService } from "../restaurants/restaurants.service";

@Injectable()
export class CashRegistersService {
  constructor(
    @InjectRepository(CashRegister)
    private cashRegistersRepo: Repository<CashRegister>,
    private restaurantService: RestaurantsService
  ) {}

  async create(
    createCashRegisterDto: CreateCashRegisterDto,
    manager?: EntityManager
  ): Promise<CashRegister> {
    const restaurant: Restaurant = await this.restaurantService.findOne(
      createCashRegisterDto.restaurantId
    );

    const cashRegister: CashRegister = new CashRegister();
    cashRegister.serial = createCashRegisterDto.serial;
    cashRegister.token = createCashRegisterDto.token;
    cashRegister.restaurant = restaurant;

    const repo = manager?.getRepository(CashRegister) || this.cashRegistersRepo;

    return repo.save(cashRegister);
  }

  /**
   * Find all the cash registers in database.
   * @returns A promise of an array of cash registers.
   */
  findAll(options?: FindManyOptions<CashRegister>): Promise<CashRegister[]> {
    return this.cashRegistersRepo.find(options);
  }

  /**
   * Find one cash register with specific id in database.
   * @param id
   * @param options
   * @returns A promise of the cash register.
   */
  findOne(
    id: number,
    options?: FindOneOptions<CashRegister>
  ): Promise<CashRegister> {
    return this.cashRegistersRepo.findOneOrFail(id, options);
  }

  /**
   * Find one cash register with specific token in database.
   * @param token
   * @returns A promise of the cash register.
   */
  findByToken(token: string): Promise<CashRegister> {
    return this.cashRegistersRepo.findOneOrFail({
      where: { token },
    });
  }

  /**
   * Update a cash register.
   * @param id
   * @param updateCashRegisterDto
   * @param manager
   * @returns A promise of the updated cash register.
   */
  async update(
    id: number,
    updateCashRegisterDto: UpdateCashRegisterDto,
    manager?: EntityManager
  ): Promise<UpdateResult> {
    let { restaurantId, ...data } = updateCashRegisterDto;
    const cashRegister: DeepPartial<CashRegister> = { id: +id, ...data };

    if (updateCashRegisterDto.restaurantId) {
      const restaurant: Restaurant = await this.restaurantService.findOne(
        updateCashRegisterDto.restaurantId
      );
      cashRegister["restaurant"] = restaurant;
    }

    const repo = manager?.getRepository(CashRegister) || this.cashRegistersRepo;
    const result = repo.update(id, await repo.preload(cashRegister));
    return result;
  }

  /**
   * Remove a cash register from database.
   * @param id
   * @param manager
   * @returns A promise of delete result
   */
  remove(id: number, manager?: EntityManager): Promise<DeleteResult> {
    const repo = manager?.getRepository(CashRegister) || this.cashRegistersRepo;
    return repo.delete(id);
  }
}
