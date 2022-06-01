import { DeleteResult, EntityNotFoundError, QueryFailedError, Repository } from 'typeorm';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';
import { UpdateRestaurantDto } from '../dto/update-restaurant.dto';
import { Restaurant } from '../entities/restaurant.entity';
import { RestaurantsService } from '../restaurants.service';


const database = {
  restaurants: [{
    id: 1,
    name: "fatboar",
    city: "Rennes"
  },
  {
    id: 2,
    name: "fatboar",
    city: "Paris"
  }]
};

class RestaurantRepositoryMock extends Repository<Restaurant> {

  async find() {
    return database.restaurants;
  }

  async findOneOrFail(search: any) {
    let restaurant: Restaurant = database.restaurants.find((restaurant: Restaurant) => restaurant.id == search);
    if (restaurant) {
      return restaurant;
    }
    throw new EntityNotFoundError(Restaurant, search);
  }

  async save(createDto: any): Promise<any> {
    const restaurant = {
      id: database.restaurants[database.restaurants.length - 1].id + 1,
      ...createDto,
      winningTickets: []
    };
    database.restaurants.push(restaurant);

    return restaurant;
  }

  //TODO add query failed expection for email already in use
  async update(search: any, updateDto: any): Promise<any> {
    let index = database.restaurants.findIndex(restaurant => restaurant.id == search);
    if (index >= 0) {
      return database.restaurants[index] = {...updateDto};
    } else {
      throw new EntityNotFoundError(Restaurant, search);
    }
  }

  async delete(search: any): Promise<DeleteResult> {
    if (database.restaurants.some(restaurant => restaurant.id === search)) {
      database.restaurants.splice(search, 1);
      return new DeleteResult;
    } else {
      throw new EntityNotFoundError(Restaurant, search);
    }
  }
}

describe('RestaurantsService', () => {
  let repo: RestaurantRepositoryMock;
  let service: RestaurantsService;


  beforeEach(async () => {
    repo = new RestaurantRepositoryMock();
    service = new RestaurantsService(repo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a restaurant', async () => {
      expect(await service.findOne(1)).toBe(database.restaurants[0]);
    });
  });

  describe('findOne', () => {
    it('should return a entity not found error', async () => {
      await expect(service.findOne(5))
        .rejects
        .toThrowError(EntityNotFoundError);
    });
  });

  describe('findAll', () => {
    it('should return an array of restaurants', async () => {
      expect(await service.findAll()).toBe(database.restaurants);
    });
  });

  describe('create', () => {

    let createDto: CreateRestaurantDto = {
      name: "fatboar",
      city: "Lyon"
    };

    it('should return the new restaurant', async () => {
      expect(await service.create(createDto)).toBe(database.restaurants[2]);
    })
  })

  describe('update', () => {

    let updateDto: UpdateRestaurantDto = {
      name: "fatboar restaurant",
      city: "Lyon"
    };

    it('should return the new restaurant', async () => {
      expect(await service.update(1, updateDto)).toBe(database.restaurants[0]);
    })   

    it('should return a entity not found error', async () => {
      await expect(service.update(10, updateDto))
        .rejects
        .toThrowError(EntityNotFoundError);
    });

  })

  describe('remove', () => {

    it('should return a delete result', async () => {
      expect(await service.remove(2)).toBeInstanceOf(DeleteResult);
    });

    it('should return a entity not found error', async () => {
      await expect(service.remove(5))
        .rejects
        .toThrowError(EntityNotFoundError);
    });
  })
});

