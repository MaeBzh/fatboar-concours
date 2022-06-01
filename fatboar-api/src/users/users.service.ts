import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { RegisterSocialDto } from "src/authentication/dto/registerSocial.dto";
import { RolesService } from "src/roles/roles.service";
import {
  DeleteResult,
  EntityManager,
  FindOneOptions,
  Repository,
  UpdateResult,
} from "typeorm";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private roleService: RolesService
  ) {}

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findAllEmployees(): Promise<Partial<User>[]> {
    const role = await this.roleService.findEmployeeRole();
    return this.repository.find({ where: { role } });
  }

  async findAllClients(): Promise<User[]> {
    const role = await this.roleService.findClientRole();
    return this.repository.find({ where: { role } });
  }

  findOne(id: number, options?: FindOneOptions<User>): Promise<User> {
    return this.repository.findOneOrFail(id, options);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOneOrFail({
        relations: ["role"],
        where: { email },
      });
  }

  findByAccountToken(token: string): Promise<User> {
    return this.repository.findOneOrFail({
      where: { accountToken: token, isActive: false },
    });
  }

  remove(id: number, manager?: EntityManager): Promise<DeleteResult> {
    const repo = manager?.getRepository(User) || this.repository;
    return repo.delete(id);
  }

  async create(
    createUserDto: Omit<CreateUserDto, "role">,
    manager?: EntityManager
  ): Promise<User> {
    const repo = manager?.getRepository(User) || this.repository;

    const role = await this.roleService.findClientRole();

    const user = await repo.save({ ...createUserDto, role });

    return user;
  }

  async createSocialUser(
    socialUser: RegisterSocialDto,
    manager?: EntityManager
  ): Promise<User> {
    const repo = manager?.getRepository(User) || this.repository;

    const role = await this.roleService.findClientRole();

    // we must have a hashed password in database
    const password = Math.random().toString(36).substr(2, 8);
    const salt = await bcrypt.genSalt();
    const hashPwd = await bcrypt.hash(password, salt);

    const user = await repo.save({
      ...socialUser,
      password: hashPwd,
      role,
      isActive: true,
    });
    return user;
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
    manager?: EntityManager
  ): Promise<User> {
    const repo = manager?.getRepository(User) || this.repository;

    // we create a generate password that will be send to the employee.
    const password = Math.random().toString(36).substr(2, 8);
    //send the decrypted password to the employee
    const salt = await bcrypt.genSalt();
    const hashPwd = await bcrypt.hash(password, salt);

    const role = await this.roleService.findEmployeeRole();

    const user = await repo.save({
      ...createEmployeeDto,
      password: hashPwd,
      role,
    });

    return user;
  }

  update(
    id: number,
    updateUserDto: UpdateUserDto,
    manager?: EntityManager
  ): Promise<UpdateResult> {
    const repo = manager?.getRepository(User) || this.repository;
    return repo.update(id, updateUserDto);
  }

  updateRgpdConsent(
    id: number,
    manager?: EntityManager
  ): Promise<UpdateResult> {
    const repo = manager?.getRepository(User) || this.repository;
    return repo.update(id, { rgpdConsent: new Date(Date.now()) });
  }
}
