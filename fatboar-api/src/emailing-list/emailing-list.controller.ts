import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { Connection, DeleteResult, EntityManager, UpdateResult } from "typeorm";
import { AdminGuard } from './../authentication/guards/admin-authentication.guard';
import { CreateEmailingListDto } from "./dto/create-emailing-list.dto";
import { UpdateEmailingListDto } from "./dto/update-emailing-list.dto";
import { EmailingListService } from "./emailing-list.service";
import { EmailingList } from "./entities/emailing-list.entity";

@Controller("emailing-lists")
@UseGuards(AdminGuard)
export class EmailingListController {
  constructor(
    private readonly emailingListService: EmailingListService,
    private readonly connection: Connection
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: "The emailing list has been successfully created.",
    type: EmailingList,
  })
  async create(@Body() createEmailingListDto: CreateEmailingListDto) {
    return await this.connection.transaction(async (manager: EntityManager) => {
      return this.emailingListService.create(createEmailingListDto, manager);
    });
  }

  @Get()
  async findAll() {
    return await this.emailingListService.findAll({ relations: ["users"] });
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return await this.emailingListService.findOne(id, { relations: ["users"] });
  }

  @Put(":id")
  @ApiCreatedResponse({
    description: "The emailing list has been successfully updated.",
    type: UpdateResult,
  })
  async update(
    @Param("id") id: number,
    @Body() updateEmailingListDto: UpdateEmailingListDto
  ) {
    return await this.connection.transaction(async (manager: EntityManager) => {
      return this.emailingListService.update(
        id,
        updateEmailingListDto,
        manager
      );
    });
  }

  @Delete(":id")
  @ApiCreatedResponse({
    description: "The emailing list has been successfully deleted.",
    type: DeleteResult,
  })
  async remove(@Param("id") id: number) {
    return await this.connection.transaction(async (manager: EntityManager) => {
      return this.emailingListService.remove(id, manager);
    });
  }
}
