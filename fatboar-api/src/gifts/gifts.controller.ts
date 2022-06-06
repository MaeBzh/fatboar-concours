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
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiCreatedResponse } from "@nestjs/swagger";
import { AdminGuard } from "src/authentication/guards/admin-authentication.guard";
import { Connection, DeleteResult, EntityManager, UpdateResult } from "typeorm";
import { imageFilter, multerOptions } from "../multerconfig";
import { CreateGiftDto } from "./dto/create-gift.dto";
import { UpdateGiftDto } from "./dto/update-gift.dto";
import { Gift } from "./entities/gift.entity";
import { GiftsService } from "./gifts.service";

@Controller("gifts")
@UseGuards(AdminGuard)
export class GiftsController {
  constructor(
    private readonly giftsService: GiftsService,
    private readonly connection: Connection
  ) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileInterceptor("photo", {
      ...multerOptions,
      fileFilter: imageFilter,
    })
  )
  @ApiCreatedResponse({
    description: "The gift has been successfully created.",
    type: Gift,
  })
  async create(
    @UploadedFile() photo: Express.Multer.File,
    @Body() createdGiftDto: Omit<CreateGiftDto, "photo">
  ) {
    return await this.connection.transaction(async (manager: EntityManager) => {
      createdGiftDto.isJackpot = [true, "true", 1].includes(
        createdGiftDto.isJackpot
      );
      return this.giftsService.create(
        {
          ...createdGiftDto,
          photo: photo.filename,
          filename: photo.originalname,
        },
        manager
      );
    });
  }

  @Get()
  async findAll() {
    return await this.giftsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return await this.giftsService.findOne(id);
  }

  @Put(":id")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileInterceptor("photo", {
      ...multerOptions,
      fileFilter: imageFilter,
    })
  )
  @ApiCreatedResponse({
    description: "The gift has been successfully updated.",
    type: UpdateResult,
  })
  async update(
    @Param("id") id: number,
    @Body() updateGiftDto: Omit<UpdateGiftDto, "photo">,
    @UploadedFile() photo?: Express.Multer.File
  ) {
    return await this.connection.transaction(async (manager: EntityManager) => {
      const data = photo
        ? {
            ...updateGiftDto,
            photo: photo.filename,
            filename: photo.originalname,
          }
        : updateGiftDto;
      data.isJackpot = [true, "true", 1].includes(data.isJackpot);
      return this.giftsService.update(id, data, manager);
    });
  }

  @Delete(":id")
  @ApiCreatedResponse({
    description: "The gift has been successfully deleted.",
    type: DeleteResult,
  })
  async remove(@Param("id") id: number) {
    return await this.connection.transaction(async (manager: EntityManager) => {
      return this.giftsService.remove(id, manager);
    });
  }
}
