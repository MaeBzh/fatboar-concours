import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  DeleteResult,
  EntityManager,
  FindOneOptions,
  Repository,
  UpdateResult,
  FindManyOptions,
} from "typeorm";
import { CreateEmailingListDto } from "./dto/create-emailing-list.dto";
import { UpdateEmailingListDto } from "./dto/update-emailing-list.dto";
import { EmailingList } from "./entities/emailing-list.entity";

@Injectable()
export class EmailingListService {
  constructor(
    @InjectRepository(EmailingList)
    private emailingRepo: Repository<EmailingList>
  ) {}

  async create(
    createEmailingListDto: CreateEmailingListDto,
    manager?: EntityManager
  ): Promise<EmailingList> {
    const emailingListRepo =
      manager?.getRepository(EmailingList) || this.emailingRepo;

    const { name, filters, userIds } = createEmailingListDto;

    return emailingListRepo.save({
      name,
      filters,
      users: userIds.map((id) => ({ id })),
    });
  }

  findAll(options?: FindManyOptions): Promise<EmailingList[]> {
    return this.emailingRepo.find(options);
  }

  findOne(id: number, options?: FindOneOptions, manager?: EntityManager): Promise<EmailingList> {
    const emailingListRepo =
      manager?.getRepository(EmailingList) || this.emailingRepo;
    
    return emailingListRepo.findOneOrFail(id, options);
  }

  update(
    id: number,
    updateEmailingListDto: UpdateEmailingListDto,
    manager?: EntityManager
  ): Promise<UpdateResult> {
    const repo = manager?.getRepository(EmailingList) || this.emailingRepo;
    return repo.update(id, updateEmailingListDto);
  }

  remove(id: number, manager?: EntityManager): Promise<DeleteResult> {
    const repo = manager?.getRepository(EmailingList) || this.emailingRepo;
    return repo.delete(id);
  }
}
