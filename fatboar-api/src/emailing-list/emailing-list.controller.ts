import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { Connection, DeleteResult, EntityManager, UpdateResult } from "typeorm";
import { AdminGuard } from "./../authentication/guards/admin-authentication.guard";
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
    return this.connection.transaction(async (manager: EntityManager) => {
      const emailingList = await this.emailingListService.create(
        createEmailingListDto,
        manager
      );

      return this.emailingListService.findOne(emailingList.id, {
        relations: ["users"],
      }, manager);
    });
  }

  @Get()
  async findAll() {
    return this.emailingListService.findAll({ relations: ["users"] });
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.emailingListService.findOne(id, { relations: ["users"] });
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
    return this.connection.transaction(async (manager: EntityManager) => {
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
    return this.connection.transaction(async (manager: EntityManager) => {
      return this.emailingListService.remove(id, manager);
    });
  }
}
