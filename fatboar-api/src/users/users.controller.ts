import { ClientGuard } from "./../authentication/guards/client-authentication.guard";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { Connection, DeleteResult, EntityManager, UpdateResult } from "typeorm";
import { AdminGuard } from "./../authentication/guards/admin-authentication.guard";
import { RequestWithUser } from "./../authentication/interfaces/request-with-user.interface";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
@UseGuards(AuthGuard())
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly connection: Connection
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiCreatedResponse({
    description: "The user has been successfully created.",
    type: User,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.connection.transaction(async (manager: EntityManager) => {
      createUserDto.sms = [true, "true", 1].includes(createUserDto.sms);
      createUserDto.newsletter = [true, "true", 1].includes(
        createUserDto.newsletter
      );
      const user = await this.usersService.create(createUserDto, manager);
      return this.usersService.userWithoutSecrets(user);
    });
  }

  @Post("employees")
  @UseGuards(AdminGuard)
  @ApiCreatedResponse({
    description: "The employee has been successfully created.",
    type: User,
  })
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.connection.transaction(async (manager: EntityManager) => {
      return this.usersService.createEmployee(createEmployeeDto, manager);
    });
  }

  @Put("/employees/:id")
  @UseGuards(AdminGuard)
  @ApiCreatedResponse({
    description: "The employee has been successfully updated.",
    type: UpdateResult,
  })
  async updateEmployee(
    @Param("id") id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Request() req: RequestWithUser
  ) {
    if (req.user.role.name === "admin") {
      return await this.connection.transaction((manager: EntityManager) => {
        return this.usersService.update(id, updateEmployeeDto, manager);
      });
    } else {
      throw new UnauthorizedException();
    }
  }

  @Get()
  @UseGuards(AdminGuard)
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => this.usersService.userWithoutSecrets(user));
  }

  @Get("employees")
  @UseGuards(AdminGuard)
  async findAllEmployees() {
    const employees = await this.usersService.findAllEmployees();
    return employees.map((employee) =>
      this.usersService.userWithoutSecrets(employee)
    );
  }

  @Get("clients")
  @UseGuards(AdminGuard)
  async findAllClients() {
    const clients = await this.usersService.findAllClients();
    return clients.map((client) =>
      this.usersService.userWithoutSecrets(client)
    );
  }

  @Get("/employees/:id")
  @UseGuards(AdminGuard)
  async findEmployee(@Param("id") id: number, @Request() req: RequestWithUser) {
    const user = await this.usersService.findOne(id, {
      relations: ["winningTickets"],
    });

    return this.usersService.userWithoutSecrets(user);
  }

  @Get("/clients/:id")
  async findClient(@Param("id") id: number, @Request() req: RequestWithUser) {
    if (req.user.id === id || req.user.role.name === "admin") {
      const user = await this.usersService.findOne(id, {
        relations: ["winningTickets"],
      });

      return this.usersService.userWithoutSecrets(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Post("email")
  async findByEmail(@Body() email: string) {
    const { password, accountToken, ...user } =
      await this.usersService.findByEmail(email);

    return user;
  }

  @Put("/clients/:id/rgpd-consent")
  @UseGuards(ClientGuard)
  @ApiCreatedResponse({
    description: "The client has been successfully updated.",
    type: UpdateResult,
  })
  async updateRgpdConsent(@Param("id") id: number) {
    return await this.connection.transaction((manager: EntityManager) => {
      return this.usersService.updateRgpdConsent(id, manager);
    });
  }

  @Put("/clients/:id")
  @ApiCreatedResponse({
    description: "The user has been successfully updated.",
    type: UpdateResult,
  })
  async update(
    @Param("id") id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: RequestWithUser
  ) {
    console.log({reqId: req.user.id, id, role: req.user.role.name})
    if (req.user.id === id || req.user.role.name === "admin") {
      return await this.connection.transaction((manager: EntityManager) => {
        updateUserDto.sms = [true, "true", 1].includes(updateUserDto.sms);
        updateUserDto.newsletter = [true, "true", 1].includes(
          updateUserDto.newsletter
        );
        return this.usersService.update(id, updateUserDto, manager);
      });
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete(["/clients/:id", "/employees/:id"])
  @UseGuards(AdminGuard)
  @ApiCreatedResponse({
    description: "The user has been successfully deleted.",
    type: DeleteResult,
  })
  async remove(@Param("id") id: number) {
    return await this.connection.transaction((manager: EntityManager) => {
      return this.usersService.remove(id, manager);
    });
  }
}
