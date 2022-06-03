import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, EntityManager, Repository } from "typeorm";
import { EmailingListService } from "../emailing-list/emailing-list.service";
import { EmailingList } from "../emailing-list/entities/emailing-list.entity";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { EmailingListUserDto } from "./dto/emailing-list-user.dto";
import { EmailingListUser } from "./entities/emailing-list-user.entity";

@Injectable()
export class EmailingListUserService {
  constructor(
    @InjectRepository(EmailingListUser)
    private emailingListUserRepo: Repository<EmailingListUser>,
    private emailingListsService: EmailingListService,
    private usersService: UsersService
  ) {}

  async create(
    emailingListDto: EmailingListUserDto,
    manager?: EntityManager
  ): Promise<EmailingListUser> {
    const user: User = await this.usersService.findOne(emailingListDto.userId);
    const emailingList: EmailingList = await this.emailingListsService.findOne(
      emailingListDto.emailingListId
    );

    const emailingListUser = new EmailingListUser();
    emailingListUser.user = user;
    emailingListUser.emailingList = emailingList;

    const repo =
      manager?.getRepository(EmailingListUser) || this.emailingListUserRepo;

    return repo.save({ userId: user.id, emailingListId: emailingList.id });
  }

  remove(id: number, manager?: EntityManager): Promise<DeleteResult> {
    const repo =
      manager?.getRepository(EmailingListUser) || this.emailingListUserRepo;
    return repo.delete(id);
  }
}
