import { RolesService } from '../../roles/roles.service';
import { UserRepositoryMock } from '../../users/tests/users.repository.mock';
import { UsersService } from '../../users/users.service';
import { DeleteResult, EntityNotFoundError, QueryFailedError, Repository } from 'typeorm';
import { CreateEmailingListDto } from '../dto/create-emailing-list.dto';
import { UpdateEmailingListDto } from '../dto/update-emailing-list.dto';
import { EmailingListService } from '../emailing-list.service';
import { EmailingList } from '../entities/emailing-list.entity';
import { EmailingListRepositoryMock } from './emailing-list.repository.mock';

const database = {
  emailingLists: [{
    id: 1,
    name: 'Liste 1',
    users: [1]
  },
  {
    id: 2,
    name: 'Liste 2',
    users: [1]
  }],
  users: [{
    id: 1,
    firstname: 'Jeannot',
    lastname: 'lepoireau',
    email: 'jl@user.com',
    phone: '1234567890',
    birthYear: 1980,
    password: '@Password1234',
    newsletter: false,
    sms: false,
    zipcode: '35000',
    rgpdConsent: new Date(),
    winningTickets: []
  }]
};


describe('EmailingListsService', () => {
  let repo: EmailingListRepositoryMock;
  let emailingListService: EmailingListService;
  let usersService: UsersService;
  let roleService: RolesService;
  let databaseClone;


  beforeEach(async () => {
    databaseClone = { ...database };
    repo = new EmailingListRepositoryMock(databaseClone);   
    usersService = new UsersService(new UserRepositoryMock(databaseClone), roleService);
    emailingListService = new EmailingListService(repo, usersService);
  });

  it('should be defined', () => {
    expect(emailingListService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(repo).toBeDefined();
  });

  describe('findOne', () => {
    it('should return an emailing list', async () => {
      expect(await emailingListService.findOne(1)).toBe(databaseClone.emailingLists[0]);
    });
  });

  describe('findOne', () => {
    it('should return a entity not found error', async () => {
      await expect(emailingListService.findOne(5))
        .rejects
        .toThrowError(EntityNotFoundError);
    });
  });

  describe('findAll', () => {
    it('should return an array of emailing lists', async () => {
      expect(await emailingListService.findAll()).toBe(databaseClone.emailingLists);
    });
  });

  describe('create', () => {
    let createDto: CreateEmailingListDto = {
      name: 'Liste 3',
      userIds: [1],
      filters: ""
    };
    it('should return the new emailing list', async () => {
      expect(await emailingListService.create(createDto)).toBe(databaseClone.emailingLists[2]);
    })

    it('should return a query failed error', async () => {
      await expect(emailingListService.create(createDto))
        .rejects
        .toThrowError(QueryFailedError);
    });
  })

  describe('update', () => {

    let updateDto: UpdateEmailingListDto = {
      name: 'Liste 4',
      usersId: [1],
      filters: "",
    };

    it('should return the new emailing list', async () => {
      expect(await emailingListService.update(1, updateDto)).toBe(databaseClone.emailingLists[0]);
    })

    it('should return a entity not found error', async () => {
      await expect(emailingListService.update(10, updateDto))
        .rejects
        .toThrowError(EntityNotFoundError);
    });

  })

  describe('remove', () => {
    it('should return a delete result', async () => {
      expect(await emailingListService.remove(2)).toBeInstanceOf(DeleteResult);
    });

    it('should return a entity not found error', async () => {
      await expect(emailingListService.remove(5))
        .rejects
        .toThrowError(EntityNotFoundError);
    });
  })
});

