import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    FindOneOptions,
    Repository
} from "typeorm";
import { Role } from "./entities/role.entity";
import RoleNames from "./role-names";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepo: Repository<Role>
  ) {}

  findAll(): Promise<Role[]> {
    return this.rolesRepo.find();
  }

  async findOne(id: number, options?: FindOneOptions<Role>): Promise<Role> {
    return this.rolesRepo.findOneOrFail(id, options);
  }  

  async findAdminRole(): Promise<Role> {
    return this.rolesRepo.findOneOrFail({where : {name: RoleNames.ADMIN }});
  }  

  async findClientRole(): Promise<Role> {
    return this.rolesRepo.findOneOrFail({where : {name: RoleNames.CLIENT }});
  } 

  async findEmployeeRole(): Promise<Role> {
    return this.rolesRepo.findOneOrFail({where : {name: RoleNames.EMPLOYEE }});
  } 
}
