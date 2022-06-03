import { RolesService } from '../../roles/roles.service';
import { Role } from "../../roles/entities/role.entity";
import { DeleteResult, EntityNotFoundError, QueryFailedError } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UsersService } from "../users.service";
import { UserRepositoryMock } from "./users.repository.mock";

const database = {
  users: [
    {
      id: 1,
      firstname: "Jeannot",
      lastname: "lepoireau",
      email: "jl@user.com",
      phone: "1234567890",
      birthYear: 1980,
      password: "$2b$10$dEWVt8bnwZArAFDZ3G12AuZTkT7tmjNoUSLAR.B9RB.Mud4A6jhgm",
      newsletter: false,
      sms: false,
      zipcode: "35000",
      rgpdConsent: new Date(),
      winningTickets: [],
      roleId: 2,
      accountToken: "azertyu",
    },
    {
      id: 2,
      firstname: "Ricky",
      lastname: "Bobby",
      email: "rb@user.com",
      phone: "1234567890",
      birthYear: 1975,
      password: "$2b$10$dEWVt8bnwZArAFDZ3G12AuZTkT7tmjNoUSLAR.B9RB.Mud4A6jhgm",
      newsletter: true,
      sms: true,
      zipcode: "35300",
      rgpdConsent: new Date(),
      winningTickets: [],
      roleId: 2,
      accountToken: "azertyu",
    },
  ],
};

describe("UsersService", () => {
  let repo: UserRepositoryMock;
  let userService: UsersService;
  let roleService = {
    findClientRole: async () => ({ id: 2, name: "client"}),
  } as RolesService;

  beforeEach(async () => {
    repo = new UserRepositoryMock(database);
    userService = new UsersService(repo, roleService);
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
  });

  describe("findOne", () => {
    it("should return a user", async () => {
      expect(await userService.findOne(1)).toBe(database.users[0]);
    });
  });

  describe("findOne", () => {
    it("should return a entity not found error", async () => {
      await expect(userService.findOne(5)).rejects.toThrowError(
        EntityNotFoundError
      );
    });
  });

  describe("findAll", () => {
    it("should return an array of users", async () => {
      expect(await userService.findAll()).toBe(database.users);
    });
  });

  describe("create", () => {
    let createUserDto: CreateUserDto = {
      firstname: "Lorette",
      lastname: "Lacourgette",
      email: "ll@mail.com",
      phone: "0124578965",
      birthYear: 1985,
      password: "@Password1234",
      newsletter: true,
      sms: true,
      zipcode: "35000",
      rgpdConsent: new Date(),
      role: new Role(),
    };

    it("should return the new user", async () => {
      expect(await userService.create(createUserDto)).toBe(database.users[2]);
    });

    let createUserDto2: CreateUserDto = {
      firstname: "Lorette",
      lastname: "Lacourgette",
      email: "rb@user.com",
      phone: "0124578965",
      birthYear: 1985,
      password: "@Password1234",
      newsletter: true,
      sms: true,
      zipcode: "35000",
      rgpdConsent: new Date(),
      role: new Role(),
    };

    describe("create", () => {
      it("should return a query failed error", async () => {
        await expect(userService.create(createUserDto2)).rejects.toThrowError(
          QueryFailedError
        );
      });
    });
  });

  describe("update", () => {
    let updateUserDto: UpdateUserDto = {
      firstname: "Jeannette",
      lastname: "Lacourgette",
      email: "ll@mail.com",
      phone: "0124578965",
      birthYear: 1985,
      password: "@Password1234",
      newsletter: true,
      sms: true,
      zipcode: "35000",
      rgpdConsent: new Date(),
    };

    it("should return the new user", async () => {
      expect(await userService.update(1, updateUserDto)).toBe(
        database.users[0]
      );
    });

    let updateUserDto2: UpdateUserDto = {
      firstname: "Jeannette",
      lastname: "Lacourgette",
      email: "rb@user.com",
      phone: "0124578965",
      birthYear: 1985,
      password: "@Password1234",
      newsletter: true,
      sms: true,
      zipcode: "35000",
      rgpdConsent: new Date(),
    };

    it("should return a entity not found error", async () => {
      await expect(userService.update(1, updateUserDto2)).rejects.toThrowError(
        EntityNotFoundError
      );
    });
  });

  describe("remove", () => {
    it("should return a delete result", async () => {
      expect(await userService.remove(2)).toBeInstanceOf(DeleteResult);
    });

    it("should return a entity not found error", async () => {
      await expect(userService.remove(5)).rejects.toThrowError(
        EntityNotFoundError
      );
    });
  });
});
