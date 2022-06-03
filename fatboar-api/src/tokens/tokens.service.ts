import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { TokenType } from "../token-types/entities/token-type.entity";
import { TokenTypesService } from "../token-types/token-types.service";
import { Token } from "../tokens/entities/token.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)
    private tokenRepo: Repository<Token>,
    private tokenTypeService: TokenTypesService,
    private jwtService: JwtService
  ) {}

  protected async createToken(
    user: User,
    tokenType: TokenType,
    manager?: EntityManager
  ) {
    const date = new Date();
    const expiresIn = new Date(
      date.setDate(date.getDate() + parseFloat(process.env.JWT_EXPIRES_IN))
    );

    const payload = { sub: user.id };

    const repo = manager?.getRepository(Token) || this.tokenRepo;
    return repo.save({
      value: this.jwtService.sign(payload),
      isRevoked: false,
      expiresIn,
      tokenType,
      user,
    });
  }

  async createAccessToken(user: User, manager?: EntityManager) {
    const accessType = await this.tokenTypeService.getAccessType();
    return this.createToken(user, accessType, manager);
  }

  async createRefreshToken(user: User, manager?: EntityManager) {
    const refreshType = await this.tokenTypeService.getRefreshType();
    return this.createToken(user, refreshType, manager);
  }

  findAll() {
    return this.tokenRepo.find();
  }

  findByValue(value: string) {
    return this.tokenRepo.findOneOrFail({
      where: {
        value,
      },
    });
  }

  // validateRefreshToken(token: Token) {
  //   const user = await this.usersService.findOne(token.user.id)
  //   if (token && !token.isRevoked && token.expiresIn.getTime() < (new Date()).getTime()) {
  //     return this.createAccessToken(user)
  //   } else {
  //     // throw new Exception();
  //   }
  // }

  // update(id: number, updateTokenDto: UpdateTokenDto, manager?: EntityManager) {
  //   const repo = manager?.getRepository(Token) || this.tokenRepo
  //   return repo.update(id, updateTokenDto)
  // }

  // remove(id: number, manager?: EntityManager) {
  //   const repo = manager?.getRepository(Token) || this.tokenRepo
  //   return repo.delete(id)
  // }
}
