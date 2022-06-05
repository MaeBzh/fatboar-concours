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
import { Connection, DeleteResult, EntityManager, UpdateResult } from "typeorm";
import { multerOptions, pdfFilter } from "../multerconfig";
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
    @Body()
    createGameDto: Omit<CreateGameDto, "gameRules" | "gameGifts"> & {
      gameGifts: string;
    }
  ) {
    return await this.connection.transaction(async (manager: EntityManager) => {
      // because of uploading file, data are sent as multipart,
      // so we can't received other type than string, we must JSON.parse and allow string type
      return this.gamesService.create(
        {
          ...createGameDto,
          activated: [true, "true", 1].includes(createGameDto.activated),
          gameGifts: JSON.parse(createGameDto.gameGifts),
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
  

  @Get(":id/stats")
  async getGameStats(@Param("id") id: number) {
    return await this.gamesService.getStats(id);
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
    @Body()
    updateGameDto: Omit<
      UpdateGameDto,
      "gameRules" | "gameGifts" | "jackpotGift"
    > & {
      gameGifts: string;
      jackpotGift: string;
    }
  ) {
    return await this.connection.transaction(async (manager: EntityManager) => {
      const data = gameRules
        ? {
            ...updateGameDto,
            gameRules: gameRules.filename,
            filename: gameRules.originalname,
          }
        : updateGameDto;

      // because of uploading file, data are sent as multipart,
      // so we can't received other type than string, we must JSON.parse and allow string type
      return this.gamesService.update(
        id,
        {
          ...data,
          activated: [true, "true", 1].includes(updateGameDto.activated),
          gameGifts: JSON.parse(`${updateGameDto.gameGifts}`),
          jackpotGift: JSON.parse(`${updateGameDto.jackpotGift}`),
        },
        manager
      );
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
