import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, EntityManager, Repository, UpdateResult } from "typeorm";
import { CreateGiftDto } from "./dto/create-gift.dto";
import { UpdateGiftDto } from "./dto/update-gift.dto";
import { Gift } from "./entities/gift.entity";

@Injectable()
export class GiftsService {
  constructor(
    @InjectRepository(Gift)
    private giftRepo: Repository<Gift>
  ) {}

  create(createGiftDto: CreateGiftDto, manager?: EntityManager): Promise<Gift> {
    const repo = manager?.getRepository(Gift) || this.giftRepo;
    return repo.save(createGiftDto);
  }

  findAll(): Promise<Gift[]> {
    return this.giftRepo.find();
  }

  findOne(id: number): Promise<Gift> {
    return this.giftRepo.findOneOrFail(id);
  }

  update(
    id: number,
    updateGiftDto: UpdateGiftDto,
    manager?: EntityManager
  ): Promise<UpdateResult> {
    const repo = manager?.getRepository(Gift) || this.giftRepo;
    return repo.update(id, { ...updateGiftDto, id });
  }

  remove(id: number, manager?: EntityManager): Promise<DeleteResult> {
    const repo = manager?.getRepository(Gift) || this.giftRepo;
    return repo.delete(id);
  }
}
