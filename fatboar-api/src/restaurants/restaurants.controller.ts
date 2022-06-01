import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Connection, DeleteResult, EntityManager, UpdateResult } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
@UseGuards(AuthGuard())
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly connection: Connection) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The restaurant has been successfully created.',
    type: Restaurant
  })
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return await this.connection.transaction( async (manager: EntityManager) => {
      return this.restaurantsService.create(createRestaurantDto, manager);
    });   
  }

  @Get()
  async findAll() {
    return await this.restaurantsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.restaurantsService.findOne(id);
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'The restaurant has been successfully updated.',
    type: UpdateResult
  })
  async update(@Param('id') id: number, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return await this.connection.transaction( async (manager: EntityManager) => {
      return this.restaurantsService.update(id, updateRestaurantDto, manager);
    });    
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'The restaurant has been successfully deleted.',
    type: DeleteResult
  })
  async remove(@Param('id') id: number) {
    return await this.connection.transaction( async (manager: EntityManager) => {
      return this.restaurantsService.remove(id, manager);
    });
  }
}
