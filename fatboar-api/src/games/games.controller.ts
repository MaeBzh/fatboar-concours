import { JwtGuard } from "./../authentication/guards/jwt-authentication.guard";
import { AdminGuard } from "./../authentication/guards/admin-authentication.guard";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response,
  StreamableFile,
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
  @UseGuards(AdminGuard)
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
    const createdGame = await this.connection.transaction(async (manager: EntityManager) => {
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

    // do not await winningTickets creation for performance purpose
    this.gamesService.createTickets(createdGame, +createGameDto.tickets);

    return createdGame;
  }

  @Get()
  @UseGuards(AdminGuard)
  async findAll() {
    return this.gamesService.findAll({
      relations: ["gameGifts", "gameGifts.gift", "jackpotGift"],
    });
  }

  @Get("/currentGame")
  async findCurrentGame() {
    return this.gamesService.findCurrentGame();
  }

  @Get(":id/stats")
  @UseGuards(AdminGuard)
  async getGameStats(@Param("id") id: number) {
    return this.gamesService.getStats(id);
  }

  @Get(":id/csv")
  @UseGuards(AdminGuard)
  async ticketsToCsv(
    @Param("id") id: number,
    @Response({ passthrough: true }) res
  ) {
    const file = await this.gamesService.ticketsToCsv(id);
    const date = new Date().toLocaleDateString();
    const filename = `liste-tirage-au-sort-jeu-${id}-${date}.csv`;
    res.set({
      "Content-Type": "text/csv;charset=utf-8;",
      "Content-Disposition": `attachment;filename="${filename}"`,
    });
    return new StreamableFile(file);
  }

  @Get(":id")
  @UseGuards(AdminGuard)
  async findOne(@Param("id") id: number) {
    return this.gamesService.findOne(id, {
      relations: ["gameGifts", "gameGifts.gift", "jackpotGift"],
    });
  }

  @Put(":id")
  @UseGuards(AdminGuard)
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
    return this.connection.transaction(async (manager: EntityManager) => {
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
  @UseGuards(AdminGuard)
  @ApiCreatedResponse({
    description: "The game has been successfully deleted.",
    type: DeleteResult,
  })
  async remove(@Param("id") id: number) {
    return this.connection.transaction(async (manager: EntityManager) => {
      return this.gamesService.remove(id, manager);
    });
  }
}
