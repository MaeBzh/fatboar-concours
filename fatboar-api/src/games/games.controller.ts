import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiCreatedResponse } from "@nestjs/swagger";
import { multerOptions, pdfFilter } from "src/multerconfig";
import { Connection, DeleteResult, EntityManager, UpdateResult } from "typeorm";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { Game } from "./entities/game.entity";
import { GamesService } from "./games.service";

@Controller("games")
export class GamesController {
  constructor(
    private readonly gamesService: GamesService,
    private readonly connection: Connection
  ) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileInterceptor("gameRules", {
      ...multerOptions,
      fileFilter: pdfFilter,
    })
  )
  @ApiCreatedResponse({
    description: "The game has been successfully created.",
    type: Game,
  })
  async create(
    @UploadedFile() gameRules: Express.Multer.File,
    @Body() createGameDto: Omit<CreateGameDto, "gameRules">
  ) {
    createGameDto.gameGifts = JSON.parse(`${createGameDto.gameGifts}`);
    return await this.connection.transaction(async (manager: EntityManager) => {
      createGameDto.activated = [true, "true", 1].includes(
        createGameDto.activated
      );
      return this.gamesService.create(
        {
          ...createGameDto,
          gameRules: gameRules.filename,
          filename: gameRules.originalname,
        },
        manager
      );
    });
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll() {
    return await this.gamesService.findAll({
      relations: ["gameGifts", "gameGifts.gift", "jackpotGift"],
    });
  }

  @Get("/currentGame")
  async findCurrentGame() {
    return await this.gamesService.findCurrentGame();
  }

  @Get(":id")
  @UseGuards(AuthGuard())
  async findOne(@Param("id") id: number) {
    return await this.gamesService.findOne(id, {
      relations: ["gameGifts", "gameGifts.gift", "jackpotGift"],
    });
  }

  @Put(":id")
  @UseGuards(AuthGuard())
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileInterceptor("gameRules", {
      ...multerOptions,
      fileFilter: pdfFilter,
    })
  )
  @ApiCreatedResponse({
    description: "The game has been successfully updated.",
    type: UpdateResult,
  })
  async update(
    @Param("id") id: number,
    @UploadedFile() gameRules: Express.Multer.File,
    @Body() updateGameDto: Omit<UpdateGameDto, "gameRules">
  ) {
    return await this.connection.transaction(async (manager: EntityManager) => {
      updateGameDto.gameGifts = JSON.parse(`${updateGameDto.gameGifts}`);
      updateGameDto.jackpotGift = JSON.parse(`${updateGameDto.jackpotGift}`);
      updateGameDto.activated = [true, "true", 1].includes(
        updateGameDto.activated
      );

      const data = gameRules
        ? {
            ...updateGameDto,
            gameRules: gameRules.filename,
            filename: gameRules.originalname,
          }
        : updateGameDto;

      return this.gamesService.update(id, data, manager);
    });
  }

  @Delete(":id")
  @UseGuards(AuthGuard())
  @ApiCreatedResponse({
    description: "The game has been successfully deleted.",
    type: DeleteResult,
  })
  async remove(@Param("id") id: number) {
    return await this.connection.transaction(async (manager: EntityManager) => {
      return this.gamesService.remove(id, manager);
    });
  }
}
