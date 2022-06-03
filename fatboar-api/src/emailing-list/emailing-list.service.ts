import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
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
    private emailingRepo: Repository<EmailingList>,
    private usersService: UsersService
  ) {}

  async create(
    createEmailingListDto: CreateEmailingListDto,
    manager?: EntityManager
  ): Promise<EmailingList> {
    const users: User[] = await Promise.all(
      createEmailingListDto.userIds.map(async (id) => {
        return await this.usersService.findOne(id);
      })
    );
    const repo = manager?.getRepository(EmailingList) || this.emailingRepo;
    let emailingList = new EmailingList();
    emailingList.name = createEmailingListDto.name;
    emailingList.users = users;
    emailingList.filters = createEmailingListDto.filters;
    return repo.save(emailingList);
  }

  findAll(options?: FindManyOptions): Promise<EmailingList[]> {
    return this.emailingRepo.find(options);
  }

  findOne(id: number, options?: FindOneOptions): Promise<EmailingList> {
    return this.emailingRepo.findOneOrFail(id, options);
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
