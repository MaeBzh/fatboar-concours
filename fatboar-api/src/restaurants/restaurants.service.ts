import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, EntityManager, Repository, UpdateResult } from "typeorm";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantsRepo: Repository<Restaurant>
  ) {}

  create(
    createRestaurantDto: CreateRestaurantDto,
    manager?: EntityManager
  ): Promise<Restaurant> {
    const repo = manager?.getRepository(Restaurant) || this.restaurantsRepo;
    return repo.save(createRestaurantDto);
  }

  findAll(): Promise<Restaurant[]> {
    return this.restaurantsRepo.find();
  }

  findOne(id: number): Promise<Restaurant> {
    return this.restaurantsRepo.findOneOrFail(id);
  }

  update(
    id: number,
    updateRestaurantDto: UpdateRestaurantDto,
    manager?: EntityManager
  ): Promise<UpdateResult> {
    const repo = manager?.getRepository(Restaurant) || this.restaurantsRepo;
    return repo.update(id, updateRestaurantDto);
  }

  remove(id: number, manager?: EntityManager): Promise<DeleteResult> {
    const repo = manager?.getRepository(Restaurant) || this.restaurantsRepo;
    return repo.delete(id);
  }
}
