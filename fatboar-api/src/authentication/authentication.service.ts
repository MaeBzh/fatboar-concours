import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UpdateResult } from "typeorm";
import { v4 as uuid } from "uuid";
import { MailsService } from "../mails/mails.service";
import { TokensService } from "../tokens/tokens.service";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { CashRegistersService } from "./../cash-registers/cash-registers.service";
import { CashRegister } from "./../cash-registers/entities/cash-register.entity";
import { CreateUserDto } from "./../users/dto/create-user.dto";
import { UpdateUserDto } from "./../users/dto/update-user.dto";
import { RegisterDto } from "./dto/register.dto";
import { RegisterSocialDto } from "./dto/registerSocial.dto";
import {
  ResetPasswordDto,
  SendResetPasswordDto,
} from "./dto/resetPassword.dto";
import bcrypt = require("bcrypt");

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private tokenService: TokensService,
    private mailsService: MailsService,
    private cashRegisterService: CashRegistersService
  ) {}

  /**
   * Register a new user in database.
   * @param registerDto
   * @returns A promise of a user
   */
  async register(registerDto: RegisterDto): Promise<CreateUserDto> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(registerDto.password, salt);

    const createdUser = await this.usersService.create({
      ...registerDto,
      password,
      accountToken: uuid(),
    });

    this.mailsService.sendMailRegister(createdUser, registerDto.activateUrl);

    return createdUser;
  }

  /**
   * Check if a user with email adress exists in database.
   * @param email
   * @param pwd
   * @returns  a promise of a user.
   */
  async validateUser(email: string, pwd: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(pwd, user.password))) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST
      );
    }

    if (!user.isActive) {
      throw new HttpException("Account not activated", HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  /**
   * Check if a user with email adress exists in database.
   * @param email
   * @param pwd
   * @returns  a promise of a user.
   */
  async validateCashRegister(token: string): Promise<CashRegister> {
    return this.cashRegisterService.findByToken(token);
  }

  /**
   * Log a user and generate a jwt token.
   * @param user
   * @returns A user without the password and with a token
   */
  async login(user: User): Promise<{
    user: CreateUserDto;
    accessToken: { value: string; expiresIn: Date };
    refreshToken: { value: string; expiresIn: Date };
  }> {
    return this.generateTokens(user);
  }

  async generateTokens(user: User) {
    const accessToken = await this.tokenService.createAccessToken(user);
    const refreshToken = await this.tokenService.createRefreshToken(user);

    const response = {
      user,
      accessToken: {
        value: accessToken.value,
        expiresIn: accessToken.expiresIn,
      },
      refreshToken: {
        value: refreshToken.value,
        expiresIn: refreshToken.expiresIn,
      },
    };

    return response;
  }

  async activateAccount(token: string): Promise<UpdateResult> {
    const user: User = await this.usersService.findByAccountToken(token);

    return this.usersService.update(user.id, {
      ...user,
      isActive: true,
      accountToken: null,
    } as UpdateUserDto);
  }

  async sendResetPassword(
    sendResetPasswordDto: SendResetPasswordDto
  ): Promise<void> {
    const { id, ...user }: User = await this.usersService.findByEmail(
      sendResetPasswordDto.email
    );

    const updatedUser = { ...user, accountToken: uuid() };
    await this.usersService.update(id, updatedUser);

    this.mailsService.sendMailResetPassword(
      updatedUser as User,
      sendResetPasswordDto.resetPasswordUrl
    );
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { id, ...user }: User = await this.usersService.findByEmail(
      resetPasswordDto.email
    );

    if (user.accountToken === resetPasswordDto.accountToken) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(resetPasswordDto.password, salt);
      await this.usersService.update(id, {
        ...user,
        password,
        accountToken: null,
        isActive: true,
      });
    } else {
      throw new NotFoundException();
    }
  }

  async findByEmail(email: string): Promise<{
    user: CreateUserDto;
    accessToken: { value: string; expiresIn: Date };
    refreshToken: { value: string; expiresIn: Date };
  }> | null {
    try {
      const user: User = await this.usersService.findByEmail(email);
      return this.generateTokens(user);
    } catch (error) {
      return null;
    }
  }

  async registerSocialUser(socialUser: RegisterSocialDto) {
    try {
      const user: User = await this.usersService.findByEmail(socialUser.email);
      await this.usersService.update(user.id, {
        ...user,
        birthYear: user.birthYear || socialUser.birthYear || null,
      } as UpdateUserDto);
    } catch (error) {
      await this.usersService.createSocialUser(socialUser);
    }

    return this.generateTokens(
      await this.usersService.findByEmail(socialUser.email)
    );
  }
}
