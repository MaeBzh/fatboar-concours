import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityManager, Repository, UpdateResult } from 'typeorm';
import { CreateTokenTypeDto } from './dto/create-token-type.dto';
import { UpdateTokenTypeDto } from './dto/update-token-type.dto';
import { TokenType } from './entities/token-type.entity';
import TokenTypeNames from './token-type-names';

@Injectable()
export class TokenTypesService {

  constructor(
    @InjectRepository(TokenType)
    private tokenTypeRepo: Repository<TokenType>
  ){}

  async create(createTokenTypeDto: CreateTokenTypeDto, manager?: EntityManager): Promise<TokenType> {
    const repo = manager?.getRepository(TokenType) || this.tokenTypeRepo;
    return repo.create(createTokenTypeDto);
  }

  findAll(): Promise<TokenType[]> {
    return this.tokenTypeRepo.find();
  }

  findOne(id: number): Promise<TokenType> {
    return this.tokenTypeRepo.findOneOrFail(id);
  } 

  getAccessType(): Promise<TokenType> {
    return this.tokenTypeRepo.findOne({where : {name: TokenTypeNames.ACCESS}});
  }

  getRefreshType(): Promise<TokenType> {
    return this.tokenTypeRepo.findOne({where : {name: TokenTypeNames.REFRESH}});
  }

  update(id: number, updateTokenTypeDto: UpdateTokenTypeDto, manager?: EntityManager): Promise<UpdateResult> {
    const repo = manager?.getRepository(TokenType) || this.tokenTypeRepo;
    return repo.update(id, updateTokenTypeDto);
  }

  remove(id: number, manager?: EntityManager): Promise<DeleteResult> {
    const repo = manager?.getRepository(TokenType) || this.tokenTypeRepo;
    return repo.delete(id);
  }
}
