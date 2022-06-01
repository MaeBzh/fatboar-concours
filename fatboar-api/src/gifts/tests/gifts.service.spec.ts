import { DeleteResult, EntityNotFoundError } from 'typeorm';
import { CreateGiftDto } from '../dto/create-gift.dto';
import { UpdateGiftDto } from '../dto/update-gift.dto';
import { GiftsService } from '../gifts.service';
import { GiftRepositoryMock } from './gifts.repository.mock';

const database = {
  gifts: [{
    id: 1,
    isJackpot: false,
    name: "burger",
    photo: "jhgfds",
    winPercentage: 20,    
    winningTickets: Promise.resolve([])
  },
  {
    id: 2,
    isJackpot: true,
    name: "range rover",
    photo: "jhgfds",   
    winningTickets: Promise.resolve([])
  }]
};

describe('GiftsService', () => {
  let repo: GiftRepositoryMock;
  let service: GiftsService;


  beforeEach(async () => {
    repo = new GiftRepositoryMock(database);
    service = new GiftsService(repo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a gift', async () => {
      expect(await service.findOne(1)).toBe(database.gifts[0]);
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
    it('should return an array of gifts', async () => {
      expect(await service.findAll()).toBe(database.gifts);
    });
  });

  describe('create', () => {

    let createDto: CreateGiftDto = {
      isJackpot: false,
      name: "entrée",
      photo: "kijhg",
      winPercentage: 40  
    };

    it('should return the new gift', async () => {
      expect(await service.create(createDto)).toBe(database.gifts[2]);
    })
  })

  describe('update', () => {

    let updateDto: UpdateGiftDto = {
      isJackpot: false,
      name: "burger",
      photo: "kijhg",
      winPercentage: 30 
    };

    it('should return the new gift', async () => {
      expect(await service.update(1, updateDto)).toBe(database.gifts[0]);
    })

    let updateDto2: UpdateGiftDto = {
      isJackpot: false,
      name: "burger",
      photo: "kijhg",
      winPercentage: 40 
    };

    it('should return a entity not found error', async () => {
      await expect(service.update(10, updateDto2))
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

