import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { Connection, EntityManager } from "typeorm";
import { CreateTokenTypeDto } from "./dto/create-token-type.dto";
import { UpdateTokenTypeDto } from "./dto/update-token-type.dto";
import { TokenType } from "./entities/token-type.entity";
import { TokenTypesService } from "./token-types.service";

@Controller("token-types")
export class TokenTypesController {
  constructor(
    private readonly tokenTypesService: TokenTypesService,
    private readonly connection: Connection
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: "The token type has been successfully created.",
    type: TokenType,
  })
  async create(@Body() createTokenTypeDto: CreateTokenTypeDto) {
    return this.connection.transaction(async (manager: EntityManager) => {
      return this.tokenTypesService.create(createTokenTypeDto, manager);
    });
  }

  @Get()
  findAll() {
    return this.tokenTypesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.tokenTypesService.findOne(id);
  }

  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() updateTokenTypeDto: UpdateTokenTypeDto
  ) {
    return this.tokenTypesService.update(id, updateTokenTypeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.tokenTypesService.remove(id);
  }
}
